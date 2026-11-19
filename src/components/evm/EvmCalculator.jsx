import React, { useId, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, MinusCircle, XCircle } from 'lucide-react'
import { computeEvm, indexStatus } from '../../lib/evm'
import { AnimatedNumber } from '../common/CountUp'
import { useT } from '../../hooks/useT'
import { fadeUp, SPRING_SOFT, VIEWPORT } from '../../lib/motion'

const PRESETS = {
  healthy: { bac: 100000, pv: 40000, ev: 42000, ac: 39000 },
  overBudget: { bac: 100000, pv: 50000, ev: 50000, ac: 62000 },
  late: { bac: 100000, pv: 60000, ev: 45000, ac: 46000 },
}

// La couleur n'est jamais le seul signal : chaque statut a aussi une icône et un texte.
const STATUS = {
  good: { icon: CheckCircle2, color: '#047857', bg: '#D1FAE5' },
  warn: { icon: AlertTriangle, color: '#B45309', bg: '#FEF3C7' },
  bad: { icon: XCircle, color: '#B91C1C', bg: '#FEE2E2' },
  unknown: { icon: MinusCircle, color: '#475569', bg: '#F1F5F9' },
}

function NumberField({ label, hint, value, onChange }) {
  const id = useId()
  return (
    <div className="evm-field">
      <label htmlFor={id} className="evm-label">{label}</label>
      <input
        id={id}
        className="evm-input"
        type="number"
        inputMode="decimal"
        min="0"
        step="1000"
        value={Number.isFinite(value) ? value : ''}
        onChange={(e) => onChange(e.target.value === '' ? NaN : Number(e.target.value))}
        aria-describedby={`${id}-hint`}
      />
      <p id={`${id}-hint`} className="evm-hint">{hint}</p>
    </div>
  )
}

// Jauge d'indice de 0 à 2, avec le repère « conforme au plan » à 1.
function IndexGauge({ name, value, verdict }) {
  const status = STATUS[indexStatus(value)]
  const Icon = status.icon
  const fill = value === null ? 0 : Math.min(value, 2) / 2

  return (
    <div className="evm-gauge" style={{ '--st': status.color, '--st-bg': status.bg }}>
      <div className="evm-gauge-top">
        <span className="evm-gauge-name">{name}</span>
        <span className="evm-gauge-value">
          <span className="sr-only">{value === null ? '—' : value.toFixed(2)}</span>
          <AnimatedNumber value={value} format={(n) => n.toFixed(2)} />
        </span>
      </div>
      <div className="evm-track" aria-hidden="true">
        <motion.div className="evm-fill" initial={false} animate={{ scaleX: fill }} transition={SPRING_SOFT} />
        <div className="evm-mark" />
      </div>
      <p className="evm-verdict"><Icon size={15} aria-hidden="true" />{verdict}</p>
    </div>
  )
}

export function EvmCalculator() {
  const { t, language } = useT()
  const [inputs, setInputs] = useState(PRESETS.overBudget)
  const result = useMemo(() => computeEvm(inputs), [inputs])

  const money = useMemo(() => {
    const fmt = new Intl.NumberFormat(language, { maximumFractionDigits: 0 })
    return (n) => fmt.format(Math.round(n))
  }, [language])

  const set = (key) => (value) => setInputs((prev) => ({ ...prev, [key]: value }))
  const verdict = (index, prefix) => t(`${prefix}_${indexStatus(index)}`)

  const figures = result && [
    { key: 'cv', value: result.cv, signed: true },
    { key: 'sv', value: result.sv, signed: true },
    { key: 'eac', value: result.eac },
    { key: 'etc', value: result.etc },
    { key: 'vac', value: result.vac, signed: true },
  ]

  return (
    <div className="section-wrap" id="evm">
      <motion.article
        className="ch-card"
        style={{ '--ch-accent': '#7C3AED', '--ch-accent-dk': '#5B21B6' }}
        aria-labelledby="evm-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        <header className="ch-card-header">
          <div className="ch-card-header-bg" aria-hidden="true" />
          <div className="ch-card-header-circle" aria-hidden="true" />
          <div className="ch-num">{t('evmEyebrow')}</div>
          <h2 className="ch-title" id="evm-title">{t('evmTitle')}</h2>
          <p className="ch-desc">{t('evmDesc')}</p>
        </header>

        <div className="ch-card-body">
          <div className="evm-presets" role="group" aria-label={t('evmPresets')}>
            <span className="evm-presets-label">{t('evmPresets')}</span>
            {Object.keys(PRESETS).map((key) => (
              <button key={key} type="button" className="chip-btn" onClick={() => setInputs(PRESETS[key])}>
                {t(`preset_${key}`)}
              </button>
            ))}
          </div>

          <div className="evm-inputs">
            <NumberField label="BAC" hint={t('bacHint')} value={inputs.bac} onChange={set('bac')} />
            <NumberField label="PV" hint={t('pvHint')} value={inputs.pv} onChange={set('pv')} />
            <NumberField label="EV" hint={t('evHint')} value={inputs.ev} onChange={set('ev')} />
            <NumberField label="AC" hint={t('acHint')} value={inputs.ac} onChange={set('ac')} />
          </div>

          {/* aria-live : les résultats sont annoncés quand les entrées changent. */}
          <div aria-live="polite">
            {!result ? (
              <p className="evm-invalid">{t('evmInvalid')}</p>
            ) : (
              <>
                <div className="evm-gauges">
                  <IndexGauge name={`CPI · ${t('costIndex')}`} value={result.cpi} verdict={verdict(result.cpi, 'cost')} />
                  <IndexGauge name={`SPI · ${t('scheduleIndex')}`} value={result.spi} verdict={verdict(result.spi, 'schedule')} />
                </div>

                <dl className="evm-figures">
                  {figures.map(({ key, value, signed }) => {
                    const negative = signed && value !== null && value < 0
                    return (
                      <div key={key} className={`evm-figure ${negative ? 'negative' : ''}`}>
                        <dt>
                          <abbr title={t(`${key}Full`)}>{key.toUpperCase()}</abbr>
                          <span>{t(`${key}Full`)}</span>
                        </dt>
                        <dd>
                          <span className="sr-only">{value === null ? '—' : money(value)}</span>
                          <AnimatedNumber value={value} format={money} />
                        </dd>
                      </div>
                    )
                  })}
                </dl>

                <p className="evm-tcpi">
                  <strong>TCPI {result.tcpi === null ? '—' : result.tcpi.toFixed(2)}</strong>
                  {' — '}
                  {result.tcpi === null ? t('tcpiNone') : result.tcpi > 1.1 ? t('tcpiHard') : t('tcpiOk')}
                </p>
              </>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  )
}
