import React, { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { computeEvm, indexStatus } from '../../lib/evm'
import { useT } from '../../hooks/useT'

const EV = 50000
const STATUS = {
  good: { icon: CheckCircle2, color: '#047857' },
  warn: { icon: AlertTriangle, color: '#b45309' },
  bad: { icon: XCircle, color: '#b91c1c' },
}

// Un seul curseur : on voit l'indice des coûts réagir avant d'ouvrir l'outil complet.
export function EvmTeaser() {
  const { t, language } = useT()
  const [ac, setAc] = useState(58000)
  const id = useId()
  const { cpi } = computeEvm({ bac: 100000, pv: 50000, ev: EV, ac })
  const status = indexStatus(cpi)
  const Icon = STATUS[status].icon
  const money = new Intl.NumberFormat(language, { maximumFractionDigits: 0 })

  return (
    <div className="teaser">
      <div className="teaser-text">
        <h2 className="section-title">{t('teaserTitle')}</h2>
        <p className="section-sub">{t('teaserText')}</p>
        <Link className="link-arrow" to="/calculateur" style={{ marginTop: 20 }}>
          {t('teaserLink')} <ArrowRight size={16} className="flip-rtl" aria-hidden="true" />
        </Link>
      </div>

      <div className="teaser-panel" style={{ '--st': STATUS[status].color }}>
        <div className="teaser-row" aria-live="polite">
          <div>
            <div className="label">CPI</div>
            <div className="teaser-value">{cpi.toFixed(2)}</div>
          </div>
          <div className="teaser-verdict">
            <Icon size={18} aria-hidden="true" />
            {t(`cost_${status}`)}
          </div>
        </div>

        <label className="sr-only" htmlFor={id}>{t('teaserAc')}</label>
        <input
          id={id}
          className="range"
          type="range"
          min="35000"
          max="80000"
          step="1000"
          value={ac}
          onChange={(e) => setAc(Number(e.target.value))}
        />
        <div className="teaser-legend">
          <span>{t('teaserEv')} <strong>{money.format(EV)}</strong></span>
          <span>{t('teaserAc')} <strong>{money.format(ac)}</strong></span>
        </div>
      </div>
    </div>
  )
}
