import { create } from 'zustand'
import { getContent } from '../data/content'
import { api } from '../lib/api'
import { useLanguageStore } from './languageStore'
import { useAuthStore } from './authStore'

const LANGS = ['fr', 'en', 'ar']
const defaults = () => Object.fromEntries(LANGS.map((l) => [l, getContent(l)]))
const currentLang = () => useLanguageStore.getState().language

// Le contenu par défaut vient de src/data/content.js. Si le serveur en a une
// version enregistrée, elle le remplace. Les modifications de l'admin restent
// locales jusqu'à « Sauvegarder », qui les envoie au serveur.
export const useContentStore = create((set, get) => {
  // Applique `recipe` à une copie du contenu de la langue courante.
  const mutate = (recipe) => {
    const lang = currentLang()
    const draft = structuredClone(get().content[lang])
    recipe(draft)
    set((state) => ({
      content: { ...state.content, [lang]: draft },
      dirty: { ...state.dirty, [lang]: true },
    }))
  }
  const section = (draft, ch, sec) => draft.chapters[ch].sections[sec]

  return {
    content: defaults(),
    dirty: {},

    loadFromServer: async (lang, signal) => {
      try {
        const { content } = await api.getContent(lang, signal)
        // Ne pas écraser des modifications en cours.
        if (!get().dirty[lang]) set((state) => ({ content: { ...state.content, [lang]: content } }))
      } catch {
        // 404 ou pas de serveur : on garde le contenu par défaut.
      }
    },

    saveToServer: async () => {
      const lang = currentLang()
      await api.putContent(lang, get().content[lang], useAuthStore.getState().token)
      set((state) => ({ dirty: { ...state.dirty, [lang]: false } }))
    },

    resetContent: async () => {
      const lang = currentLang()
      await api.deleteContent(lang, useAuthStore.getState().token)
      set((state) => ({
        content: { ...state.content, [lang]: getContent(lang) },
        dirty: { ...state.dirty, [lang]: false },
      }))
    },

    // --- Héro
    updateHero: (patch) => mutate((d) => Object.assign(d.hero, patch)),
    updateHeroStat: (i, patch) => mutate((d) => Object.assign(d.hero.stats[i], patch)),
    addHeroStat: () => mutate((d) => d.hero.stats.push({ value: '', label: '' })),
    removeHeroStat: (i) => mutate((d) => d.hero.stats.splice(i, 1)),
    updateHeroPills: (pills) => mutate((d) => { d.hero.pills = pills }),

    // --- Chapitres et sections
    updateChapter: (ch, patch) => mutate((d) => Object.assign(d.chapters[ch], patch)),
    updateSection: (ch, sec, patch) => mutate((d) => Object.assign(section(d, ch, sec), patch)),

    updateTableRow: (ch, sec, i, row) => mutate((d) => { section(d, ch, sec).rows[i] = row }),
    addTableRow: (ch, sec) => mutate((d) => {
      const s = section(d, ch, sec)
      s.rows.push(s.headers.map(() => ''))
    }),
    removeTableRow: (ch, sec, i) => mutate((d) => section(d, ch, sec).rows.splice(i, 1)),

    updateBoxItem: (ch, sec, i, value) => mutate((d) => { section(d, ch, sec).box.items[i] = value }),
    addBoxItem: (ch, sec) => mutate((d) => section(d, ch, sec).box.items.push('')),
    removeBoxItem: (ch, sec, i) => mutate((d) => section(d, ch, sec).box.items.splice(i, 1)),

    // Sert aux badges, aux cellules SWOT et aux phases : même forme { items: [...] }.
    updateBadgeItem: (ch, sec, i, patch) => mutate((d) => Object.assign(section(d, ch, sec).items[i], patch)),
    addBadgeItem: (ch, sec) => mutate((d) => {
      const s = section(d, ch, sec)
      s.items.push(
        s.type === 'phases'
          ? { label: '', desc: '', color: '#2563EB' }
          : { title: '', desc: '', color: '#2563EB', bg: '#DBEAFE' }
      )
    }),
    removeBadgeItem: (ch, sec, i) => mutate((d) => section(d, ch, sec).items.splice(i, 1)),
    updateKpiItem: (ch, sec, i, patch) => mutate((d) => Object.assign(section(d, ch, sec).items[i], patch)),

    // --- Annexes
    updateGlossaryRow: (i, row) => mutate((d) => { d.annexes.glossary[i] = row }),
    addGlossaryRow: () => mutate((d) => d.annexes.glossary.push(['', ''])),
    removeGlossaryRow: (i) => mutate((d) => d.annexes.glossary.splice(i, 1)),
    updateChecklistItem: (i, value) => mutate((d) => { d.annexes.checklist[i] = value }),
    addChecklistItem: () => mutate((d) => d.annexes.checklist.push('')),
    removeChecklistItem: (i) => mutate((d) => d.annexes.checklist.splice(i, 1)),
  }
})
