import React from 'react'
import { motion } from 'framer-motion'
import { useLanguageStore } from '../../stores/languageStore'
import { useT } from '../../hooks/useT'
import { SPRING } from '../../lib/motion'

const LANGUAGES = [
  { code: 'fr', short: 'FR', label: 'Français' },
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'ar', short: 'ع', label: 'العربية' },
]

// Trois langues tiennent sur une ligne : un sélecteur segmenté évite
// le menu déroulant et son clic supplémentaire.
export function LanguageToggle() {
  const language = useLanguageStore((s) => s.language)
  const setLanguage = useLanguageStore((s) => s.setLanguage)
  const { t } = useT()

  return (
    <div className="lang-switch" role="group" aria-label={t('language')}>
      {LANGUAGES.map((lang) => {
        const active = lang.code === language
        return (
          <button
            key={lang.code}
            type="button"
            className={`lang-switch-btn ${active ? 'active' : ''}`}
            onClick={() => setLanguage(lang.code)}
            aria-pressed={active}
            lang={lang.code}
            title={lang.label}
          >
            {active && <motion.span layoutId="lang-active" className="lang-switch-pill" transition={SPRING} />}
            <span className="lang-switch-text">{lang.short}</span>
            <span className="sr-only">{lang.label}</span>
          </button>
        )
      })}
    </div>
  )
}
