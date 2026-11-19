import { useLanguageStore, translations } from '../stores/languageStore'

export function useT() {
  const language = useLanguageStore((s) => s.language)
  const dict = translations[language] || translations.fr
  // Une clé manquante dans une langue retombe sur le français.
  const t = (key) => dict[key] ?? translations.fr[key] ?? key
  return { t, language }
}
