import Link from 'next/link'
import type { Product } from '@/types'

export function ProductHero({ product }: { product: Product }) {
  const statusColors: Record<string, string> = {
    live:             'bg-green-400/15 text-green-400 border-green-400/30',
    beta:             'bg-yellow-400/15 text-yellow-400 border-yellow-400/30',
    'coming-soon':    'bg-slate-400/15 text-slate-400 border-slate-400/30',
    'in-development': 'bg-blue-400/15 text-blue-400 border-blue-400/30',
  }

  const isLive = product.status === 'live'

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-qf-black py-20">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div
        className="absolute inset-0 opacity-10"
        style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${product.accentColor}, transparent)` }}
      />

      <div className="section relative z-10 flex flex-col items-center text-center">
        {/* Icon + status */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-5xl">{product.icon}</span>
          <span className={`badge border ${statusColors[product.status]}`}>
            {product.status === 'coming-soon' ? 'Coming Soon' : product.status.charAt(0).toUpperCase() + product.status.slice(1)}
          </span>
        </div>

        {/* Name */}
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{product.name}</h1>
        <p className="mt-3 text-lg text-slate-400 max-w-2xl">{product.tagline}</p>
        <p className="mt-4 text-sm text-slate-500 max-w-xl">{product.description}</p>

        {/* Status banner */}
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm text-slate-300">
          <span className={`h-1.5 w-1.5 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-blue-400'}`} />
          {isLive ? 'Deployed and running in production' : 'Actively in development — updated regularly'}
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {product.liveUrl && (
            <a
              href={product.liveUrl}
              target={product.liveUrl.startsWith('http') ? '_blank' : undefined}
              rel={product.liveUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="btn-primary text-base px-7 py-3"
              style={{ backgroundColor: product.accentColor, borderColor: product.accentColor }}
            >
              {isLive ? 'Live Demo ↗' : 'Preview ↗'}
            </a>
          )}
          {product.githubUrl && (
            <a
              href={product.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base px-7 py-3"
            >
              GitHub ↗
            </a>
          )}
          {!product.liveUrl && !product.githubUrl && (
            <Link
              href={`/products/${product.slug}?tab=cta`}
              className="btn-primary text-base px-7 py-3"
              style={{ backgroundColor: product.accentColor, borderColor: product.accentColor }}
            >
              View Details
            </Link>
          )}
          <Link href="/contact" className="btn-secondary text-base px-7 py-3">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  )
}
