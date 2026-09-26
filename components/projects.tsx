'use client'

import { ArrowUpRight } from 'lucide-react'
import { GithubIcon as Github } from './brand-icons'
import { projects, type Project } from '@/data/profile'
import { cn } from '@/lib/utils'
import { Reveal, Section, SectionHeading } from './primitives'

const storySteps = [
  { key: 'problem', label: 'Problem' },
  { key: 'approach', label: 'Approach' },
  { key: 'result', label: 'Result' },
] as const

function PreviewPattern({ index }: { index: number }) {
  return (
    <div
      aria-hidden="true"
      className="relative h-40 overflow-hidden rounded-xl border border-white/[0.06] bg-background md:h-48"
    >
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div
        className="animate-drift absolute -top-1/2 -left-1/4 size-[120%] rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
        style={{
          background:
            index % 2 === 0
              ? 'radial-gradient(circle, rgba(34,211,238,0.35), transparent 60%)'
              : 'radial-gradient(circle, rgba(139,92,246,0.35), transparent 60%)',
        }}
      />
      <div className="absolute inset-0 flex items-end p-4 font-mono text-[11px] text-muted-foreground/70">
        <span>
          <span className="text-signal">{'>'}</span> preview.render(<span className="text-foreground/70">project_{index + 1}</span>)
          <span className="animate-blink ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-signal/70" />
        </span>
      </div>
    </div>
  )
}

function ProjectLink({ href, label, icon }: { href: string | null; label: string; icon: React.ReactNode }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-xs text-foreground transition-colors hover:border-signal hover:text-signal"
    >
      {icon}
      {label}
      <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </a>
  )
}

function ProjectCard({ project, index, featured }: { project: Project; index: number; featured?: boolean }) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col gap-6 rounded-2xl border border-white/[0.08] bg-card/60 p-5 transition-all duration-500 hover:scale-[1.01] hover:border-signal/30 hover:shadow-[0_0_80px_-20px_rgba(34,211,238,0.25)] md:p-7',
        featured && 'lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-10',
      )}
    >
      <PreviewPattern index={index} />

      <div className="flex flex-col gap-5">
        <div>
          <div className="mb-3 flex items-center gap-3 font-mono text-xs text-muted-foreground">
            <span>{String(index + 1).padStart(2, '0')}</span>
            {project.placeholder ? (
              <span className="rounded border border-dashed border-pulse/50 px-1.5 py-0.5 text-[10px] tracking-wider text-pulse uppercase">
                Placeholder
              </span>
            ) : null}
          </div>
          <h3 className="text-2xl font-semibold tracking-tight">{project.name}</h3>
          <p className="mt-1 text-muted-foreground">{project.tagline}</p>
        </div>

        <ol className="space-y-3 border-l border-white/[0.08] pl-4">
          {storySteps.map((step) => (
            <li key={step.key}>
              <p className="font-mono text-[10px] tracking-[0.2em] text-signal/80 uppercase">{step.label}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-foreground/80">{project[step.key]}</p>
            </li>
          ))}
        </ol>

        <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
          {project.stack.map((tech, i) => (
            <li
              key={`${tech}-${i}`}
              style={{ transitionDelay: `${i * 50}ms` }}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all duration-300 md:translate-y-1 md:opacity-70 md:group-hover:translate-y-0 md:group-hover:opacity-100"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2 pt-2 transition-opacity duration-300 md:opacity-60 md:group-focus-within:opacity-100 md:group-hover:opacity-100">
          <ProjectLink href={project.github} label="GitHub" icon={<Github className="size-3.5" aria-hidden="true" />} />
          <ProjectLink href={project.demo} label="Live Demo" icon={<ArrowUpRight className="size-3.5" aria-hidden="true" />} />
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const [first, ...rest] = projects
  return (
    <Section id="projects" className="border-t border-white/[0.04]">
      <SectionHeading
        index="05"
        eyebrow="Projects"
        id="projects-title"
        title="Things I've Built."
        description="Each project is told as a story: the problem, the approach, the stack, and what it actually does."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {first ? (
          <Reveal className="md:col-span-2">
            <ProjectCard project={first} index={0} featured />
          </Reveal>
        ) : null}
        {rest.map((p, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <ProjectCard project={p} index={i + 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
