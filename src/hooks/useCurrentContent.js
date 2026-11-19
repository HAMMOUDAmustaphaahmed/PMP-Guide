import { useContentStore } from '../stores/contentStore'
import { useLanguageStore } from '../stores/languageStore'

export const useCurrentContent = () => {
  const lang = useLanguageStore((s) => s.language)
  const content = useContentStore((s) => s.content)
  return content[lang] || content.fr
}