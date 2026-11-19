import React from 'react'
import { useLanguageStore, translations } from '../../stores/languageStore'

export function Footer() {
  const { language } = useLanguageStore()
  const t = translations[language] || translations.fr

  return (
    <footer className="site-footer">
      <p>{t.footer}</p>
    </footer>
  )
}