import React, { useEffect, useId, useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { usePdfStore } from '../../stores/pdfStore'
import { useT } from '../../hooks/useT'
import { Modal } from '../common/Modal'

const MAX_FILE_BYTES = 80 * 1024 * 1024

export function PDFManager({ isOpen, onClose, pdf }) {
  const { t } = useT()
  const addPdf = usePdfStore((s) => s.addPdf)
  const updatePdf = usePdfStore((s) => s.updatePdf)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef(null)
  const titleId = useId()
  const descId = useId()
  const errorId = useId()

  useEffect(() => {
    if (!isOpen) return
    setTitle(pdf?.title || '')
    setDescription(pdf?.description || '')
    setFile(null)
    setError('')
  }, [pdf, isOpen])

  const pickFile = (selected) => {
    if (!selected) return
    if (selected.type !== 'application/pdf') return setError(t('pdfOnly'))
    if (selected.size > MAX_FILE_BYTES) return setError(t('fileTooBig'))
    setError('')
    setFile(selected)
    if (!title.trim()) setTitle(selected.name.replace(/\.pdf$/i, ''))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return setError(t('required'))
    setSaving(true)
    try {
      const data = { title: title.trim(), description: description.trim(), file }
      if (pdf) await updatePdf(pdf.id, data)
      else await addPdf(data)
      onClose()
    } catch {
      setError(t('fileSaveError'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={pdf ? t('updatePdf') : t('addPdf')} subtitle={t('libraryLocal')} maxWidth={460}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="modal-field">
          <label className="modal-label" htmlFor={titleId}>{t('pdfTitle')}</label>
          <input
            id={titleId}
            className="modal-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            data-autofocus
            aria-describedby={error ? errorId : undefined}
          />
        </div>

        <div className="modal-field">
          <label className="modal-label" htmlFor={descId}>{t('pdfDescription')}</label>
          <input id={descId} className="modal-input" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="modal-field">
          <span className="modal-label">{t('attachFile')}</span>
          <button
            type="button"
            className={`dropzone ${dragging ? 'dragging' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files[0]) }}
          >
            <Upload size={22} aria-hidden="true" />
            <span>{file ? file.name : pdf?.hasFile ? t('replaceFile') : t('dropHint')}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => pickFile(e.target.files[0])}
          />
          <p className="modal-hint">{t('fileHint')}</p>
        </div>

        {error && <p className="modal-error" id={errorId} role="alert">{error}</p>}

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>{t('cancel')}</button>
          <button type="submit" className="btn-primary" disabled={saving}>{pdf ? t('save') : t('addPdf')}</button>
        </div>
      </form>
    </Modal>
  )
}
