import Link from 'next/link'
import { CATEGORY_LABELS } from '@/lib/products'
import { cn } from '@/lib/utils'

interface Props {
  activeCategory: string
  activePricing?: string
}

export function FilterSidebar({ activeCategory, activePricing }: Props) {
  function buildHref(params: { category?: string; pricing?: string }) {
    const q = new URLSearchParams()
    if (params.category && params.category !== 'all') q.set('category', params.category)
    if (params.pricing) q.set('pricing', params.pricing)
    const s = q.toString()
    return `/marketplace${s ? `?${s}` : ''}`
  }

  return (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Category</p>
        <ul className="space-y-1">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <li key={key}>
              <Link
                href={buildHref({ category: key, pricing: activePricing })}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm transition-colors',
                  activeCategory === key
                    ? 'bg-qf-red/15 text-qf-red font-medium'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing — commented out during pre-launch
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Pricing</p>
        <ul className="space-y-1">
          {PRICING_OPTIONS.map((opt) => (
            <li key={opt.value}>
              <Link
                href={buildHref({ category: activeCategory, pricing: opt.value || undefined })}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm transition-colors',
                  (activePricing ?? '') === opt.value
                    ? 'bg-qf-blue/15 text-qf-blue font-medium'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                )}
              >
                {opt.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      */}
    </div>
  )
}
