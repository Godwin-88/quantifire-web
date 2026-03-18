import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'
import { ProductCard } from '@/components/marketplace/ProductCard'

export function ProductGrid() {
  return (
    <section className="py-20">
      <div className="section">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            The Quantifire Ecosystem
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">
            Six products across three tiers — from flagship platforms to audience builders.
          </p>
        </div>

        {/* Tier: Flagship */}
        <div className="mb-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-qf-red">
            ◆ Flagship Platforms
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {PRODUCTS.filter((p) => ['tradfi', 'web3'].includes(p.category)).map((product) => (
              <ProductCard key={product.slug} product={product} featured />
            ))}
          </div>
        </div>

        {/* Tier: Platform Products */}
        <div className="mb-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-qf-orange">
            ◆ Platform Products
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {PRODUCTS.filter((p) => ['tools', 'ai'].includes(p.category)).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>

        {/* Tier: Audience Builders */}
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-qf-pink">
            ◆ Audience Builders
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {PRODUCTS.filter((p) => ['education', 'media'].includes(p.category)).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/marketplace" className="btn-secondary">
            Browse All Products →
          </Link>
        </div>
      </div>
    </section>
  )
}
