'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * EntropyFlame — scattered particles that coalesce into the QuantiFire
 * flame mark when scrolled into view, then slowly drift apart again.
 * "Signal from noise" — the quant brand metaphor.
 */

const FLAME_POINTS = 120

// Pre-generate the flame silhouette as (x, y) in unit space
function flameShape(): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i < FLAME_POINTS; i++) {
    // Teardrop-ish flame: narrow at bottom, wide at middle, tapered top
    const t = i / FLAME_POINTS
    const angle = t * Math.PI * 2
    const r = 0.55 + Math.sin(angle * 1.5) * 0.25 + (Math.random() - 0.5) * 0.12
    pts.push({
      x: 0.5 + Math.cos(angle) * r,
      y: 0.5 + Math.sin(angle) * r * 0.85,
    })
  }
  return pts
}

export default function EntropyFlame({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: false, margin: '-20% 0px -20% 0px' })
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    if (inView) setHasInteracted(true)
  }, [inView])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !hasInteracted) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const DPR = Math.min(2, window.devicePixelRatio || 1)
    let width = 0
    let height = 0

    const resize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * DPR
      canvas.height = height * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const target = flameShape()
    type P = { x: number; y: number; tx: number; ty: number; vx: number; vy: number; s: number }
    const parts: P[] = target.map((t) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      tx: t.x * width,
      ty: t.y * height,
      vx: 0,
      vy: 0,
      s: Math.random() * 2 + 1,
    }))

    let phase: 'coalesce' | 'drift' = 'coalesce'
    let phaseTimer: number | null = null

    const startDrift = () => {
      phase = 'drift'
      parts.forEach((p) => {
        p.tx = Math.random() * width * 1.4 - width * 0.2
        p.ty = Math.random() * height * 1.4 - height * 0.2
      })
      phaseTimer = window.setTimeout(() => {
        phase = 'coalesce'
        parts.forEach((p, i) => {
          p.tx = target[i].x * width
          p.ty = target[i].y * height
        })
        phaseTimer = window.setTimeout(startDrift, 2600)
      }, 2200)
    }

    // Start the coalesce→drift cycle
    phaseTimer = window.setTimeout(startDrift, 3000)

    let raf = 0
    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of parts) {
        const strength = phase === 'coalesce' ? 0.06 : 0.02
        p.vx += (p.tx - p.x) * strength
        p.vy += (p.ty - p.y) * strength
        p.vx *= 0.92
        p.vy *= 0.92
        p.x += p.vx
        p.y += p.vy

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(249, 115, 22, 0.9)'
        ctx.fill()
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      if (phaseTimer) clearTimeout(phaseTimer)
      window.removeEventListener('resize', resize)
    }
  }, [hasInteracted])

  return (
    <div ref={sectionRef} className={className}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}