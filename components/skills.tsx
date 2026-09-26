'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { skillGraphNodes, skillGroups } from '@/data/profile'
import { cn } from '@/lib/utils'
import { Reveal, Section, SectionHeading } from './primitives'

const graphToGroup: Record<string, string[]> = {
  Python: ['Python'],
  ML: ['Machine Learning'],
  GenAI: ['Generative AI', 'LLMs', 'Prompt Engineering', 'Natural Language Processing'],
  RAG: ['RAG'],
  Agents: ['AI Agents'],
  LangChain: ['LangChain'],
}

function SkillGraph({ hovered, onHover }: { hovered: string | null; onHover: (n: string | null) => void }) {
  const size = 420
  const c = size / 2
  const radius = 150
  const nodes = skillGraphNodes.map((label, i) => {
    const angle = (i / skillGraphNodes.length) * Math.PI * 2 - Math.PI / 2
    return { label, x: c + Math.cos(angle) * radius, y: c + Math.sin(angle) * radius }
  })

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <linearGradient id="edge" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={size} y2={size}>
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <circle cx={c} cy={c} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 6" />
        <circle cx={c} cy={c} r={radius * 0.55} fill="none" stroke="rgba(255,255,255,0.04)" />
        {nodes.map((n, i) => (
          <motion.line
            key={n.label}
            x1={c}
            y1={c}
            x2={n.x}
            y2={n.y}
            stroke="url(#edge)"
            strokeWidth={hovered === n.label ? 1.6 : 1}
            strokeOpacity={hovered && hovered !== n.label ? 0.15 : 0.55}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 * i }}
          />
        ))}
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % nodes.length]
          return (
            <line key={`${n.label}-ring`} x1={n.x} y1={n.y} x2={next.x} y2={next.y} stroke="rgba(255,255,255,0.05)" />
          )
        })}
      </svg>

      <div className="absolute top-1/2 left-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-signal/40 bg-background text-center shadow-[0_0_60px_rgba(34,211,238,0.15)]">
        <span className="font-mono text-[10px] leading-tight tracking-[0.2em] text-signal">
          AI
          <br />
          ENGINEERING
        </span>
      </div>

      {nodes.map((n, i) => (
        <motion.button
          key={n.label}
          type="button"
          onPointerEnter={() => onHover(n.label)}
          onPointerLeave={() => onHover(null)}
          onFocus={() => onHover(n.label)}
          onBlur={() => onHover(null)}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + 0.08 * i }}
          style={{ left: `${(n.x / size) * 100}%`, top: `${(n.y / size) * 100}%` }}
          className={cn(
            'absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3.5 py-2 font-mono text-xs whitespace-nowrap backdrop-blur transition-colors',
            hovered === n.label
              ? 'border-signal bg-signal/15 text-foreground'
              : 'border-white/12 bg-background/80 text-muted-foreground hover:text-foreground',
          )}
        >
          {n.label}
        </motion.button>
      ))}
    </div>
  )
}

export function Skills() {
  const [hovered, setHovered] = useState<string | null>(null)
  const highlighted = hovered ? graphToGroup[hovered] : []

  return (
    <Section id="skills" className="border-t border-white/[0.04]">
      <SectionHeading
        index="03"
        eyebrow="Skills"
        id="skills-title"
        title="The toolkit I'm building with."
        description="Grouped by how I use them. Hover a node to trace where it fits."
      />

      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <SkillGraph hovered={hovered} onHover={setHovered} />
        </Reveal>

        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {skillGroups.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.06}>
              <div className="grid gap-3 py-5 sm:grid-cols-[180px_1fr] sm:items-center">
                <h3 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">{g.group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        'rounded-full border px-3 py-1.5 text-sm transition-colors duration-200',
                        highlighted.includes(item)
                          ? 'border-signal/60 bg-signal/10 text-foreground'
                          : 'border-white/10 bg-white/[0.02] text-foreground/85',
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
