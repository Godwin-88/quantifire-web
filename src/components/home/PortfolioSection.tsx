'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ScrollReveal from './ScrollReveal'
import SectionHeading from './SectionHeading'

function TiltCard({ project, children }: { project: Project; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 150, damping: 20 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 900 }}
      className="h-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        {/* Specular highlight following the mouse */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [mx, my],
              ([x, y]: number[]) => `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.12), transparent 60%)`
            ),
          }}
        />
        {children}
      </motion.div>
    </div>
  )
}

type Project = {
  slug: string
  title: string
  tagline: string
  icon: string
  category: string
  color: string
  gradient: string
  href?: string
}

const PROJECTS = [
  {
    slug: 'clinicalmatch',
    title: 'ClinicalMatch AI',
    tagline: 'Precision clinical trial matching powered by FHIR R4 and GraphRAG',
    icon: '🧬',
    category: 'HealthTech',
    color: '#6366f1',
    gradient: 'from-indigo-500/15 to-indigo-500/5',
  },
  {
    slug: 'hazardgraph',
    title: 'HazardGraph',
    tagline: 'Food security early warning — predicting Horn of Africa crises 12 weeks ahead',
    icon: '🌾',
    category: 'Climate Intelligence',
    color: '#00C896',
    gradient: 'from-emerald-500/15 to-emerald-500/5',
    href: 'https://hazardgraph-ui.vercel.app/',
  },
  {
    slug: 'graphalpha',
    title: 'GraphAlpha',
    tagline: 'Autonomous multi-agent trading with knowledge graph signal generation',
    icon: '📈',
    category: 'Quant',
    color: '#3b82f6',
    gradient: 'from-blue-500/15 to-blue-500/5',
  },
]

export function PortfolioSection() {
  return (
    <section className="relative py-24">
      <div className="section">
        <ScrollReveal>
          <SectionHeading
            label="Selected Work"
            title="Flagship systems, shipped"
            tagline="Three of the production systems we've built — one line each."
            viewAllHref="/products"
            viewAllLabel="View all projects"
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.08}>
              {project.href ? (
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="h-full block">
                  <TiltCard project={project}>
                    <div className={`group relative overflow-hidden rounded-2xl h-full border border-slate-800 bg-gradient-to-br ${project.gradient} p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-lg`}>
                      {/* Category badge */}
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: `${project.color}20`,
                          color: project.color,
                        }}
                      >
                        {project.category}
                      </span>

                      {/* Icon */}
                      <div className="mt-4 text-3xl">{project.icon}</div>

                      {/* Content */}
                      <h3 className="mt-4 text-lg font-bold text-white font-heading group-hover:text-brand-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-400">{project.tagline}</p>

                      {/* Arrow */}
                      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-500 group-hover:text-brand-primary transition-colors">
                        View project
                        <span className="text-sm">→</span>
                      </div>
                    </div>
                  </TiltCard>
                </a>
              ) : (
                <Link href={`/products/${project.slug}`} className="h-full block">
                  <TiltCard project={project}>
                    <div className={`group relative overflow-hidden rounded-2xl h-full border border-slate-800 bg-gradient-to-br ${project.gradient} p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-lg`}>
                      {/* Category badge */}
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: `${project.color}20`,
                          color: project.color,
                        }}
                      >
                        {project.category}
                      </span>

                      {/* Icon */}
                      <div className="mt-4 text-3xl">{project.icon}</div>

                      {/* Content */}
                      <h3 className="mt-4 text-lg font-bold text-white font-heading group-hover:text-brand-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-400">{project.tagline}</p>

                      {/* Arrow */}
                      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-500 group-hover:text-brand-primary transition-colors">
                        View project
                        <span className="text-sm">→</span>
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}