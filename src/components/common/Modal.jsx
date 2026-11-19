import React, { useEffect, useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { fade, pop } from '../../lib/motion'
import { useT } from '../../hooks/useT'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])'

// Fenêtre modale : Échap pour fermer, focus gardé à l'intérieur,
// puis rendu à l'élément qui l'avait avant l'ouverture.
export function Modal({ isOpen, onClose, title, subtitle, icon, children, maxWidth = 420 }) {
  const { t } = useT()
  const boxRef = useRef(null)
  const titleId = useId()
  // onClose change à chaque rendu du parent : le garder dans une ref évite de
  // relancer l'effet (et de voler le focus) à chaque frappe dans un champ.
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!isOpen) return
    const previous = document.activeElement
    const box = boxRef.current
    const first = box?.querySelector('[data-autofocus]') || box?.querySelector(FOCUSABLE)
    first?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !box) return
      const items = [...box.querySelectorAll(FOCUSABLE)]
      if (!items.length) return
      const firstItem = items[0]
      const lastItem = items[items.length - 1]
      if (e.shiftKey && document.activeElement === firstItem) {
        e.preventDefault()
        lastItem.focus()
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault()
        firstItem.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previous?.focus?.()
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          variants={fade}
          initial="hidden"
          animate="show"
          exit="exit"
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={boxRef}
            className="modal-box"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            variants={pop}
            style={{ maxWidth }}
          >
            <div className="modal-head">
              {icon && <div className="modal-icon" aria-hidden="true">{icon}</div>}
              <div className="modal-head-text">
                <h2 className="modal-title" id={titleId}>{title}</h2>
                {subtitle && <p className="modal-sub">{subtitle}</p>}
              </div>
              <button type="button" className="icon-btn" onClick={onClose} aria-label={t('close')}>
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
