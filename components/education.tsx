import { GraduationCap } from 'lucide-react'
import { education } from '@/data/profile'
import { Reveal, Section, SectionHeading } from './primitives'

export function Education() {
  return (
    <Section id="education" className="border-t border-white/[0.04]">
      <SectionHeading index="08" eyebrow="Education" id="education-title" title="Academic foundation." />
      <Reveal>
        <div className="relative grid gap-8 rounded-2xl border border-white/[0.08] bg-card/60 p-6 md:grid-cols-[auto_1fr] md:items-center md:p-10">
          <span className="grid size-16 place-items-center rounded-2xl border border-signal/30 bg-signal/5 text-signal">
            <GraduationCap className="size-7" aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">{education.degree}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-balance md:text-3xl">{education.field}</h3>
            <p className="mt-2 text-lg text-muted-foreground">{education.institution}</p>
          </div>
          <div className="md:col-span-2">
            <div className="relative flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-0 h-px w-2/3 bg-gradient-to-r from-signal to-pulse/60"
              />
              {['Enrolled', 'Core CS', 'AI / ML focus', 'Graduation'].map((label, i) => (
                <span key={label} className="relative flex flex-col items-center gap-2 bg-card px-2">
                  <span
                    className={`size-2.5 rounded-full ${i < 3 ? 'bg-signal' : 'border border-white/30 bg-background'}`}
                  />
                  <span className="hidden sm:inline">{label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
