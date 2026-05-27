import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'

const STATUS_BADGE = {
  live:             { label: 'Live',           cls: 'text-green-400 bg-green-400/10 border-green-400/30' },
  beta:             { label: 'Beta',           cls: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  'coming-soon':    { label: 'Coming Soon',    cls: 'text-slate-400 bg-slate-400/10 border-slate-400/30' },
  'in-development': { label: 'In Development', cls: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
}

export function ProductSections() {
  return (
    <div id="projects">
      {PRODUCTS.map((product, index) => {
        const isEven = index % 2 === 0
        const badge = STATUS_BADGE[product.status] ?? STATUS_BADGE['in-development']
        const isLive = product.status === 'live'

        return (
          <section
            key={product.slug}
            className="relative border-b border-slate-800/60 overflow-hidden"
          >
            {/* Subtle accent glow */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 70% 60% at ${isEven ? '80%' : '20%'} 50%, ${product.accentColor}, transparent)`,
              }}
            />

            <div className={`section relative z-10 py-20 flex flex-col gap-12 lg:flex-row lg:items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>

              {/* ── Left / Right: Text content ── */}
              <div className="flex-1 max-w-xl">
                {/* Status + icon row */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{product.icon}</span>
                  <span className={`badge border text-xs font-semibold ${badge.cls}`}>
                    {badge.label}
                  </span>
                </div>

                {/* Name */}
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  {product.name}
                </h2>
                <p className="mt-2 text-base font-medium" style={{ color: product.accentColor }}>
                  {product.tagline}
                </p>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  {product.description}
                </p>

                {/* Features (top 3) */}
                <ul className="mt-6 space-y-2">
                  {product.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="mt-0.5 shrink-0 font-bold" style={{ color: product.accentColor }}>✓</span>
                      {feature}
                    </li>
                  ))}
                  {product.features.length > 3 && (
                    <li className="text-xs text-slate-500 pl-5">
                      +{product.features.length - 3} more capabilities
                    </li>
                  )}
                </ul>

                {/* Tech stack chips */}
                {product.techStack && product.techStack.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {product.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-slate-700/60 bg-slate-800/50 px-2 py-0.5 text-[11px] font-mono text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTAs */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-slate-500 hover:bg-slate-800 hover:text-white transition-all"
                  >
                    View Details →
                  </Link>
                  {isLive && product.liveUrl ? (
                    <a
                      href={product.liveUrl}
                      target={product.liveUrl.startsWith('http') ? '_blank' : undefined}
                      rel={product.liveUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: product.accentColor }}
                    >
                      Live App ↗
                    </a>
                  ) : isLive ? (
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: product.accentColor }}
                    >
                      Explore
                    </Link>
                  ) : product.demoUrl ? (
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-all hover:opacity-90"
                      style={{
                        borderColor: `${product.accentColor}50`,
                        color: product.accentColor,
                        backgroundColor: `${product.accentColor}10`,
                      }}
                    >
                      Preview UI ↗
                    </a>
                  ) : null}
                </div>
              </div>

              {/* ── Right / Left: Visual panel ── */}
              <div className="flex-1 max-w-lg">
                <div
                  className="rounded-2xl border p-6 space-y-4"
                  style={{
                    borderColor: `${product.accentColor}30`,
                    background: `linear-gradient(135deg, ${product.accentColor}08 0%, transparent 60%)`,
                  }}
                >
                  {/* Market stats grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {product.marketStats.map((stat, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-slate-800 bg-qf-black/60 p-4 text-center"
                      >
                        <p className="text-xl font-extrabold" style={{ color: product.accentColor }}>
                          {stat.value}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500 leading-tight">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* All features list */}
                  <div className="rounded-xl border border-slate-800/60 bg-qf-black/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                      What&apos;s included
                    </p>
                    <ul className="space-y-1.5">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                          <span className="shrink-0 font-bold mt-0.5" style={{ color: product.accentColor }}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing hint — commented out during pre-launch
                  <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-qf-black/40 px-4 py-3">
                    <span className="text-xs text-slate-500">Starting from</span>
                    <span className="font-bold text-white">
                      {product.priceFrom === 0
                        ? 'Free'
                        : product.priceFrom
                        ? `$${product.priceFrom}${product.priceSuffix}`
                        : 'Custom pricing'}
                    </span>
                  </div>
                  */}

                  {/* Status footer */}
                  <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-qf-black/40 px-4 py-3">
                    <span className={`h-2 w-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : product.demoUrl ? 'bg-amber-400 animate-pulse' : 'bg-blue-400'}`} />
                    <span className="text-xs text-slate-300">
                      {isLive
                        ? 'Deployed and running in production'
                        : product.demoUrl
                        ? 'UI preview available — backend in active development'
                        : 'Actively in development — updated regularly'}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )
      })}
    </div>
  )
}
