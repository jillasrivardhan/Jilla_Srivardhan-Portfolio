'use client'

import { motion } from 'framer-motion'
import { journey } from '@/data/profile'
import { cn } from '@/lib/utils'
import { Section, SectionHeading } from './primitives'

export function Journey() {
  return (
    <Section id="journey" className="border-t border-white/[0.04]">
      <SectionHeading
        index="07"
        eyebrow="Roadmap"
        id="journey-title"
        title="My AI Journey"
        description="From fundamentals to agentic systems — one layer at a time."
      />

      <ol className="relative grid gap-4 md:grid-cols-5 md:gap-3">
        <div
          aria-hidden="true"
          className="absolute top-5 right-0 left-0 hidden h-px bg-gradient-to-r from-signal/60 via-pulse/40 to-transparent md:block"
        />
        {journey.map((step, i) => (
          <motion.li
            key={step.stage}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex gap-4 md:flex-col"
          >
            <span
              className={cn(
                'relative z-10 grid size-10 shrink-0 place-items-center rounded-full border bg-background font-mono text-xs',
                step.open ? 'border-dashed border-white/25 text-muted-foreground' : 'border-signal/50 text-signal',
              )}
            >
              {step.open ? '…' : String(i + 1).padStart(2, '0')}
            </span>
            <div
              className={cn(
                'flex-1 rounded-xl border p-4',
                step.open ? 'border-dashed border-white/15 bg-transparent' : 'border-white/[0.08] bg-card/60',
              )}
            >
              <h3 className="font-mono text-xs tracking-[0.2em] text-foreground uppercase">{step.stage}</h3>
              <ul className="mt-3 space-y-1.5">
                {step.items.map((item) => (
                  <li key={item} className={cn('text-sm', step.open ? 'text-signal italic' : 'text-muted-foreground')}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}
