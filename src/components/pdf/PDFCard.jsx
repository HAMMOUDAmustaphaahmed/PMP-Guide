import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, FileCheck2, Pencil, Search, Trash2 } from 'lucide-react'
import { useT } from '../../hooks/useT'
import { pop } from '../../lib/motion'

export function PDFCard({ pdf, onOpen, onEdit, onDelete }) {
  const { t } = useT()
  const findUrl = `https://www.google.com/search?tbm=bks&q=${encodeURIComponent(pdf.title)}`

  return (
    <motion.li className="pdf-card" layout variants={pop} initial="hidden" animate="show" exit="exit">
      <div className="pdf-card-title">{pdf.title}</div>
      {pdf.description && <div className="pdf-card-desc">{pdf.description}</div>}
      {pdf.hasFile && (
        <div className="pdf-card-meta"><FileCheck2 size={13} aria-hidden="true" />{t('myCopy')}</div>
      )}
      <div className="pdf-actions">
        {pdf.hasFile ? (
          <button type="button" className="pdf-action primary" onClick={() => onOpen(pdf)}>
            <BookOpen size={14} aria-hidden="true" />{t('open')}
          </button>
        ) : (
          <a className="pdf-action" href={findUrl} target="_blank" rel="noopener noreferrer">
            <Search size={14} aria-hidden="true" />{t('findBook')}
          </a>
        )}
        <button type="button" className="pdf-action icon" onClick={() => onEdit(pdf)} aria-label={`${t('edit')} : ${pdf.title}`}>
          <Pencil size={14} aria-hidden="true" />
        </button>
        <button type="button" className="pdf-action icon danger" onClick={() => onDelete(pdf)} aria-label={`${t('delete')} : ${pdf.title}`}>
          <Trash2 size={14} aria-hidden="true" />
        </button>
      </div>
    </motion.li>
  )
}
