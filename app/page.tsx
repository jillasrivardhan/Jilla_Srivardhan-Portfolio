import { About } from '@/components/about'
import { AILab } from '@/components/ai-lab'
import { Contact, Footer } from '@/components/contact'
import { CursorGlow } from '@/components/cursor-glow'
import { Education } from '@/components/education'
import { Experience } from '@/components/experience'
import { Hero } from '@/components/hero'
import { Journey } from '@/components/journey'
import { Navbar } from '@/components/navbar'
import { Philosophy } from '@/components/philosophy'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { WhatIBuild } from '@/components/what-i-build'

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <CursorGlow />
      <Navbar />
      <main id="main" className="relative z-10 overflow-x-clip">
        <Hero />
        <About />
        <WhatIBuild />
        <Skills />
        <Experience />
        <Projects />
        <AILab />
        <Journey />
        <Education />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
