import Link from 'next/link'
import type { Product } from '@/types'

export function ProductHero({ product }: { product: Product }) {
  const statusColors = {
    live:          'bg-green-400/15 text-green-400 border-green-400/30',
    beta:          'bg-yellow-400/15 text-yellow-400 border-yellow-400/30',
    'coming-soon': 'bg-slate-400/15 text-slate-400 border-slate-400/30',
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

        {/* Coming soon banner */}
        {!isLive && (
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: product.accentColor }} />
            Launching soon — join the waitlist for early access
          </div>
        )}

        {/* Pricing preview — commented out during pre-launch
        {isLive && (
          <p className="mt-5 text-sm text-slate-400">
            Starting from{' '}
            <span className="font-bold text-white text-lg">
              {product.priceFrom === 0 ? 'Free' : product.priceFrom ? `$${product.priceFrom}${product.priceSuffix}` : 'Custom pricing'}
            </span>
          </p>
        )}
        */}

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {isLive ? (
            <>
              <Link href="/auth/signup" className="btn-primary text-base px-7 py-3">
                Get Started Free
              </Link>
              <Link href="/contact" className="btn-secondary text-base px-7 py-3">
                Contact Sales
              </Link>
            </>
          ) : (
            <>
              <Link
                href={`/products/${product.slug}?tab=interest`}
                className="btn-primary text-base px-7 py-3"
                style={{ backgroundColor: product.accentColor, borderColor: product.accentColor }}
              >
                Join the Waitlist
              </Link>
              <Link href="/blog" className="btn-secondary text-base px-7 py-3">
                Read Research ↓
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
