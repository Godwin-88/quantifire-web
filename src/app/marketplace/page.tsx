import type { Metadata } from 'next'
import { PRODUCTS, CATEGORY_LABELS } from '@/lib/products'
import { ProductCard } from '@/components/marketplace/ProductCard'
import { FilterSidebar } from '@/components/marketplace/FilterSidebar'

export const metadata: Metadata = {
  title: 'Marketplace',
  description: 'Browse all Quantifaya products — TradFi platforms, DeFi tools, AI agents, education, and content.',
}

interface Props {
  searchParams: Promise<{ category?: string; pricing?: string }>
}

export default async function MarketplacePage({ searchParams }: Props) {
  const { category = 'all', pricing } = await searchParams

  // Pricing filter disabled during pre-launch
  const filtered = PRODUCTS.filter((p) => {
    if (category !== 'all' && p.category !== category) return false
    // Pricing filters commented out until launch
    // if (pricing === 'free' && p.priceFrom !== 0) return false
    // if (pricing === 'premium' && (p.priceFrom === 0 || p.priceFrom === null)) return false
    return true
  })

  return (
    <div className="section py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Product Marketplace</h1>
        <p className="mt-2 text-slate-400">
          {PRODUCTS.length} products across TradFi, Web3/DeFi, Tools, AI, Education, and Media.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full shrink-0 lg:w-56">
          <FilterSidebar activeCategory={category} activePricing={pricing} />
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <p className="text-slate-500 mt-10 text-center">No products match your filters.</p>
          ) : (
            <>
              <p className="text-sm text-slate-500 mb-5">
                Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
                {category !== 'all' ? ` in ${CATEGORY_LABELS[category]}` : ''}
              </p>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
