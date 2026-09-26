'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { experience } from '@/data/profile'
import { Reveal, Section, SectionHeading } from './primitives'

export function Experience() {
  return (
    <Section id="experience" className="border-t border-white/[0.04]">
      <SectionHeading index="04" eyebrow="Experience" id="experience-title" title="Where I'm learning by doing." />

      <div className="relative pl-8 md:pl-12">
        <motion.span
          aria-hidden="true"
          className="absolute top-2 bottom-0 left-[7px] w-px origin-top bg-gradient-to-b from-signal via-pulse/50 to-transparent md:left-[11px]"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <span
          aria-hidden="true"
          className="absolute top-2 left-0 size-[15px] rounded-full border-2 border-signal bg-background shadow-[0_0_20px_rgba(34,211,238,0.6)] md:size-[23px]"
        />

        <Reveal>
          <article className="rounded-2xl border border-white/[0.08] bg-card/60 p-6 md:p-10">
            <header className="flex flex-col gap-4 border-b border-white/[0.06] pb-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-signal/10 px-2.5 py-1 font-mono text-[11px] text-signal">
                  <span className="size-1.5 rounded-full bg-signal" /> Current
                </p>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{experience.role}</h3>
                <p className="mt-1 text-lg text-foreground/80">{experience.company}</p>
              </div>
              <div className="font-mono text-sm text-muted-foreground md:text-right">
                <p>{experience.period}</p>
                <p className="mt-1 inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {experience.location}
                </p>
              </div>
            </header>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {experience.summary}
            </p>

            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {experience.highlights.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  className="flex gap-3 text-sm leading-relaxed text-foreground/85"
                >
                  <span className="mt-1 font-mono text-[11px] text-signal/70">{String(i + 1).padStart(2, '0')}</span>
                  {h}
                </motion.li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </Section>
  )
}
