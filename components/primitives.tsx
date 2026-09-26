'use client'

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  id,
}: {
  index: string
  eyebrow: string
  title: React.ReactNode
  description?: string
  id: string
}) {
  return (
    <Reveal className="mb-12 max-w-3xl md:mb-16">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-signal">
        <span className="text-muted-foreground">{index}</span>
        <span className="h-px w-8 bg-signal/50" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </Reveal>
  )
}

export function Section({
  id,
  className,
  children,
}: {
  id: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('relative px-5 py-24 md:px-8 md:py-32', className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

export function MagneticLink({
  href,
  children,
  variant = 'primary',
  external,
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  external?: boolean
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18 })
  const sy = useSpring(y, { stiffness: 250, damping: 18 })

  function handleMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external || href.startsWith('mailto:') ? '_blank' : undefined}
      rel={external || href.startsWith('mailto:') ? 'noopener noreferrer' : undefined}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn(
        'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors',
        variant === 'primary'
          ? 'bg-foreground text-background hover:bg-signal'
          : 'border border-white/12 bg-white/[0.03] text-foreground backdrop-blur hover:border-signal/50 hover:bg-white/[0.06]',
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </motion.a>
  )
}
