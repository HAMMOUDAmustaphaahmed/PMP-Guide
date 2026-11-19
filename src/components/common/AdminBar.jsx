import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, PenLine, RotateCcw, Shield, ShieldCheck } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { useContentStore } from '../../stores/contentStore'
import { useLanguageStore } from '../../stores/languageStore'
import { useUiStore } from '../../stores/uiStore'
import { useT } from '../../hooks/useT'
import { DUR, EASE } from '../../lib/motion'

// La barre n'existe que si un serveur d'administration répond :
// sur un hébergement statique, il n'y a rien à quoi se connecter.
export function AdminBar() {
  const { t } = useT()
  const isAdmin = useAuthStore((s) => s.isAdmin)
  const apiStatus = useAuthStore((s) => s.apiStatus)
  const logout = useAuthStore((s) => s.logout)
  const resetContent = useContentStore((s) => s.resetContent)
  const language = useLanguageStore((s) => s.language)
  const isDirty = useContentStore((s) => !!s.dirty[language])
  const setLoginOpen = useUiStore((s) => s.setLoginOpen)
  const setAdminPanelOpen = useUiStore((s) => s.setAdminPanelOpen)
  const [error, setError] = useState('')

  if (apiStatus !== 'ready' && !isAdmin) return null

  const handleReset = async () => {
    if (!window.confirm(t('confirmReset'))) return
    setError('')
    try {
      await resetContent()
    } catch {
      setError(t('saveError'))
    }
  }

  return (
    <motion.div
      className="admin-bar"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: DUR.base, ease: EASE }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isAdmin ? (
          <motion.div key="admin" className="admin-bar-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <span className="admin-badge"><ShieldCheck size={13} aria-hidden="true" />{t('admin')}</span>
            {isDirty && <span className="admin-dirty" role="status">{t('unsaved')}</span>}
            <button type="button" className="admin-bar-btn edit" onClick={() => setAdminPanelOpen(true)}>
              <PenLine size={14} aria-hidden="true" />{t('editContent')}
            </button>
            <button type="button" className="admin-bar-btn reset" onClick={handleReset}>
              <RotateCcw size={14} aria-hidden="true" />{t('reset')}
            </button>
            <button type="button" className="admin-bar-btn logout" onClick={logout}>
              <LogOut size={14} aria-hidden="true" />{t('logout')}
            </button>
            {error && <span className="admin-dirty" role="alert">{error}</span>}
          </motion.div>
        ) : (
          <motion.div key="guest" className="admin-bar-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" className="admin-bar-btn login" onClick={() => setLoginOpen(true)}>
              <Shield size={14} aria-hidden="true" />{t('login')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
