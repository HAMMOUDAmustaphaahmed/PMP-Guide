import React from 'react'
import { Linkedin } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'
import { useT } from '../../hooks/useT'

export function Footer() {
  const { t } = useT()
  const isAdmin = useAuthStore((s) => s.isAdmin)
  const apiStatus = useAuthStore((s) => s.apiStatus)
  const setLoginOpen = useUiStore((s) => s.setLoginOpen)

  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>
          <a
            className="footer-credit"
            href="https://www.linkedin.com/in/ahmed-mustapha-hammouda-a55270195/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('footer')}
            <Linkedin size={15} aria-hidden="true" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </p>
        <p>
          {t('footerNote')}
          {/* Proposé seulement si un serveur d'administration répond. */}
          {apiStatus === 'ready' && !isAdmin && (
            <>
              {' '}
              <button type="button" className="footer-link" onClick={() => setLoginOpen(true)}>
                {t('login')}
              </button>
            </>
          )}
        </p>
      </div>
    </footer>
  )
}
