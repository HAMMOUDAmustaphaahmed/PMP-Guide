// Les quatre figures que les points dessinent tour à tour :
// le désordre, le triangle des contraintes, un planning de Gantt,
// puis les courbes de valeur acquise. Les mêmes points servent partout :
// seules leurs positions et leurs couleurs cibles changent.

// Couleurs en espace linéaire : Three.js les reconvertit en sRGB à l'affichage
// (#1c1917 pour l'encre, #c2410c pour l'accent).
const INK = [0.0116, 0.0097, 0.0086]
const ACCENT = [0.539, 0.053, 0.0037]

// Générateur pseudo-aléatoire à graine : la scène est identique à chaque visite.
function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Un nuage rond, plus dense au centre.
function chaos(rand) {
  const radius = Math.pow(rand(), 0.7)
  const angle = rand() * Math.PI * 2
  return {
    x: Math.cos(angle) * radius * 2.9,
    y: Math.sin(angle) * radius * 2.1,
    z: (rand() * 2 - 1) * 1.6 * (1 - radius * 0.5),
    color: INK,
  }
}

const TRIANGLE = [
  [0, 1.75],
  [-2.3, -1.45],
  [2.3, -1.45],
]

function triangle(rand, i) {
  const k = i % 3
  // Un point sur huit marque un sommet : périmètre, délai, coût.
  if (rand() < 0.125) {
    const r = 0.17 * Math.sqrt(rand())
    const a = rand() * Math.PI * 2
    return { x: TRIANGLE[k][0] + r * Math.cos(a), y: TRIANGLE[k][1] + r * Math.sin(a), z: 0, color: ACCENT }
  }
  const [ax, ay] = TRIANGLE[k]
  const [bx, by] = TRIANGLE[(k + 1) % 3]
  const t = rand()
  return {
    x: ax + (bx - ax) * t + (rand() - 0.5) * 0.04,
    y: ay + (by - ay) * t + (rand() - 0.5) * 0.04,
    z: 0,
    color: INK,
  }
}

// Sept tâches. Une sur deux s'enchaîne sans marge : c'est le chemin critique.
const BARS = [
  [-2.6, -1.2, true],
  [-2.2, -0.6, false],
  [-1.2, 0.2, true],
  [-0.6, 0.9, false],
  [0.2, 1.5, true],
  [0.6, 1.9, false],
  [1.5, 2.6, true],
]
const BARS_LENGTH = BARS.reduce((sum, [a, b]) => sum + (b - a), 0)

function gantt(rand) {
  if (rand() < 0.08) {
    return { x: -2.6 + rand() * 5.2, y: -1.95 + (rand() - 0.5) * 0.02, z: 0, color: INK }
  }
  let pick = rand() * BARS_LENGTH
  let row = 0
  while (row < BARS.length - 1 && pick > BARS[row][1] - BARS[row][0]) {
    pick -= BARS[row][1] - BARS[row][0]
    row += 1
  }
  const [x0, x1, critical] = BARS[row]
  return {
    x: x0 + rand() * (x1 - x0),
    y: 1.5 - row * 0.5 + (rand() - 0.5) * 0.22,
    z: 0,
    color: critical ? ACCENT : INK,
  }
}

const TODAY = 0.5
const curve = (x, shift) => -1.6 + 3.2 / (1 + Math.exp(-1.6 * (x + shift)))

// Prévu (PV) sur toute la durée ; accompli (EV) et dépensé (AC) jusqu'à aujourd'hui.
function curves(rand) {
  const u = rand()
  const jitter = () => (rand() - 0.5) * 0.035
  if (u < 0.13) {
    return rand() < 0.6
      ? { x: -2.7 + rand() * 5.4, y: -1.75 + jitter() * 0.5, z: 0, color: INK }
      : { x: -2.7 + jitter() * 0.5, y: -1.75 + rand() * 3.5, z: 0, color: INK }
  }
  if (u < 0.55) {
    const x = -2.6 + rand() * 5.2
    return { x, y: curve(x, 0) + jitter(), z: 0, color: INK }
  }
  const x = -2.6 + rand() * (TODAY + 2.6)
  if (u < 0.75) return { x, y: curve(x, -0.45) + jitter(), z: 0, color: INK }
  return { x, y: curve(x, 0.4) + jitter(), z: 0, color: ACCENT }
}

const BUILDERS = [chaos, triangle, gantt, curves]

export function buildShapes(count) {
  return BUILDERS.map((build, s) => {
    const rand = mulberry32(1000 + s * 97)
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const p = build(rand, i)
      positions.set([p.x, p.y, p.z], i * 3)
      colors.set(p.color, i * 3)
    }
    return { positions, colors }
  })
}
