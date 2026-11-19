import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { useProgressStore } from '../../stores/progressStore'
import { useT } from '../../hooks/useT'
import { EASE } from '../../lib/motion'

// Une ligne par chapitre. Dans la version complète, une barre se trace à
// l'ouverture de la page ; sa longueur suit le nombre de sections à lire.
export function ChapterRows({ chapters, compact = false }) {
  const { t } = useT()
  const done = useProgressStore((s) => s.done)
  const longest = Math.max(...chapters.map((c) => c.sections.length), 1)

  return (
    <ol className={`toc ${compact ? 'compact' : ''}`}>
      {chapters.map((chapter, i) => {
        const isDone = !!done[chapter.id]
        return (
          <li key={chapter.id}>
            <Link className={`toc-row ${isDone ? 'done' : ''}`} to={`/guide/${chapter.id}`}>
              <span className="toc-num">{chapter.num}</span>
              <span>
                <span className="toc-title">{chapter.title}</span>
                {!compact && <span className="toc-desc" style={{ display: 'block' }}>{chapter.desc}</span>}
              </span>
              {!compact && (
                <span className="toc-bar" aria-hidden="true">
                  <motion.span
                    className="toc-bar-track"
                    style={{ '--w': `${(chapter.sections.length / longest) * 100}%` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.045, ease: EASE }}
                  />
                  <span className="toc-bar-meta">{chapter.sections.length} {t('sections')}</span>
                </span>
              )}
              <span className={`toc-go ${isDone ? 'toc-check' : ''}`}>
                {isDone ? (
                  <>
                    <Check size={18} aria-hidden="true" />
                    <span className="sr-only">{t('read')}</span>
                  </>
                ) : (
                  <ArrowRight size={18} className="flip-rtl" aria-hidden="true" />
                )}
              </span>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
