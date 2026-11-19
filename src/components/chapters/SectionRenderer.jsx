import React from 'react'
import { ArrowRight } from 'lucide-react'
import { parseBold } from '../../lib/utils'

function InfoBox({ box }) {
  if (!box) return null
  return (
    <div className="info-box">
      <div className="info-box-header" style={{ background: box.color }}>
        {box.title}
      </div>
      <ul className="info-box-body" style={{ background: box.bg }}>
        {box.items.map((item, i) => (
          <li key={i}>
            <ArrowRight size={14} className="flip-rtl" color={box.color} aria-hidden="true" style={{ flexShrink: 0, marginTop: 4 }} />
            <span>{parseBold(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TableRenderer({ headers, rows }) {
  if (!headers || !rows) return null
  return (
    <div className="tbl-wrap" tabIndex={0} role="region" aria-label="Tableau">
      <table>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} scope="col">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{parseBold(String(cell))}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Badges({ items }) {
  if (!items) return null
  return (
    <div className="badge-grid">
      {items.map((item, i) => (
        <div key={i} className="badge-card">
          <div className="badge-title" style={{ background: item.color }}>
            {item.title}
          </div>
          <div className="badge-desc" style={{ background: item.bg }}>
            {parseBold(item.desc)}
          </div>
        </div>
      ))}
    </div>
  )
}

function Phases({ items }) {
  if (!items) return null
  return (
    <div className="phase-strip">
      {items.map((item, i) => (
        <div key={i} className="phase-row">
          <div className="phase-lbl" style={{ background: item.color }}>
            {item.label}
          </div>
          <div className="phase-desc">{parseBold(item.desc)}</div>
        </div>
      ))}
    </div>
  )
}

function KpiRow({ items }) {
  if (!items) return null
  return (
    <div className="kpi-row">
      {items.map((item, i) => (
        <div
          key={i}
          className="kpi-card"
          style={{
            '--kpi-acc': item.color,
            '--kpi-lgt': item.bg,
            borderTopColor: item.color,
          }}
        >
          <div className="kpi-label">{item.label}</div>
          <div className="kpi-value" style={{ color: item.color }}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  )
}

function SwotGrid({ items }) {
  if (!items || items.length < 4) return null
  return (
    <div className="swot-grid">
      {items.map((item, i) => (
        <div key={i} className="swot-cell">
          <div className="swot-head" style={{ background: item.color }}>
            {item.title}
          </div>
          <div className="swot-body" style={{ background: item.bg }}>
            {parseBold(item.desc)}
          </div>
        </div>
      ))}
    </div>
  )
}

function riskColor(value) {
  if (value >= 15) return '#DC2626'
  if (value >= 8) return '#D97706'
  if (value >= 4) return '#EAB308'
  return '#059669'
}

function RiskMatrix() {
  const probs = ['Très probable (5)', 'Probable (4)', 'Possible (3)', 'Peu probable (2)', 'Rare (1)']
  const pVals = [5, 4, 3, 2, 1]
  const impacts = ['Très faible (1)', 'Faible (2)', 'Modéré (3)', 'Élevé (4)', 'Critique (5)']
  const iVals = [1, 2, 3, 4, 5]

  return (
    <div className="matrix-wrap" tabIndex={0} role="region" aria-label="Matrice des risques">
      <table className="risk-matrix">
        <thead>
          <tr>
            <th>P \ I</th>
            {impacts.map((imp, i) => (
              <th key={i}>{imp}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pVals.map((p, i) => (
            <tr key={i}>
              <th className="row-lbl">{probs[i]}</th>
              {iVals.map((imp) => {
                const val = p * imp
                return (
                  <td
                    key={imp}
                    className="risk-cell"
                    style={{ background: riskColor(val) }}
                  >
                    {val}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function SectionRenderer({ section }) {
  switch (section.type) {
    case 'text+box':
    case 'box':
      return (
        <>
          {section.body && <p className="body-text">{parseBold(section.body)}</p>}
          {section.box && <InfoBox box={section.box} />}
        </>
      )
    case 'table':
      return <TableRenderer headers={section.headers} rows={section.rows} />
    case 'badges':
      return (
        <>
          {section.body && <p className="body-text">{parseBold(section.body)}</p>}
          <Badges items={section.items} />
        </>
      )
    case 'phases':
      return (
        <>
          {section.body && <p className="body-text">{parseBold(section.body)}</p>}
          <Phases items={section.items} />
        </>
      )
    case 'kpi':
      return <KpiRow items={section.items} />
    case 'swot':
      return <SwotGrid items={section.items} />
    case 'risk-matrix':
      return <RiskMatrix />
    default:
      return null
  }
}