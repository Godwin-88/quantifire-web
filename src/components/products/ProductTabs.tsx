'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { Product } from '@/types'

// ─── Tab definitions ──────────────────────────────────────────────────────────
const TABS = [
  { id: 'overview',  label: 'Overview' },
  { id: 'purpose',   label: 'Purpose' },
  { id: 'market',    label: 'Context' },
  { id: 'cta',       label: 'Collaborate' },
] as const

type TabId = typeof TABS[number]['id']

// ─── Overview tab ─────────────────────────────────────────────────────────────
function OverviewTab({ product }: { product: Product }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-5">Everything included</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {product.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ backgroundColor: `${product.accentColor}20`, color: product.accentColor }}
              >
                ✓
              </span>
              <span className="text-sm text-slate-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
        <p className="text-slate-400 leading-relaxed">{product.description}</p>
      </div>

      {(product.status === 'in-development' || product.status === 'coming-soon') && (
        <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-white text-sm">Actively in development</p>
            <p className="text-xs text-slate-400 mt-1">This project is being built — follow along or get in touch to collaborate.</p>
          </div>
          <a
            href="/contact"
            className="shrink-0 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: product.accentColor }}
          >
            Get in Touch →
          </a>
        </div>
      )}
    </div>
  )
}

// ─── Purpose tab ──────────────────────────────────────────────────────────────
function PurposeTab({ product }: { product: Product }) {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-bold text-white mb-3">Why {product.name} exists</h2>
        <p className="text-slate-400 leading-relaxed">{product.purpose}</p>
      </div>

      <div>
        <h3 className="text-base font-semibold text-white mb-4">Built for</h3>
        <ul className="space-y-3">
          {product.purposePoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ backgroundColor: `${product.accentColor}20`, color: product.accentColor }}
              >
                {i + 1}
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">{point}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── Context tab ─────────────────────────────────────────────────────────────
function MarketTab({ product }: { product: Product }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {product.marketStats.map((stat, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center"
          >
            <p className="text-2xl font-extrabold" style={{ color: product.accentColor }}>
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-slate-500 leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-bold text-white mb-3">Why this problem matters</h2>
        <p className="text-slate-400 leading-relaxed">{product.marketRelevance}</p>
      </div>
    </div>
  )
}


// ─── Collaborate tab ─────────────────────────────────────────────────────────
function CTATab({ product }: { product: Product }) {
  const isLive = product.status === 'live'
  const links = [
    product.liveUrl && { label: 'Live Demo', href: product.liveUrl, external: product.liveUrl.startsWith('http') },
    product.githubUrl && { label: 'GitHub', href: product.githubUrl, external: true },
  ].filter(Boolean) as { label: string; href: string; external: boolean }[]

  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl border p-10 text-center"
        style={{
          borderColor: `${product.accentColor}30`,
          background: `linear-gradient(135deg, ${product.accentColor}08 0%, transparent 70%)`,
        }}
      >
        <div
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
          style={{ backgroundColor: `${product.accentColor}15` }}
        >
          {product.icon}
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-400 mb-4">
          <span className={`h-1.5 w-1.5 rounded-full ${isLive ? 'animate-pulse bg-green-400' : 'bg-blue-400'}`} />
          {isLive ? 'Live in production' : 'Actively in development'}
        </div>
        <h2 className="text-2xl font-bold text-white">{product.name}</h2>
        <p className="mt-3 text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
          Interested in the architecture, want to collaborate, or have a use case in mind? I&apos;m open to technical conversations, research partnerships, and consulting engagements.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: product.accentColor }}
            >
              {l.label} {l.external ? '↗' : '→'}
            </a>
          ))}
          <Link href="/contact" className="btn-secondary">
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Tech stack */}
      {product.techStack && product.techStack.length > 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Technology stack</h3>
          <div className="flex flex-wrap gap-2">
            {product.techStack.map((tech) => (
              <span key={tech} className="rounded-md border border-slate-700/60 bg-slate-800/50 px-2.5 py-1 text-xs font-mono text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main tabbed component ────────────────────────────────────────────────────
export function ProductTabs({ product }: { product: Product }) {
  const searchParams = useSearchParams()
  const initialTab = (searchParams.get('tab') as TabId | null) ?? 'overview'
  const validTab = TABS.some((t) => t.id === initialTab) ? initialTab : 'overview'
  const [activeTab, setActiveTab] = useState<TabId>(validTab)

  // Sync if URL param changes (e.g. back/forward)
  useEffect(() => {
    if (TABS.some((t) => t.id === initialTab)) {
      setActiveTab(initialTab as TabId)
    }
  }, [initialTab])

  return (
    <div className="bg-qf-black min-h-[500px]">
      {/* Tab bar */}
      <div className="border-b border-slate-800 sticky top-16 z-20 bg-qf-black/95 backdrop-blur">
        <div className="section">
          <div className="flex overflow-x-auto scrollbar-none -mb-px gap-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  id={`tab-${tab.id}`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'border-b-2 text-white'
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
                  style={isActive ? { borderBottomColor: product.accentColor, color: '#fff' } : {}}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="section py-10">
        {activeTab === 'overview' && <OverviewTab product={product} />}
        {activeTab === 'purpose'  && <PurposeTab product={product} />}
        {activeTab === 'market'   && <MarketTab product={product} />}
        {activeTab === 'cta'      && <CTATab product={product} />}
      </div>
    </div>
  )
}
