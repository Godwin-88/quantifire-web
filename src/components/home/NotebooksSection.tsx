'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import SectionHeading from './SectionHeading'

const NOTEBOOKS = [
  {
    slug: 'ep01-correlation-matters',
    title: 'Correlation Matters',
    series: 'Classical Quant Finance',
    tagline: 'Why correlation matters more than returns in portfolio construction',
    icon: '🔗',
    price: 0,
    color: '#6366f1',
    gradient: 'from-indigo-500/15 to-indigo-500/5',
  },
  {
    slug: 'ep02-efficient-frontier',
    title: 'Efficient Frontier',
    series: 'Classical Quant Finance',
    tagline: 'Finding the optimal portfolio with Markowitz mean-variance optimisation',
    icon: '📈',
    price: 0,
    color: '#0ea5e9',
    gradient: 'from-sky-500/15 to-sky-500/5',
  },
  {
    slug: 'ep03-performance-metrics',
    title: 'Performance Metrics',
    series: 'Classical Quant Finance',
    tagline: 'Sharpe ratio, Sortino ratio, and beyond — measuring what matters',
    icon: '📊',
    price: 0,
    color: '#10b981',
    gradient: 'from-emerald-500/15 to-emerald-500/5',
  },
  {
    slug: 'ep04-value-at-risk',
    title: 'Value at Risk',
    series: 'Classical Quant Finance',
    tagline: 'How much can you lose on a bad day? VaR methods compared',
    icon: '🛡️',
    price: 0,
    color: '#f59e0b',
    gradient: 'from-amber-500/15 to-amber-500/5',
  },
  {
    slug: 'ep05-factor-models',
    title: 'Factor Models',
    series: 'Classical Quant Finance',
    tagline: 'Alpha or hidden beta? Decomposing returns with factor models',
    icon: '🧩',
    price: 29,
    color: '#ec4899',
    gradient: 'from-pink-500/15 to-pink-500/5',
  },
  {
    slug: 'ep11-uniswap-amm',
    title: 'Uniswap AMM',
    series: 'DeFi Mechanics',
    tagline: 'How Uniswap works — the x*y=k formula explained with code',
    icon: '🔄',
    price: 0,
    color: '#a855f7',
    gradient: 'from-purple-500/15 to-purple-500/5',
  },
]

export function NotebooksSection() {
  return (
    <section className="relative py-24">
      <div className="section">
        <ScrollReveal>
          <SectionHeading
            label="Research Notebooks"
            title="Interactive quant finance — code, charts, and mathematics"
            tagline="Every article comes with a runnable Jupyter notebook. Free to try, premium for the full suite."
            viewAllHref="/blog"
            viewAllLabel="Browse all notebooks"
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NOTEBOOKS.map((nb, i) => (
            <ScrollReveal key={nb.slug} delay={i * 0.06}>
              <Link href={`/blog/${nb.slug}`}>
                <motion.div
                  className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br ${nb.gradient} p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-lg`}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  {/* Price badge */}
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">{nb.icon}</div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        nb.price === 0
                          ? 'bg-green-500/15 text-green-400'
                          : 'bg-brand-primary/15 text-brand-primary'
                      }`}
                    >
                      {nb.price === 0 ? 'Free' : `$${nb.price}`}
                    </span>
                  </div>

                  {/* Series */}
                  <p className="mt-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {nb.series}
                  </p>

                  {/* Content */}
                  <h3 className="mt-1 text-lg font-bold text-white font-heading group-hover:text-brand-primary transition-colors">
                    {nb.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-400 line-clamp-2">{nb.tagline}</p>

                  {/* CTA */}
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-500 group-hover:text-brand-primary transition-colors">
                    {nb.price === 0 ? 'Read & run notebook' : 'Get premium notebook'}
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