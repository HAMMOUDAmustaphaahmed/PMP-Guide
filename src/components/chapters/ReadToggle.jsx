import React from 'react'
import { motion } from 'framer-motion'
import { useProgressStore } from '../../stores/progressStore'
import { useT } from '../../hooks/useT'

export function ReadToggle({ id }) {
  const { t } = useT()
  const isDone = useProgressStore((s) => !!s.done[id])
  const toggle = useProgressStore((s) => s.toggle)

  return (
    <motion.button
      type="button"
      className={`read-toggle ${isDone ? 'done' : ''}`}
      onClick={() => toggle(id)}
      aria-pressed={isDone}
      whileTap={{ scale: 0.985 }}
    >
      <span className="read-toggle-box" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* La coche se dessine au lieu d'apparaître d'un coup. */}
          <motion.path
            d="M5 12.5l4.5 4.5L19 7.5"
            initial={false}
            animate={{ pathLength: isDone ? 1 : 0, opacity: isDone ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </svg>
      </span>
      {isDone ? t('read') : t('markRead')}
    </motion.button>
  )
}
