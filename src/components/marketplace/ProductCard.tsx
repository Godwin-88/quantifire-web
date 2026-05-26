import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

const CATEGORY_BADGES: Record<string, { label: string; cls: string }> = {
  tradfi:      { label: 'Quant / TradFi', cls: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  web3:        { label: 'Web3',           cls: 'bg-green-500/15 text-green-400 border-green-500/30' },
  tools:       { label: 'Tools',          cls: 'bg-orange-500/15 text-orange-400 border-orange-500/30' },
  ai:          { label: 'AI',             cls: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
  education:   { label: 'Education',      cls: 'bg-pink-500/15 text-pink-400 border-pink-500/30' },
  media:       { label: 'Media',          cls: 'bg-pink-500/15 text-pink-400 border-pink-500/30' },
  healthtech:  { label: 'HealthTech',     cls: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30' },
  fintech:     { label: 'Fintech',        cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  automation:  { label: 'Automation',     cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
}

const STATUS_BADGES: Record<string, { label: string; cls: string }> = {
  live:             { label: 'Live',           cls: 'bg-green-500/15 text-green-400' },
  beta:             { label: 'Beta',           cls: 'bg-yellow-500/15 text-yellow-400' },
  'coming-soon':    { label: 'Coming Soon',    cls: 'bg-slate-500/15 text-slate-400' },
  'in-development': { label: 'In Development', cls: 'bg-blue-500/15 text-blue-400' },
}

interface Props {
  product: Product
  featured?: boolean
}

export function ProductCard({ product, featured = false }: Props) {
  const cat = CATEGORY_BADGES[product.category] ?? { label: product.category, cls: 'bg-slate-500/15 text-slate-400 border-slate-500/30' }
  const status = STATUS_BADGES[product.status] ?? STATUS_BADGES['in-development']

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        'card-hover group block p-6 rounded-xl',
        featured && 'ring-1 ring-slate-700'
      )}
      style={{ '--accent': product.accentColor } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Icon */}
        <span className="text-3xl">{product.icon}</span>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <span className={cn('badge border', cat.cls)}>{cat.label}</span>
          <span className={cn('badge', status.cls)}>{status.label}</span>
        </div>
      </div>

      {/* Name + tagline */}
      <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-[var(--accent)] transition-colors">
        {product.name}
      </h3>
      <p className="mt-1 text-sm text-slate-400 line-clamp-2">{product.tagline}</p>

      {/* Top 3 features */}
      <ul className="mt-4 space-y-1.5">
        {product.features.slice(0, 3).map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs text-slate-500">
            <span className="mt-0.5 shrink-0 text-[var(--accent)]">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Price — commented out during pre-launch
      <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
        <span className="text-sm text-slate-400">
          {product.priceFrom === 0
            ? 'Free'
            : product.priceFrom
            ? <>
                From{' '}
                <span className="font-semibold text-white">${product.priceFrom}</span>
                <span className="text-slate-500">{product.priceSuffix}</span>
              </>
            : 'Contact Sales'}
        </span>
        <span className="text-xs text-slate-500 group-hover:text-[var(--accent)] transition-colors">
          View Details →
        </span>
      </div>
      */}

      {/* Status footer */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
        <span className="text-xs text-slate-400">
          {product.status === 'live' ? 'Deployed · production' : 'Actively in development'}
        </span>
        <span className="text-xs text-slate-500 group-hover:text-[var(--accent)] transition-colors">
          View Details →
        </span>
      </div>
    </Link>
  )
}
