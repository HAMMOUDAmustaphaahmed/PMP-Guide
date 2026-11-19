import React from 'react'
import { motion } from 'framer-motion'
import { useLanguageStore } from '../../stores/languageStore'
import { useT } from '../../hooks/useT'
import { SPRING } from '../../lib/motion'

// Drapeaux dessinés en SVG : nets à toute taille, sans image à charger.
const FlagFr = () => (
  <svg viewBox="0 0 30 20" aria-hidden="true">
    <rect width="10" height="20" fill="#0055a4" />
    <rect x="10" width="10" height="20" fill="#fff" />
    <rect x="20" width="10" height="20" fill="#ef4135" />
  </svg>
)

const FlagGb = () => (
  <svg viewBox="0 0 30 20" aria-hidden="true">
    <rect width="30" height="20" fill="#012169" />
    <path d="M0 0l30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
    <path d="M0 0l30 20M30 0L0 20" stroke="#c8102e" strokeWidth="1.6" />
    <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="6.6" />
    <path d="M15 0v20M0 10h30" stroke="#c8102e" strokeWidth="4" />
  </svg>
)

const FlagTn = () => (
  <svg viewBox="0 0 30 20" aria-hidden="true">
    <rect width="30" height="20" fill="#e70013" />
    <circle cx="15" cy="10" r="5" fill="#fff" />
    <circle cx="15" cy="10" r="3.75" fill="#e70013" />
    <circle cx="16" cy="10" r="3" fill="#fff" />
    <path
      fill="#e70013"
      d="M16.3 7.75l.53 1.63h1.71l-1.38 1 .53 1.62-1.39-1-1.38 1 .53-1.62-1.39-1h1.71z"
    />
  </svg>
)

const LANGUAGES = [
  { code: 'fr', label: 'Français', Flag: FlagFr },
  { code: 'en', label: 'English', Flag: FlagGb },
  { code: 'ar', label: 'العربية', Flag: FlagTn },
]

export function LanguageToggle() {
  const language = useLanguageStore((s) => s.language)
  const setLanguage = useLanguageStore((s) => s.setLanguage)
  const { t } = useT()

  return (
    <div className="lang-switch" role="group" aria-label={t('language')}>
      {LANGUAGES.map(({ code, label, Flag }) => {
        const active = code === language
        return (
          <button
            key={code}
            type="button"
            className={`lang-switch-btn ${active ? 'active' : ''}`}
            onClick={() => setLanguage(code)}
            aria-pressed={active}
            aria-label={label}
            title={label}
            lang={code}
          >
            {/* L'anneau glisse d'un drapeau à l'autre. */}
            {active && <motion.span layoutId="lang-active" className="lang-switch-ring" transition={SPRING} />}
            <span className="lang-flag"><Flag /></span>
          </button>
        )
      })}
    </div>
  )
}
