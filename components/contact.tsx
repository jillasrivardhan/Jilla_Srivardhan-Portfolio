'use client'

import { Mail } from 'lucide-react'
import { profile } from '@/data/profile'
import { GithubIcon, LinkedinIcon } from './brand-icons'
import { MagneticLink, Reveal } from './primitives'

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden border-t border-white/[0.04] px-5 py-28 md:px-8 md:py-40"
    >
      <div className="bg-grid mask-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="animate-drift pointer-events-none absolute -bottom-40 left-1/4 size-[520px] rounded-full bg-signal/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="animate-drift pointer-events-none absolute -top-20 right-1/4 size-[420px] rounded-full bg-pulse/10 blur-[120px] [animation-delay:-9s]"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="mb-6 font-mono text-xs tracking-[0.2em] text-signal uppercase">09 — Contact</p>
          <h2 id="contact-title" className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-7xl">
            Have an idea worth <span className="text-gradient">building?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground text-pretty">
            {"Let's connect and build something useful with AI."}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <MagneticLink href={`mailto:${profile.email}`}>
              <Mail className="size-4" aria-hidden="true" />
              Email Me
            </MagneticLink>
            <MagneticLink href={profile.linkedin} external variant="ghost">
              <LinkedinIcon className="size-4" />
              LinkedIn
            </MagneticLink>
            {profile.github ? (
              <MagneticLink href={profile.github} external variant="ghost">
                <GithubIcon className="size-4" />
                GitHub
              </MagneticLink>
            ) : null}
          </div>
          <a
            href={`mailto:${profile.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block font-mono text-sm text-muted-foreground underline decoration-white/20 underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
          >
            {profile.email}
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  const links = [
    profile.github ? { href: profile.github, label: 'GitHub', external: true } : null,
    { href: profile.linkedin, label: 'LinkedIn', external: true },
    { href: `mailto:${profile.email}`, label: 'Email', external: true },
  ].filter((l): l is { href: string; label: string; external: boolean } => l !== null)

  return (
    <footer className="border-t border-white/[0.06] px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">{profile.name}</p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            AI/ML Engineer • Generative AI • RAG • AI Agents
          </p>
        </div>
        <nav aria-label="Social">
          <ul className="flex gap-6 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.external ? '_blank' : undefined}
                  rel={l.external ? 'noopener noreferrer' : undefined}
                  className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-signal after:transition-transform hover:text-foreground hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="font-mono text-xs text-muted-foreground">© 2026 Jilla Srivardhan</p>
      </div>
    </footer>
  )
}
