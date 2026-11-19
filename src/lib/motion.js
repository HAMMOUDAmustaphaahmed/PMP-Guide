// Un seul vocabulaire de mouvement pour toute l'application.
// MotionConfig reducedMotion="user" (main.jsx) coupe les déplacements
// pour les personnes qui ont demandé moins d'animations.

export const EASE = [0.16, 1, 0.3, 1]

export const DUR = { fast: 0.18, base: 0.32, slow: 0.6 }

export const SPRING = { type: 'spring', stiffness: 380, damping: 32 }
export const SPRING_SOFT = { type: 'spring', stiffness: 180, damping: 26 }

export const VIEWPORT = { once: true, margin: '-80px' }

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE } },
}

export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.base } },
  exit: { opacity: 0, transition: { duration: DUR.fast } },
}

export const pop = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: SPRING },
  exit: { opacity: 0, scale: 0.97, y: 8, transition: { duration: DUR.fast } },
}

export const stagger = (each = 0.06, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
})
