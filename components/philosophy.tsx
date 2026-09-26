'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

const lines = ['Learning by building.', 'Building by experimenting.', 'Improving by solving.']

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  )
}

export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = lines.flatMap((line, li) => line.split(' ').map((w) => ({ w, li })))

  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-title"
      className="relative overflow-hidden border-t border-white/[0.04] px-5 py-32 md:px-8 md:py-44"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pulse/10 blur-[120px]"
      />
      <div ref={ref} className="relative mx-auto max-w-5xl">
        <p className="mb-8 font-mono text-xs tracking-[0.2em] text-signal uppercase">Philosophy</p>
        <h2 id="philosophy-title" className="text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl md:text-7xl">
          {lines.map((line, li) => (
            <span key={line} className="block">
              {words
                .map((item, idx) => ({ ...item, idx }))
                .filter((item) => item.li === li)
                .map(({ w, idx }) => (
                  <Word
                    key={`${w}-${idx}`}
                    word={w}
                    progress={scrollYProgress}
                    range={[idx / words.length, (idx + 1) / words.length]}
                  />
                ))}
            </span>
          ))}
        </h2>
        <p className="mt-10 font-mono text-sm text-muted-foreground">
          Learning. Building. Experimenting. <span className="text-signal">Growing in AI.</span>
        </p>
      </div>
    </section>
  )
}
