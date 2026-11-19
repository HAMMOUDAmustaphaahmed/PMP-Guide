import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useCurrentContent } from '../../hooks/useCurrentContent'
import { useT } from '../../hooks/useT'
import { fadeUp, VIEWPORT } from '../../lib/motion'

function Table({ headers, rows, caption }) {
  if (!rows?.length) return null
  return (
    <div className="tbl-wrap" tabIndex={0} role="region" aria-label={caption}>
      <table>
        <thead>
          <tr>{headers.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Annexes() {
  const { annexes } = useCurrentContent()
  const { t } = useT()

  return (
    <div className="section-wrap" id="annexes">
      <motion.article
        className="ch-card"
        style={{ '--ch-accent': '#0F172A', '--ch-accent-dk': '#020617' }}
        aria-labelledby="annexes-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        <header className="ch-card-header">
          <div className="ch-card-header-bg" aria-hidden="true" />
          <div className="ch-num">{t('annexes')}</div>
          <h1 className="ch-title" id="annexes-title">{t('annexesTitle')}</h1>
          <p className="ch-desc">{t('annexesDesc')}</p>
        </header>
        <div className="ch-card-body">
          <h2 className="sh">{t('glossaryTitle')}</h2>
          <Table caption={t('glossaryTitle')} headers={[t('term'), t('definition')]} rows={annexes.glossary} />

          <h2 className="sh">{t('formulasTitle')}</h2>
          <Table
            caption={t('formulasTitle')}
            headers={[t('indicator'), t('formula'), t('goodPerf'), t('actionIfBad')]}
            rows={annexes.formulas}
          />

          <h2 className="sh">{t('checklistTitle')}</h2>
          <div className="info-box">
            <div className="info-box-header" style={{ background: '#0F172A' }}>{t('checklistHeader')}</div>
            <ul className="info-box-body" style={{ background: '#F1F5F9' }}>
              {annexes.checklist.map((item, i) => (
                <li key={i}>
                  <ArrowRight size={14} className="flip-rtl" color="#2563EB" aria-hidden="true" style={{ flexShrink: 0, marginTop: 4 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
    </div>
  )
}
