import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { usePdfStore } from '../../stores/pdfStore'
import { fileStore } from '../../lib/fileStore'
import { useT } from '../../hooks/useT'
import { PDFSearch } from './PDFSearch'
import { PDFCard } from './PDFCard'
import { PDFManager } from '../admin/PDFManager'
import { fadeUp, VIEWPORT } from '../../lib/motion'

export function PDFLibrary() {
  const { t } = useT()
  // S'abonner à la liste et à la recherche pour se mettre à jour quand elles changent.
  usePdfStore((s) => s.pdfs)
  usePdfStore((s) => s.searchQuery)
  const filtered = usePdfStore.getState().getFilteredPdfs()
  const deletePdf = usePdfStore((s) => s.deletePdf)

  const [editing, setEditing] = useState(null) // null | 'new' | pdf
  const [notice, setNotice] = useState('')

  const handleOpen = async (pdf) => {
    setNotice('')
    try {
      const blob = await fileStore.get(pdf.id)
      if (!blob) throw new Error('missing')
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank', 'noopener')
      setTimeout(() => URL.revokeObjectURL(url), 60_000)
    } catch {
      setNotice(t('fileMissing'))
    }
  }

  const handleDelete = (pdf) => {
    if (window.confirm(`${t('confirmDelete')}\n${pdf.title}`)) deletePdf(pdf.id)
  }

  return (
    <div className="section-wrap" id="pdf-library">
      <motion.article
        className="ch-card"
        style={{ '--ch-accent': '#0D9488', '--ch-accent-dk': '#0F766E' }}
        aria-labelledby="library-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        <header className="ch-card-header">
          <div className="ch-card-header-bg" aria-hidden="true" />
          <div className="ch-card-header-circle" aria-hidden="true" />
          <div className="ch-num">{t('library')}</div>
          <h1 className="ch-title" id="library-title">{t('libraryTitle')}</h1>
          <p className="ch-desc">{t('libraryDesc')}</p>
        </header>

        <div className="ch-card-body">
          <div className="pdf-toolbar">
            <PDFSearch />
            <button type="button" className="btn-dl-sm" onClick={() => setEditing('new')}>
              <Plus size={15} aria-hidden="true" />{t('addPdf')}
            </button>
          </div>

          <p className="pdf-count" aria-live="polite">{filtered.length} {t('books')}</p>
          {notice && <p className="modal-error" role="alert">{notice}</p>}

          {filtered.length === 0 ? (
            <p className="pdf-empty">{t('noPdfs')}</p>
          ) : (
            <ul className="pdf-grid">
              <AnimatePresence mode="popLayout" initial={false}>
                {filtered.map((pdf) => (
                  <PDFCard key={pdf.id} pdf={pdf} onOpen={handleOpen} onEdit={setEditing} onDelete={handleDelete} />
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </motion.article>

      <PDFManager
        isOpen={editing !== null}
        pdf={editing === 'new' ? null : editing}
        onClose={() => setEditing(null)}
      />
    </div>
  )
}
