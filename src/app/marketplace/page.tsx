import type { Metadata } from 'next'
import Link from 'next/link'
import { getProducts, CATEGORY_LABELS } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Research Notebooks',
  description:
    'Browse all QuantiFire research notebooks — free and premium Jupyter notebooks covering quantitative finance, DeFi mechanics, and statistical modelling.',
}

interface Props {
  searchParams: Promise<{ tier?: string }>
}

export default async function MarketplacePage({ searchParams }: Props) {
  const { tier = 'all' } = await searchParams

  const filtered = getProducts().filter((p) => {
    if (tier !== 'all' && p.tier !== tier) return false
    return true
  })

  return (
    <div className="section py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-heading">Research Notebooks</h1>
        <p className="mt-2 text-slate-400">
          {getProducts().length} notebooks across quantitative finance and DeFi mechanics.
          Free notebooks are email-gated; premium notebooks are a one-time purchase.
        </p>
      </div>

      {/* Tier filter */}
      <div className="flex gap-2 mb-8">
        {['all', 'free', 'premium'].map((t) => (
          <Link
            key={t}
            href={t === 'all' ? '/marketplace' : `/marketplace?tier=${t}`}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tier === t
                ? 'bg-brand-primary text-white'
                : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-slate-700'
            }`}
          >
            {t === 'all' ? 'All' : t === 'free' ? 'Free' : 'Premium'}
          </Link>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="text-slate-500 col-span-full text-center py-10">No notebooks match your filter.</p>
        ) : (
          filtered.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`}>
              <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-qf-navy/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{product.icon}</span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.priceFrom === 0
                        ? 'bg-green-500/15 text-green-400'
                        : 'bg-brand-primary/15 text-brand-primary'
                    }`}
                  >
                    {product.priceFrom === 0 ? 'Free' : `$${product.priceFrom}`}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white font-heading group-hover:text-brand-primary transition-colors">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-slate-400 line-clamp-2">{product.tagline}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-500 group-hover:text-brand-primary transition-colors">
                  View notebook <span className="text-sm">→</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}