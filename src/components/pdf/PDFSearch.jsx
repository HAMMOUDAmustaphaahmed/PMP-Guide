import React from 'react'
import { Search } from 'lucide-react'
import { usePdfStore } from '../../stores/pdfStore'
import { useT } from '../../hooks/useT'

// Le filtrage est immédiat : pas de bouton « Rechercher » qui ne ferait rien.
export function PDFSearch() {
  const searchQuery = usePdfStore((s) => s.searchQuery)
  const setSearchQuery = usePdfStore((s) => s.setSearchQuery)
  const { t } = useT()

  return (
    <div className="pdf-search">
      <Search size={16} className="pdf-search-icon" aria-hidden="true" />
      <input
        type="search"
        className="pdf-search-input"
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchPlaceholder')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}
