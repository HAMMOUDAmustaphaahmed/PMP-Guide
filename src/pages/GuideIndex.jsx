import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useCurrentContent } from '../hooks/useCurrentContent'
import { useProgressStore } from '../stores/progressStore'
import { usePdfStore } from '../stores/pdfStore'
import { useT } from '../hooks/useT'
import { ChapterRows } from '../components/chapters/ChapterRows'

function PlainRow({ num, title, desc, to }) {
  return (
    <li>
      <Link className="toc-row" to={to}>
        <span className="toc-num">{num}</span>
        <span>
          <span className="toc-title">{title}</span>
          <span className="toc-desc" style={{ display: 'block' }}>{desc}</span>
        </span>
        <span className="toc-bar" aria-hidden="true" />
        <span className="toc-go"><ArrowRight size={18} className="flip-rtl" aria-hidden="true" /></span>
      </Link>
    </li>
  )
}

export default function GuideIndex() {
  const { chapters } = useCurrentContent()
  const { t } = useT()
  const done = useProgressStore((s) => s.done)
  const bookCount = usePdfStore((s) => s.pdfs.length)
  const readCount = chapters.filter((c) => done[c.id]).length

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1 className="page-title">{t('guideTitle')}</h1>
        <p className="page-lede">{t('guideLede')}</p>
        <div className="page-meta">
          <span className="progress-line" aria-hidden="true">
            <span style={{ transform: `scaleX(${chapters.length ? readCount / chapters.length : 0})` }} />
          </span>
          <span className="label">
            <span className="num">{readCount} / {chapters.length}</span> {t('chaptersRead')}
          </span>
        </div>
      </header>

      <ol className="toc" style={{ borderBottom: 0 }}>
        <PlainRow num="00" title={t('intro')} desc={t('introDesc')} to="/" />
      </ol>
      <ChapterRows chapters={chapters} />

      <h2 className="subhead">{t('tools')}</h2>
      <ol className="toc">
        <PlainRow num="A" title={t('evmNav')} desc={t('toolEvmDesc')} to="/calculateur" />
        <PlainRow num="B" title={t('annexesTitle')} desc={t('annexesDesc')} to="/annexes" />
        <PlainRow num="C" title={t('libraryTitle')} desc={`${bookCount} ${t('toolLibraryDesc')}`} to="/bibliotheque" />
      </ol>
    </div>
  )
}
