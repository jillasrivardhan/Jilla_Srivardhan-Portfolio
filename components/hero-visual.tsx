'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const NeuralCore = dynamic(() => import('./neural-core'), { ssr: false, loading: () => <StaticCore /> })

type Mode = 'pending' | 'webgl' | 'static'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function StaticCore() {
  return (
    <div className="relative grid size-full place-items-center" aria-hidden="true">
      <div className="absolute size-[70%] rounded-full border border-signal/15" />
      <div className="absolute size-[52%] rounded-full border border-pulse/20" />
      <div className="absolute size-[34%] rounded-full border border-signal/25" />
      <div className="absolute size-[40%] rounded-full bg-signal/10 blur-3xl" />
      <div className="size-10 rounded-full bg-signal/80 shadow-[0_0_60px_20px_rgba(34,211,238,0.35)]" />
    </div>
  )
}

const fragments = [
  { text: 'retriever.invoke(query)', className: 'left-[2%] top-[18%]' },
  { text: 'agent.plan() → tools', className: 'right-[0%] top-[36%]' },
  { text: 'embeddings: dim=768', className: 'left-[8%] bottom-[16%]' },
]

export function HeroVisual() {
  const [mode, setMode] = useState<Mode>('pending')
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setCompact(window.matchMedia('(max-width: 768px)').matches)
    setMode(!reduce && supportsWebGL() ? 'webgl' : 'static')
  }, [])

  return (
    <div className="relative aspect-square w-full max-w-[560px]">
      <div className="absolute inset-[15%] rounded-full bg-signal/10 blur-[80px]" aria-hidden="true" />
      <div className="absolute inset-[25%] translate-x-[15%] rounded-full bg-pulse/10 blur-[80px]" aria-hidden="true" />
      <div className="absolute inset-0">
        {mode === 'webgl' ? <NeuralCore compact={compact} /> : <StaticCore />}
      </div>
      {fragments.map((f) => (
        <span
          key={f.text}
          aria-hidden="true"
          className={`pointer-events-none absolute hidden rounded-md border border-white/10 bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur md:block ${f.className}`}
        >
          <span className="text-signal">{'>'}</span> {f.text}
        </span>
      ))}
    </div>
  )
}
