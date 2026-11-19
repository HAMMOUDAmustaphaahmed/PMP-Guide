import React, { Suspense, lazy, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useCurrentContent } from '../hooks/useCurrentContent'
import { useT } from '../hooks/useT'
import { SceneBoundary, SceneFallback } from '../components/landing/SceneFallback'
import { EvmTeaser } from '../components/landing/EvmTeaser'
import { ChapterRows } from '../components/chapters/ChapterRows'
import { DUR, EASE } from '../lib/motion'

// Three.js ne se charge que sur cette page, et après le texte.
const ProjectScene = lazy(() => import('../components/landing/ProjectScene'))

const STEPS = [
  { key: 's1', to: '/guide/ch1' },
  { key: 's2', to: '/guide/ch6' },
  { key: 's3', to: '/guide/ch7' },
]

export default function Landing() {
  const { hero, chapters } = useCurrentContent()
  const { t } = useT()

  // Le défilement du récit pilote la scène : 0 = désordre, 3 = courbes de valeur acquise.
  const story = useRef(null)
  const { scrollYProgress } = useScroll({ target: story, offset: ['start start', 'end end'] })
  const progress = useTransform(scrollYProgress, [0, 1], [0, STEPS.length])
  const [stage, setStage] = useState(0)
  useMotionValueEvent(progress, 'change', (p) => {
    const next = Math.round(p)
    if (next !== stage) setStage(next)
  })

  return (
    <>
      <div className="wrap">
        <div className="story" ref={story}>
          <div className="story-stage">
            <SceneBoundary>
              <Suspense fallback={<SceneFallback />}>
                <ProjectScene progress={progress} />
              </Suspense>
            </SceneBoundary>
            <div className="story-caption">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={stage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DUR.fast }}
                >
                  <i className={stage >= 2 ? 'accent' : ''} />
                  {t(`cap${stage}`)}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="story-steps" style={{ gridRow: 1 }}>
            <motion.section
              className="step"
              aria-labelledby="hero-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p className="step-index">{hero.eyebrow}</p>
              <h1 id="hero-title" className="hero-title">
                {hero.title} <em>{hero.subtitle}</em>
              </h1>
              <p className="hero-lede">{hero.description}</p>
              <div className="hero-actions">
                <Link className="btn" to="/guide">
                  {t('heroCta')} <ArrowRight size={18} className="flip-rtl" aria-hidden="true" />
                </Link>
                <Link className="link-arrow" to="/calculateur">{t('heroCta2')}</Link>
              </div>
              <dl className="hero-facts">
                {hero.stats.map((stat, i) => (
                  <div key={i} className="hero-fact">
                    <dd>{stat.value}</dd>
                    <dt>{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </motion.section>

            {STEPS.map(({ key, to }) => (
              <section key={key} className="step" aria-labelledby={`${key}-title`}>
                <p className="step-index">{t(`${key}Label`)}</p>
                <h2 id={`${key}-title`}>{t(`${key}Title`)}</h2>
                <p>{t(`${key}Text`)}</p>
                <Link className="link-arrow" to={to}>
                  {t(`${key}Link`)} <ArrowRight size={16} className="flip-rtl" aria-hidden="true" />
                </Link>
              </section>
            ))}
          </div>
        </div>
      </div>

      <section className="section" aria-labelledby="toc-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2 id="toc-title" className="section-title">{t('tocTitle')}</h2>
              <p className="section-sub">{t('tocSub')}</p>
            </div>
          </div>
          <div className="toc-columns">
            <ChapterRows chapters={chapters.slice(0, Math.ceil(chapters.length / 2))} compact />
            <ChapterRows chapters={chapters.slice(Math.ceil(chapters.length / 2))} compact />
          </div>
          <p className="section-foot">
            <Link className="link-arrow" to="/guide">
              {t('tocAll')} <ArrowRight size={16} className="flip-rtl" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="section deep">
        <div className="wrap">
          <EvmTeaser />
        </div>
      </section>

      <section className="section warm" aria-labelledby="closing-title">
        <div className="wrap closing">
          <h2 id="closing-title" className="section-title">{t('closingTitle')}</h2>
          <Link className="btn" to="/guide/ch1">
            {t('closingCta')} <ArrowRight size={18} className="flip-rtl" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
