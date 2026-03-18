import Link from 'next/link'
import type { Product } from '@/types'

export function PricingTable({ product }: { product: Product }) {
  if (!product.pricingTiers || product.pricingTiers.length === 0) return null

  // Pricing table commented out during pre-launch phase
  // Restore when products are ready for public launch
  return (
    <section className="py-16 bg-qf-black">
      <div className="section">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white">Pricing</h2>
          <p className="mt-2 text-slate-400">Launch pricing announced to waitlist first</p>
        </div>

        {/* Pre-launch waitlist CTA */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-400 mb-4">
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: product.accentColor }} />
              Coming Soon
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Be first to know</h3>
            <p className="text-slate-400 mb-6">
              Join the waitlist to get early access and launch pricing before public release.
            </p>
            <Link
              href={`/products/${product.slug}?tab=interest`}
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: product.accentColor }}
            >
              Join Waitlist →
            </Link>
          </div>
        </div>

        {/* Original pricing table — commented out
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {product.pricingTiers.map((tier) => {
            const isHighlighted = !!tier.highlighted
            return (
              <div
                key={tier.name}
                className={`relative rounded-xl border p-6 flex flex-col ${
                  isHighlighted
                    ? 'border-qf-red bg-qf-red/5 shadow-lg shadow-qf-red/10'
                    : 'border-slate-800 bg-slate-900/50'
                }`}
              >
                {isHighlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-qf-red px-3 py-0.5 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}

                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                </div>

                <div className="mb-6">
                  {tier.price === 0 ? (
                    <span className="text-3xl font-extrabold text-white">Free</span>
                  ) : tier.price === null ? (
                    <span className="text-3xl font-extrabold text-white">Custom</span>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-extrabold text-white">${tier.price}</span>
                      <span className="mb-1 text-sm text-slate-400">/{tier.period}</span>
                    </div>
                  )}
                </div>

                <ul className="flex-1 space-y-2 mb-6">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span
                        className="mt-0.5 shrink-0 text-xs font-bold"
                        style={{ color: product.accentColor }}
                      >
                        ✓
                      </span>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.price === null ? '/contact' : '/auth/signup'}
                  className={`w-full text-center py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${
                    isHighlighted
                      ? 'bg-qf-red hover:bg-qf-red/90 text-white'
                      : 'border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white'
                  }`}
                >
                  {tier.price === null ? 'Contact Sales' : tier.price === 0 ? 'Get Started Free' : 'Start Free Trial'}
                </Link>
              </div>
            )
          })}
        </div>
        */}
      </div>
    </section>
  )
}
