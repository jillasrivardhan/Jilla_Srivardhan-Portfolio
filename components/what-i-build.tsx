'use client'

import { BarChart3, Bot, Database, Layers, Sparkles, Terminal } from 'lucide-react'
import { buildAreas } from '@/data/profile'
import { Reveal, Section, SectionHeading } from './primitives'

const icons = {
  sparkles: Sparkles,
  database: Database,
  bot: Bot,
  chart: BarChart3,
  layers: Layers,
  terminal: Terminal,
}

function SpotlightCard({ children }: { children: React.ReactNode }) {
  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }
  return (
    <div
      onPointerMove={onMove}
      className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-signal/30 md:p-7"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(34,211,238,0.10), transparent 60%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

export function WhatIBuild() {
  return (
    <Section id="build" className="border-t border-white/[0.04]">
      <SectionHeading
        index="02"
        eyebrow="Capabilities"
        id="build-title"
        title="What I Build"
        description="The areas I spend my time on — learning each one by shipping something small and real."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {buildAreas.map((area, i) => {
          const Icon = icons[area.icon]
          return (
            <li key={area.id}>
              <Reveal delay={i * 0.06} className="h-full">
                <SpotlightCard>
                  <div className="mb-10 flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-signal transition-colors group-hover:border-signal/40">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/70">{area.id}</span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">{area.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{area.description}</p>
                  <p className="mt-6 font-mono text-[11px] tracking-wide text-muted-foreground/60 transition-colors group-hover:text-signal/80">
                    {area.meta}
                  </p>
                </SpotlightCard>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
