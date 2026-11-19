import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCurrentContent } from '../hooks/useCurrentContent'
import { useT } from '../hooks/useT'
import { SectionRenderer } from '../components/chapters/SectionRenderer'
import { ReadToggle } from '../components/chapters/ReadToggle'
import { SPRING } from '../lib/motion'

// Sommaire du chapitre, à gauche sur grand écran. La section en cours de
// lecture est celle qui traverse le haut de la fenêtre.
function Rail({ sections }) {
  const { t } = useT()
  const [activeId, setActiveId] = useState(sections[0]?.id)
  const ids = sections.map((s) => s.id).join(',')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActiveId(visible[0].target.dataset.section)
      },
      // Une bande fine sous la barre de navigation : la section qui la traverse est la section lue.
      { rootMargin: '-20% 0px -79% 0px' }
    )
    // On observe les sections entières, pas seulement leurs titres :
    // la section reste active tant qu'on la lit, même après un saut dans la page.
    ids.split(',').forEach((id) => {
      const el = document.querySelector(`[data-section="${id}"]`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  return (
    <nav className="reader-rail" aria-label={t('onThisPage')}>
      <p className="rail-title">{t('onThisPage')}</p>
      <ul>
        {sections.map((section) => {
          const active = section.id === activeId
          return (
            <li key={section.id}>
              <a
                className={`rail-link ${active ? 'active' : ''}`}
                href={`#${section.id}`}
                aria-current={active ? 'location' : undefined}
              >
                {active && <motion.span layoutId="rail-mark" className="rail-mark" transition={SPRING} />}
                {section.heading}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default function Chapter() {
  const { chapterId } = useParams()
  const { chapters } = useCurrentContent()
  const { t } = useT()
  const index = chapters.findIndex((c) => c.id === chapterId)
  const chapter = chapters[index]

  useEffect(() => {
    if (chapter) document.title = `${chapter.num} · ${chapter.title}`
  }, [chapter])

  if (!chapter) return <Navigate to="/guide" replace />

  const previous = chapters[index - 1]
  const next = chapters[index + 1]

  return (
    <article className="wrap page" aria-labelledby="chapter-title">
      <header className="page-head">
        <nav className="crumbs" aria-label={t('backToc')}>
          <Link to="/guide">{t('guideTitle')}</Link>
          <span aria-hidden="true">/</span>
          <span className="num">{t('chapter')} {chapter.num}</span>
        </nav>
        <h1 id="chapter-title" className="page-title">{chapter.title}</h1>
        <p className="page-lede">{chapter.desc}</p>
        <div className="page-meta">
          <ReadToggle id={chapter.id} />
          <span className="label">{chapter.sections.length} {t('sections')}</span>
        </div>
      </header>

      <div className="reader">
        <Rail key={chapter.id} sections={chapter.sections} />

        <div className="reader-body">
          {chapter.sections.map((section) => (
            <section key={section.id} className="reader-section" data-section={section.id}>
              <h2 className="sh" id={section.id}>{section.heading}</h2>
              <SectionRenderer section={section} />
            </section>
          ))}

          <nav className="pager" aria-label={t('chapters')}>
            {previous ? (
              <Link to={`/guide/${previous.id}`}>
                <span className="label">{t('prev')}</span>
                <span className="pager-title">{previous.title}</span>
              </Link>
            ) : (
              <Link to="/guide">
                <span className="label">{t('backToc')}</span>
                <span className="pager-title">{t('guideTitle')}</span>
              </Link>
            )}
            {next ? (
              <Link to={`/guide/${next.id}`}>
                <span className="label">{t('next')}</span>
                <span className="pager-title">{next.title}</span>
              </Link>
            ) : (
              <Link to="/calculateur">
                <span className="label">{t('tools')}</span>
                <span className="pager-title">{t('evmNav')}</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </article>
  )
}
