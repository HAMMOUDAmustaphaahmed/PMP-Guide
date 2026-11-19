import React, { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { EASE } from '../../lib/motion'

// Anime un nombre vers sa valeur. Le texte est écrit directement dans le DOM :
// aucun rendu React par image, et les lecteurs d'écran lisent la valeur finale.
export function AnimatedNumber({ value, format = (n) => String(Math.round(n)), duration = 0.6 }) {
  const ref = useRef(null)
  const previous = useRef(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (value === null || !Number.isFinite(value)) {
      node.textContent = '—'
      return
    }
    if (reduced) {
      node.textContent = format(value)
      previous.current = value
      return
    }
    const controls = animate(previous.current, value, {
      duration,
      ease: EASE,
      onUpdate: (n) => { node.textContent = format(n) },
    })
    previous.current = value
    return () => controls.stop()
  }, [value, reduced]) // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref} aria-hidden="true" />
}

// « 12 », « 40+ », « 5 ans » : compte jusqu'au nombre quand il devient visible.
// Un texte sans nombre en tête est affiché tel quel.
export function CountUp({ text }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const match = /^(\d+)(.*)$/.exec(String(text).trim())

  if (!match) return <span>{text}</span>
  return (
    <span ref={ref}>
      <span className="sr-only">{text}</span>
      <AnimatedNumber value={inView ? Number(match[1]) : 0} duration={1.1} />
      <span aria-hidden="true">{match[2]}</span>
    </span>
  )
}
