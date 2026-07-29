'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import SectionHeading from './SectionHeading'

const PROJECTS = [
  {
    slug: 'clinicalmatch',
    title: 'ClinicalMatch AI',
    tagline: 'FHIR R4 + GraphRAG clinical trial matching agent',
    icon: '🧬',
    category: 'HealthTech',
    color: '#6366f1',
    gradient: 'from-indigo-500/15 to-indigo-500/5',
  },
  {
    slug: 'afripay',
    title: 'Afripay',
    tagline: 'Cross-border payments on the Stellar Network',
    icon: '💸',
    category: 'Fintech',
    color: '#22c55e',
    gradient: 'from-green-500/15 to-green-500/5',
  },
  {
    slug: 'amd-ea-optimizer',
    title: 'AMD EA Optimizer',
    tagline: 'Enterprise Architecture on AMD MI300X',
    icon: '⚡',
    category: 'AI',
    color: '#ef4444',
    gradient: 'from-red-500/15 to-red-500/5',
  },
  {
    slug: 'lex-kenya',
    title: 'Lex Kenya',
    tagline: 'GraphRAG legal intelligence over Kenyan law',
    icon: '⚖️',
    category: 'AI',
    color: '#0ea5e9',
    gradient: 'from-sky-500/15 to-sky-500/5',
  },
  {
    slug: 'agentic-erp',
    title: 'Agentic ERP',
    tagline: 'AI-native ERP with 27 MCP tools in Go',
    icon: '⚙️',
    category: 'Tools',
    color: '#ec4899',
    gradient: 'from-pink-500/15 to-pink-500/5',
  },
  {
    slug: 'graphalpha',
    title: 'GraphAlpha',
    tagline: 'Multi-agent trading with knowledge graph signals',
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
            label="Our Work"
            title="Production systems shipped for real-world problems"
            tagline="Every project is a shipped product — not a case study concept."
            viewAllHref="/marketplace"
            viewAllLabel="View all projects"
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.08}>
              <Link href={`/products/${project.slug}`}>
                <motion.div
                  className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br ${project.gradient} p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-lg`}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
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
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}