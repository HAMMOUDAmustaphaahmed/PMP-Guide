import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { initialPdfs } from '../data/initialPdfs'
import { fileStore } from '../lib/fileStore'

// La liste de lecture (titres et descriptions) est livrée avec l'application.
// Les fichiers, eux, ne le sont pas : chacun ajoute ses propres exemplaires,
// qui restent dans son navigateur.
const readingList = () =>
  initialPdfs.map(({ id, title, description }) => ({ id, title, description, hasFile: false }))

export const usePdfStore = create(
  persist(
    (set, get) => ({
      pdfs: readingList(),
      searchQuery: '',

      addPdf: async ({ title, description, file }) => {
        const id = crypto.randomUUID()
        if (file) await fileStore.put(id, file)
        set((state) => ({ pdfs: [...state.pdfs, { id, title, description, hasFile: !!file }] }))
      },

      updatePdf: async (id, { title, description, file }) => {
        if (file) await fileStore.put(id, file)
        set((state) => ({
          pdfs: state.pdfs.map((p) =>
            p.id === id ? { ...p, title, description, hasFile: p.hasFile || !!file } : p
          ),
        }))
      },

      deletePdf: async (id) => {
        await fileStore.remove(id).catch(() => {})
        set((state) => ({ pdfs: state.pdfs.filter((p) => p.id !== id) }))
      },

      setSearchQuery: (searchQuery) => set({ searchQuery }),

      getFilteredPdfs: () => {
        const { pdfs, searchQuery } = get()
        const q = searchQuery.toLowerCase().trim()
        if (!q) return pdfs
        return pdfs.filter(
          (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
        )
      },
    }),
    {
      // Nouvelle clé : l'ancienne (« pmp-pdfs ») contenait des fichiers en base64.
      name: 'pmp-library',
      partialize: ({ pdfs }) => ({ pdfs }),
    }
  )
)
