import type { Product } from '@/types'

export function FeatureList({ product }: { product: Product }) {
  return (
    <section className="border-b border-slate-800 bg-qf-navy py-16">
      <div className="section">
        <h2 className="text-2xl font-bold text-white mb-10 text-center">Everything included</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {product.features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-4"
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ backgroundColor: `${product.accentColor}25`, color: product.accentColor }}
              >
                ✓
              </span>
              <span className="text-sm text-slate-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
