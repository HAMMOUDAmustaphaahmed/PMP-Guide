import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Calculator, Check, Library, Menu, X } from 'lucide-react'
import { LanguageToggle } from '../common/LanguageToggle'
import { useCurrentContent } from '../../hooks/useCurrentContent'
import { useProgressStore } from '../../stores/progressStore'
import { useUiStore } from '../../stores/uiStore'
import { useT } from '../../hooks/useT'
import { SPRING } from '../../lib/motion'

export function Sidebar() {
  const { chapters } = useCurrentContent()
  const { t } = useT()
  const isOpen = useUiStore((s) => s.sidebarOpen)
  const setOpen = useUiStore((s) => s.setSidebarOpen)
  const done = useProgressStore((s) => s.done)
  const [activeId, setActiveId] = useState('hero')

  // Progression de lecture : suit le défilement sans rendu React par image.
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })

  const items = [
    { id: 'hero', num: '00', label: t('intro') },
    ...chapters.map((c) => ({ id: c.id, num: c.num, label: c.title, done: done[c.id] })),
    { id: 'evm', icon: <Calculator size={13} aria-hidden="true" />, label: t('evmNav') },
    { id: 'annexes', num: 'A', label: t('annexes') },
    { id: 'pdf-library', icon: <Library size={13} aria-hidden="true" />, label: t('library') },
  ]
  const ids = items.map((i) => i.id).join(',')

  // La section active est celle qui traverse le tiers supérieur de l'écran.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActiveId(visible[visible.length - 1].target.id)
      },
      { rootMargin: '-25% 0px -65% 0px' }
    )
    ids.split(',').forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, setOpen])

  const goTo = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className="hamburger"
        onClick={() => setOpen(!isOpen)}
        aria-label={t('menu')}
        aria-expanded={isOpen}
        aria-controls="sidebar"
      >
        {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
      <div className={`overlay ${isOpen ? 'show' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />

      <nav id="sidebar" className={`navbar ${isOpen ? 'open' : ''}`} aria-label={t('appTitle')}>
        <div className="nav-header">
          <div className="nav-logo">
            <div className="nav-logo-badge" aria-hidden="true">PMP</div>
            <div>
              <div className="nav-title">Project Management</div>
              <div className="nav-sub">{t('navSub')}</div>
            </div>
          </div>
          <LanguageToggle />
          <div className="nav-progress" aria-hidden="true">
            <motion.div className="nav-progress-fill" style={{ scaleX: progress }} />
          </div>
        </div>

        <ul className="nav-scroll">
          {items.map((item) => {
            const active = activeId === item.id
            return (
              <li key={item.id}>
                <a
                  className={`nav-item ${active ? 'active' : ''}`}
                  href={`#${item.id}`}
                  onClick={(e) => goTo(e, item.id)}
                  aria-current={active ? 'location' : undefined}
                >
                  {/* Le même élément glisse d'une entrée à l'autre. */}
                  {active && <motion.span layoutId="nav-active" className="nav-active" transition={SPRING} />}
                  <span className="nav-item-num">{item.icon || item.num}</span>
                  <span className="nav-item-text">{item.label}</span>
                  {item.done && (
                    <span className="nav-item-done">
                      <Check size={12} aria-hidden="true" />
                      <span className="sr-only">{t('read')}</span>
                    </span>
                  )}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
