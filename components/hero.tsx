'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { profile } from '@/data/profile'
import { HeroVisual } from './hero-visual'
import { MagneticLink } from './primitives'

const ease = [0.22, 1, 0.36, 1] as const

const headline = ['Building', 'Intelligent', 'Systems', 'with AI.']

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative flex min-h-svh items-center overflow-hidden px-5 pt-24 pb-16 md:px-8"
    >
      <div className="bg-grid mask-fade pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pr-4 pl-3 text-xs text-muted-foreground backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            {profile.role}
          </motion.p>

          <h1 id="home-title" className="text-5xl leading-[1.02] font-semibold tracking-tighter sm:text-6xl lg:text-7xl">
            <span className="sr-only">Jilla Srivardhan — </span>
            {headline.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className={`inline-block ${i === headline.length - 1 ? 'text-gradient' : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease }}
                >
                  {word}
                  {i < headline.length - 1 ? '\u00A0' : ''}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            I&apos;m <span className="text-foreground">Jilla Srivardhan</span>, an aspiring AI/ML Engineer focused on
            Generative AI, RAG, AI Agents, and practical machine learning applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticLink href="#projects">Explore My Work</MagneticLink>
            <MagneticLink href="#contact" variant="ghost">
              {"Let's Connect"}
            </MagneticLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-muted-foreground"
          >
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-foreground/80 hover:text-signal"
            >
              View LinkedIn
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden="true" />
              {profile.location}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
          className="flex justify-center lg:justify-end"
        >
          <HeroVisual />
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase md:flex"
      >
        Scroll
        <span className="h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="block h-4 w-px bg-signal"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </a>
    </section>
  )
}
