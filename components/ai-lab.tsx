'use client'

import { useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { labExperiments } from '@/data/profile'
import { Reveal, Section, SectionHeading } from './primitives'

function useTyping(lines: string[], active: boolean, startDelay: number) {
  const reduce = useReducedMotion()
  const total = lines.join('\n').length
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    if (reduce) {
      setCount(total)
      return
    }
    let interval: ReturnType<typeof setInterval> | undefined
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= total) {
            clearInterval(interval)
            return c
          }
          return c + 1
        })
      }, 28)
    }, startDelay)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [active, reduce, total, startDelay])

  return { typed: lines.join('\n').slice(0, count), done: count >= total }
}

function Terminal({ file, title, lines, index }: (typeof labExperiments)[number] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { typed, done } = useTyping(lines, inView, index * 250)

  return (
    <div
      ref={ref}
      className="group h-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0b0f] transition-colors hover:border-signal/30"
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/15" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-white/15" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-white/15" aria-hidden="true" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">{file}</span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-relaxed">
        <h3 className="mb-3 text-xs tracking-widest text-muted-foreground/70 uppercase">{title}</h3>
        <pre className="min-h-[6.5rem] whitespace-pre-wrap text-foreground/85" aria-label={lines.join(', ')}>
          <span aria-hidden="true">
            {typed}
            {!done ? <span className="animate-blink ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 bg-signal" /> : null}
          </span>
        </pre>
        <p className="mt-4 flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">STATUS:</span>
          {done ? (
            <span className="text-signal">COMPLETE</span>
          ) : (
            <span className="text-pulse">RUNNING</span>
          )}
        </p>
      </div>
    </div>
  )
}

export function AILab() {
  return (
    <Section id="lab" className="border-t border-white/[0.04]">
      <div className="bg-grid mask-fade pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative">
        <SectionHeading
          index="06"
          eyebrow="AI_LAB.exe"
          id="lab-title"
          title="AI Lab"
          description="My experimental workspace — the areas I tinker with, break, and rebuild to understand how they really work."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {labExperiments.map((exp, i) => (
            <li key={exp.file}>
              <Reveal delay={i * 0.05} className="h-full">
                <Terminal {...exp} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
