import test from 'node:test'
import assert from 'node:assert/strict'
import { computeEvm, indexStatus } from './evm.js'

const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≠ ${b}`)

test('projet en dépassement de coût et en retard', () => {
  const r = computeEvm({ bac: 100000, pv: 50000, ev: 40000, ac: 50000 })
  assert.equal(r.cv, -10000)
  assert.equal(r.sv, -10000)
  close(r.cpi, 0.8)
  close(r.spi, 0.8)
  close(r.eac, 125000)
  close(r.etc, 75000)
  close(r.vac, -25000)
  close(r.tcpi, 1.2)
  close(r.progress, 0.4)
})

test('projet conforme au plan', () => {
  const r = computeEvm({ bac: 200, pv: 100, ev: 100, ac: 100 })
  assert.equal(r.cv, 0)
  close(r.cpi, 1)
  close(r.eac, 200)
  close(r.tcpi, 1)
})

test('divisions par zéro : pas de NaN ni d’Infinity', () => {
  const start = computeEvm({ bac: 100, pv: 0, ev: 0, ac: 0 })
  assert.equal(start.cpi, null)
  assert.equal(start.spi, null)
  assert.equal(start.eac, null)
  close(start.tcpi, 1)
  const spent = computeEvm({ bac: 100, pv: 100, ev: 80, ac: 100 })
  assert.equal(spent.tcpi, null)
})

test('entrées invalides', () => {
  assert.equal(computeEvm({ bac: NaN, pv: 1, ev: 1, ac: 1 }), null)
  assert.equal(computeEvm({ bac: 100, pv: -1, ev: 1, ac: 1 }), null)
})

test('seuils de statut', () => {
  assert.equal(indexStatus(1), 'good')
  assert.equal(indexStatus(0.95), 'warn')
  assert.equal(indexStatus(0.89), 'bad')
  assert.equal(indexStatus(null), 'unknown')
})
