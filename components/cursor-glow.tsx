'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CursorGlow() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 120, damping: 25 })
  const sy = useSpring(y, { stiffness: 120, damping: 25 })

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - 300)
      y.set(e.clientY - 300)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, x, y])

  if (!enabled) return null
  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-0 size-[600px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.06),transparent_60%)]"
    />
  )
}
