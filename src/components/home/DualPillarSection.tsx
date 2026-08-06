'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import ScrollReveal from './ScrollReveal'

const ArchitectureLayers = dynamic(() => import('./ArchitectureLayers'), { ssr: false })
const YieldCurve = dynamic(() => import('./YieldCurve'), { ssr: false })

const FLAGSHIP = [
  { slug: 'hazardgraph', name: 'HazardGraph', tagline: 'Food security early warning system', href: 'https://hazardgraph-ui.vercel.app/' },
  { slug: 'graphalpha', name: 'GraphAlpha', tagline: 'Autonomous multi-agent trading' },
  { slug: 'lex-kenya', name: 'Lex Kenya', tagline: 'GraphRAG legal intelligence' },
]

const SERIES = [
  { name: 'Classical Quant Finance', episodes: 10, href: '/blog?series=classical-quant' },
  { name: 'DeFi Mechanics', episodes: 8, href: '/blog?series=defi-mechanics' },
]

export function DualPillarSection() {
  return (
    <section className="relative py-24 border-y border-slate-800/60 bg-[var(--background)]">
      <div className="section">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Agency pillar ── */}
          <ScrollReveal>
            <div className="flex flex-col h-full">
              <div className="relative h-60 lg:h-72 rounded-2xl border border-slate-800 bg-qf-navy/40 overflow-hidden">
                <div className="absolute inset-0 opacity-60">
                  <ArchitectureLayers style={{ position: 'absolute', inset: 0 }} />
                </div>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[11px] font-mono uppercase tracking-widest text-slate-500 bg-slate-900/60 px-3 py-1 rounded-full">
                  Data → Agent → Interface
                </div>
              </div>

              <div className="mt-8">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary/40 bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary">
                  The Agency
                </span>
                <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white font-heading">
                  We build production AI systems
                </h2>
                <p className="mt-3 text-slate-400 leading-relaxed">
                  Full-stack quant infrastructure for institutions — knowledge graphs, agent orchestration,
                  and auditable execution. From climate early-warning to multi-agent trading systems.
                </p>

                <ul className="mt-6 space-y-3">
                  {FLAGSHIP.map((p) => (
                    <li key={p.slug}>
                      {p.href ? (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between rounded-xl border border-slate-800 bg-qf-navy/40 px-4 py-3 transition-colors hover:border-slate-700"
                        >
                          <div>
                            <p className="text-sm font-semibold text-white group-hover:text-brand-primary transition-colors">
                              {p.name}
                            </p>
                            <p className="text-xs text-slate-500">{p.tagline}</p>
                          </div>
                          <span className="text-slate-500 group-hover:text-brand-primary transition-colors">→</span>
                        </a>
                      ) : (
                        <Link
                          href={`/portfolio/${p.slug}`}
                          className="group flex items-center justify-between rounded-xl border border-slate-800 bg-qf-navy/40 px-4 py-3 transition-colors hover:border-slate-700"
                        >
                          <div>
                            <p className="text-sm font-semibold text-white group-hover:text-brand-primary transition-colors">
                              {p.name}
                            </p>
                            <p className="text-xs text-slate-500">{p.tagline}</p>
                          </div>
                          <span className="text-slate-500 group-hover:text-brand-primary transition-colors">→</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                <Link href="/portfolio" className="btn-secondary mt-8 inline-flex">
                  View Engagements →
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Content pillar ── */}
          <ScrollReveal delay={0.15}>
            <div className="flex flex-col h-full">
              <div className="relative h-60 lg:h-72 rounded-2xl border border-slate-800 bg-qf-navy/40 overflow-hidden">
                <div className="absolute inset-0 opacity-70">
                  <YieldCurve style={{ position: 'absolute', inset: 0 }} />
                </div>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[11px] font-mono uppercase tracking-widest text-slate-500 bg-slate-900/60 px-3 py-1 rounded-full">
                  Flat line → Frontier → Vol Surf
                </div>
              </div>

              <div className="mt-8">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/40 bg-brand-accent/10 px-3 py-1 text-xs font-medium text-brand-accent">
                  The Research
                </span>
                <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white font-heading">
                  Learn quant finance by doing
                </h2>
                <p className="mt-3 text-slate-400 leading-relaxed">
                  Every article pairs rigorous mathematics with a runnable Python notebook.
                  Start from correlation, build the efficient frontier, and work your way to DeFi mechanics.
                </p>

                <ul className="mt-6 space-y-3">
                  {SERIES.map((s) => (
                    <li key={s.name}>
                      <Link
                        href={s.href}
                        className="group flex items-center justify-between rounded-xl border border-slate-800 bg-qf-navy/40 px-4 py-3 transition-colors hover:border-slate-700"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-brand-accent transition-colors">
                            {s.name}
                          </p>
                          <p className="text-xs text-slate-500">{s.episodes} episodes</p>
                        </div>
                        <span className="text-slate-500 group-hover:text-brand-accent transition-colors">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <p className="text-xs text-slate-500 mb-2">Latest episode</p>
                  <Link href="/blog/ep01-why-correlation-matters-more-than-returns" className="group inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-brand-accent transition-colors">
                    EP01 — Why Correlation Matters More Than Returns
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>

                <Link href="/blog" className="btn-secondary mt-8 inline-flex">
                  Start Reading →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}