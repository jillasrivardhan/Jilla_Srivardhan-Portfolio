'use client'

import { motion } from 'framer-motion'
import { capabilityStack } from '@/data/profile'
import { Reveal, Section, SectionHeading } from './primitives'

export function About() {
  return (
    <Section id="about">
      <SectionHeading index="01" eyebrow="About" id="about-title" title="More Than Just Code." />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <Reveal>
            <p className="text-2xl leading-snug text-foreground text-pretty">
              I&apos;m a B.Tech Computer Science student who got hooked on one question: how do you make software that
              actually <span className="text-signal">thinks</span>?
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-pretty">
              I learn by building. Rather than stopping at theory, I turn concepts into small, working projects —
              exploring Generative AI, building Retrieval-Augmented Generation applications that ground LLMs in real
              documents, and experimenting with AI Agents that can reason and use tools.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-pretty">
              Along the way I work with LangChain and keep sharpening my Python and machine learning foundations —
              because intelligent systems are only as good as the fundamentals underneath them.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <dl className="grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-6 font-mono text-sm">
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground/70">Studying</dt>
                <dd className="mt-1 text-foreground">B.Tech CSE</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground/70">Currently</dt>
                <dd className="mt-1 text-foreground">GenAI Trainee</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative rounded-2xl border border-white/[0.08] bg-card/60 p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span>ai_journey.map</span>
              <span className="text-signal">● live</span>
            </div>
            <ol className="relative">
              {capabilityStack.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-5 pb-6 last:pb-0"
                >
                  <div className="relative flex flex-col items-center">
                    <span className="relative z-10 grid size-9 place-items-center rounded-full border border-signal/40 bg-background font-mono text-xs text-signal">
                      {i + 1}
                    </span>
                    {i < capabilityStack.length - 1 ? (
                      <motion.span
                        aria-hidden="true"
                        className="absolute top-9 h-[calc(100%-2.25rem)] w-px origin-top bg-gradient-to-b from-signal/60 to-pulse/40"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 * i + 0.25 }}
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-colors hover:border-signal/30">
                    <span className="font-medium">{item.label}</span>
                    <span className="font-mono text-xs text-muted-foreground">{item.note}</span>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
