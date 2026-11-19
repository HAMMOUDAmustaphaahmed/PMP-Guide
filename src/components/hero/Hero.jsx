import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useCurrentContent } from '../../hooks/useCurrentContent'
import { useProgressStore } from '../../stores/progressStore'
import { useT } from '../../hooks/useT'
import { CountUp } from '../common/CountUp'
import { fadeUp, stagger } from '../../lib/motion'

export function Hero() {
  const { hero, chapters } = useCurrentContent()
  const { t } = useT()
  const done = useProgressStore((s) => s.done)
  const readCount = chapters.filter((c) => done[c.id]).length

  // Le fond recule légèrement pendant que le texte part : profondeur sans gadget.
  const { scrollY } = useScroll()
  const orbsY = useTransform(scrollY, [0, 600], [0, 120])
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0.25])

  const [firstWord, ...rest] = hero.title.split(' ')

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <motion.div className="hero-orbs" style={{ y: orbsY }} aria-hidden="true">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </motion.div>

      <motion.div
        className="hero-content"
        style={{ opacity: contentOpacity }}
        variants={stagger(0.08, 0.05)}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="hero-eyebrow">
          <span className="hero-dot" aria-hidden="true" />
          {hero.eyebrow}
        </motion.div>

        <motion.h1 id="hero-title" className="hero-title" variants={fadeUp}>
          {firstWord}
          {rest.length > 0 && (
            <>
              <br />
              <span className="hero-title-accent">{rest.join(' ')}</span>
            </>
          )}
        </motion.h1>

        <motion.p className="hero-subtitle" variants={fadeUp}>{hero.subtitle}</motion.p>
        <motion.p className="hero-desc" variants={fadeUp}>{hero.description}</motion.p>

        <motion.dl className="hero-stats" variants={stagger(0.06)}>
          {hero.stats.map((stat, i) => (
            <motion.div key={i} className="hero-stat" variants={fadeUp} whileHover={{ y: -3 }}>
              <dd className="hero-stat-val"><CountUp text={stat.value} /></dd>
              <dt className="hero-stat-lbl">{stat.label}</dt>
            </motion.div>
          ))}
        </motion.dl>

        <motion.ul className="hero-pills" variants={stagger(0.03)}>
          {hero.pills.map((pill, i) => (
            <motion.li key={i} className="hero-pill" variants={fadeUp}>{pill}</motion.li>
          ))}
        </motion.ul>

        {readCount > 0 && (
          <motion.p className="hero-progress" variants={fadeUp}>
            <CheckCircle2 size={15} aria-hidden="true" />
            {readCount} / {chapters.length} {t('chaptersRead')}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
