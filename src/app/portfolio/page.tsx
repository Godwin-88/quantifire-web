import type { Metadata } from 'next'
import Link from 'next/link'
import { getPortfolio } from '@/lib/portfolio'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Shipped projects across healthtech, fintech, AI, automation, and quantitative finance — built with production-grade engineering.',
}

export default function PortfolioPage() {
  const projects = getPortfolio()

  return (
    <div className="section py-16">
      <div className="mb-12 max-w-2xl">
        <h1 className="text-3xl font-bold text-white font-heading">Portfolio</h1>
        <p className="mt-3 text-slate-400">
          Production systems I've designed and built — from clinical trial matching to cross-border payments
          to legal AI. Every project is a shipped product, not a case study concept.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.slug} href={`/portfolio/${project.slug}`}>
            <div
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-qf-navy/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">{project.icon}</span>
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: `${project.accentColor}20`,
                    color: project.accentColor,
                  }}
                >
                  {project.status === 'live' ? 'Live' : 'In Development'}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-white font-heading group-hover:text-brand-primary transition-colors">
                {project.name}
              </h3>
              <p className="mt-2 text-sm text-slate-400 line-clamp-2">{project.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.techStack?.slice(0, 4).map((tech) => (
                  <span key={tech} className="rounded-md border border-slate-700/60 bg-slate-800/50 px-2 py-0.5 text-xs font-mono text-slate-400">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-500 group-hover:text-brand-primary transition-colors">
                View case study <span className="text-sm">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}