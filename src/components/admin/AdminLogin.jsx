import React, { useEffect, useId, useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'
import { useT } from '../../hooks/useT'
import { Modal } from '../common/Modal'

export function AdminLogin() {
  const { t } = useT()
  const isOpen = useUiStore((s) => s.loginOpen)
  const setLoginOpen = useUiStore((s) => s.setLoginOpen)
  const login = useAuthStore((s) => s.login)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const userId = useId()
  const passId = useId()
  const errorId = useId()

  useEffect(() => {
    if (!isOpen) return
    setUsername('')
    setPassword('')
    setShowPassword(false)
    setError('')
  }, [isOpen])

  const close = () => setLoginOpen(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !password) return setError(t('required'))
    setPending(true)
    const errorKey = await login(username, password)
    setPending(false)
    if (errorKey) return setError(t(errorKey))
    close()
  }

  return (
    <Modal isOpen={isOpen} onClose={close} title={t('admin')} subtitle={t('login')} icon={<Lock size={17} />}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="modal-field">
          <label className="modal-label" htmlFor={userId}>{t('username')}</label>
          <input
            id={userId}
            className="modal-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            data-autofocus
          />
        </div>

        <div className="modal-field">
          <label className="modal-label" htmlFor={passId}>{t('password')}</label>
          <div className="input-with-btn">
            <input
              id={passId}
              className="modal-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              aria-describedby={error ? errorId : undefined}
            />
            <button
              type="button"
              className="icon-btn"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? t('hidePassword') : t('showPassword')}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {error && <p className="modal-error" id={errorId} role="alert">{error}</p>}

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={close}>{t('cancel')}</button>
          <button type="submit" className="btn-primary" disabled={pending}>
            {pending ? t('connecting') : t('connect')}
          </button>
        </div>
      </form>
    </Modal>
  )
}
