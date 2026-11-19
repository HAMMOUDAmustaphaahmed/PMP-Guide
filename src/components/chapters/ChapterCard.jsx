import React from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { Check } from 'lucide-react'
import { SectionRenderer } from './SectionRenderer'
import { useProgressStore } from '../../stores/progressStore'
import { useT } from '../../hooks/useT'
import { fadeUp, SPRING, VIEWPORT } from '../../lib/motion'

function ReadToggle({ id }) {
  const { t } = useT()
  const isDone = useProgressStore((s) => !!s.done[id])
  const toggle = useProgressStore((s) => s.toggle)

  return (
    <motion.button
      type="button"
      className={`read-toggle ${isDone ? 'done' : ''}`}
      onClick={() => toggle(id)}
      aria-pressed={isDone}
      whileTap={{ scale: 0.96 }}
      transition={SPRING}
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

export function ChapterCard({ chapter }) {
  const { t } = useT()

  // Un halo suit le pointeur dans l'en-tête. Le texte, lui, ne bouge pas :
  // une carte de lecture qui s'incline sous la souris gêne la lecture.
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${x}px ${y}px, color-mix(in srgb, var(--ch-accent) 16%, transparent), transparent 70%)`

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return (
    <div className="section-wrap" id={chapter.id}>
      <motion.article
        className="ch-card"
        style={{ '--ch-accent': chapter.accent, '--ch-accent-dk': chapter.accentDark }}
        aria-labelledby={`${chapter.id}-title`}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        <header className="ch-card-header" onPointerMove={onPointerMove} onPointerLeave={() => { x.set(-200); y.set(-200) }}>
          <div className="ch-card-header-bg" aria-hidden="true" />
          <div className="ch-card-header-circle" aria-hidden="true" />
          <motion.div className="ch-card-spotlight" style={{ background: spotlight }} aria-hidden="true" />
          <div className="ch-card-header-row">
            <div>
              <div className="ch-num">{t('chapter')} {chapter.num}</div>
              <h2 className="ch-title" id={`${chapter.id}-title`}>{chapter.title}</h2>
              <p className="ch-desc">{chapter.desc}</p>
            </div>
            <ReadToggle id={chapter.id} />
          </div>
        </header>

        <div className="ch-card-body">
          {chapter.sections.map((section) => (
            <motion.section
              key={section.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
            >
              <h3 className="sh">{section.heading}</h3>
              <SectionRenderer section={section} />
            </motion.section>
          ))}
        </div>
      </motion.article>
    </div>
  )
}
