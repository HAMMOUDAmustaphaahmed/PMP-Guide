// Earned Value Management : les formules de l'annexe, calculées.
// BAC = budget à l'achèvement, PV = valeur planifiée,
// EV = valeur acquise, AC = coût réel.

const ratio = (a, b) => (b > 0 ? a / b : null)

export function computeEvm({ bac, pv, ev, ac }) {
  const values = [bac, pv, ev, ac]
  if (values.some((v) => !Number.isFinite(v) || v < 0)) return null

  const cpi = ratio(ev, ac)
  const spi = ratio(ev, pv)
  const eac = cpi ? bac / cpi : null
  const remainingBudget = bac - ac

  return {
    cv: ev - ac,
    sv: ev - pv,
    cpi,
    spi,
    eac,
    etc: eac === null ? null : eac - ac,
    vac: eac === null ? null : bac - eac,
    // Performance à tenir sur le reste du projet pour finir dans le budget.
    tcpi: remainingBudget > 0 ? (bac - ev) / remainingBudget : null,
    progress: ratio(ev, bac),
  }
}

// 'good' | 'warn' | 'bad' pour un indice où 1 signifie « conforme au plan ».
export function indexStatus(index) {
  if (index === null) return 'unknown'
  if (index >= 1) return 'good'
  if (index >= 0.9) return 'warn'
  return 'bad'
}
