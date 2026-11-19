import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import { buildShapes } from './shapes'

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

// Un disque net : sans texture, les points seraient des carrés.
function useDotTexture() {
  const texture = useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2)
    ctx.fill()
    return new THREE.CanvasTexture(canvas)
  }, [])
  useEffect(() => () => texture.dispose(), [texture])
  return texture
}

function Points({ progress, count, reduced }) {
  const group = useRef(null)
  const geometry = useRef(null)
  const eased = useRef(progress.get())
  const texture = useDotTexture()
  const { viewport, invalidate } = useThree()

  const shapes = useMemo(() => buildShapes(count), [count])
  const positions = useMemo(() => new Float32Array(shapes[0].positions), [shapes])
  const colors = useMemo(() => new Float32Array(shapes[0].colors), [shapes])

  // En animations réduites, la scène ne tourne pas en continu :
  // elle se redessine seulement quand on change d'étape.
  useEffect(() => {
    if (!reduced) return
    invalidate()
    return progress.on('change', () => invalidate())
  }, [reduced, progress, invalidate])

  useFrame((state, delta) => {
    const target = reduced ? Math.round(progress.get()) : progress.get()
    eased.current = reduced ? target : eased.current + (target - eased.current) * Math.min(1, delta * 6)
    const p = Math.min(shapes.length - 1, Math.max(0, eased.current))

    const from = Math.min(shapes.length - 2, Math.floor(p))
    // La figure reste lisible au début et à la fin de chaque étape ; elle se transforme au milieu.
    const t = smoothstep(0.15, 0.85, p - from)
    const a = shapes[from]
    const b = shapes[from + 1]

    const disorder = Math.max(0, 1 - p) // 1 dans le désordre, 0 dès que la première figure est formée
    const amplitude = reduced ? 0 : 0.012 + disorder * 0.1
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const j = i * 3
      positions[j] = a.positions[j] + (b.positions[j] - a.positions[j]) * t + Math.sin(time * 0.6 + i * 1.7) * amplitude
      positions[j + 1] = a.positions[j + 1] + (b.positions[j + 1] - a.positions[j + 1]) * t + Math.cos(time * 0.5 + i * 2.3) * amplitude
      positions[j + 2] = a.positions[j + 2] + (b.positions[j + 2] - a.positions[j + 2]) * t
      colors[j] = a.colors[j] + (b.colors[j] - a.colors[j]) * t
      colors[j + 1] = a.colors[j + 1] + (b.colors[j + 1] - a.colors[j + 1]) * t
      colors[j + 2] = a.colors[j + 2] + (b.colors[j + 2] - a.colors[j + 2]) * t
    }
    geometry.current.attributes.position.needsUpdate = true
    geometry.current.attributes.color.needsUpdate = true

    // Le nuage dérive lentement tant qu'il est en désordre, puis se pose à plat.
    if (group.current) {
      group.current.rotation.y = reduced ? 0 : disorder * Math.sin(time * 0.12) * 0.5
      group.current.rotation.x = reduced ? 0 : disorder * Math.sin(time * 0.09) * 0.25
      group.current.scale.setScalar(Math.min(viewport.width / 6.4, viewport.height / 4.8, 1.3))
    }
  })

  return (
    <group ref={group}>
      <points>
        <bufferGeometry ref={geometry}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} map={texture} alphaTest={0.5} vertexColors sizeAttenuation />
      </points>
    </group>
  )
}

export default function ProjectScene({ progress }) {
  const reduced = useReducedMotion()
  const holder = useRef(null)
  const [visible, setVisible] = useState(true)
  // Moins de points sur petit écran : les téléphones ont bien moins de marge.
  const count = useMemo(() => (window.innerWidth < 860 ? 1300 : 2400), [])

  // Hors écran, la scène s'arrête de calculer.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(holder.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={holder} className="story-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        frameloop={reduced ? 'demand' : visible ? 'always' : 'never'}
      >
        <Points progress={progress} count={count} reduced={reduced} />
      </Canvas>
    </div>
  )
}
