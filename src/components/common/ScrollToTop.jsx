import React, { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useT } from '../../hooks/useT'
import { SPRING } from '../../lib/motion'

export function ScrollToTop() {
  const { t } = useT()
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  // setState seulement au franchissement du seuil, pas à chaque pixel défilé.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > 400
    if (next !== visible) setVisible(next)
  })

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="scroll-top"
          onClick={toTop}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={SPRING}
          aria-label={t('scrollTop')}
        >
          <ArrowUp size={18} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
