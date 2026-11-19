import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useMatch } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { LanguageToggle } from '../common/LanguageToggle'
import { useT } from '../../hooks/useT'
import { SPRING } from '../../lib/motion'

const LINKS = [
  { to: '/guide', key: 'navGuide' },
  { to: '/calculateur', key: 'navCalc' },
  { to: '/annexes', key: 'navAnnexes' },
  { to: '/bibliotheque', key: 'navLibrary' },
]

// Fil de lecture sous la barre, sur les pages de chapitre seulement.
function ReadProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 })
  return <motion.div className="read-progress" style={{ scaleX }} aria-hidden="true" />
}

export function TopNav() {
  const { t } = useT()
  const { pathname } = useLocation()
  const onChapter = useMatch('/guide/:chapterId')
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="topnav">
      <div className="wrap topnav-in">
        <Link className="brand" to="/" aria-label={t('appTitle')}>
          <span className="brand-mark" aria-hidden="true" />
          PMP Guide
        </Link>

        <button
          type="button"
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label={t('menu')}
          aria-expanded={open}
          aria-controls="site-nav"
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>

        <nav id="site-nav" className={`topnav-links ${open ? 'open' : ''}`} aria-label={t('menu')}>
          {LINKS.map(({ to, key }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `topnav-link ${isActive ? 'active' : ''}`}>
              {({ isActive }) => (
                <>
                  {t(key)}
                  {isActive && <motion.span layoutId="nav-line" className="topnav-link-line" transition={SPRING} />}
                </>
              )}
            </NavLink>
          ))}
          <LanguageToggle />
        </nav>
      </div>
      {onChapter && <ReadProgress />}
    </header>
  )
}
