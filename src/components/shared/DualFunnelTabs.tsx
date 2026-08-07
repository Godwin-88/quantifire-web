'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { Product } from '@/types'

// ─── Tab definitions ──────────────────────────────────────────────────────────
const ALL_TABS = [
  { id: 'overview',  label: 'Overview' },
  { id: 'market',    label: 'Context' },
  { id: 'purpose',   label: 'Purpose' },
  { id: 'pricing',   label: 'Rate Card' },
  { id: 'cta',       label: 'Collaborate' },
] as const

type TabId = typeof ALL_TABS[number]['id']

interface DualFunnelTabsProps {
  data: Product
  funnel: 'services' | 'content'
}

// ─── Overview tab ─────────────────────────────────────────────────────────────
function OverviewTab({ data }: { data: Product }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-5">Everything included</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {data.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ backgroundColor: `${data.accentColor}20`, color: data.accentColor }}
              >
                ✓
              </span>
              <span className="text-sm text-slate-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
        <p className="text-slate-400 leading-relaxed">{data.description}</p>
      </div>

      {(data.status === 'in-development' || data.status === 'coming-soon') && (
        <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-white text-sm">Actively in development</p>
            <p className="text-xs text-slate-400 mt-1">This project is being built — follow along or get in touch to collaborate.</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: data.accentColor }}
          >
            Get in Touch →
          </Link>
        </div>
      )}
    </div>
  )
}

// ─── Context tab ──────────────────────────────────────────────────────────────
function MarketTab({ data }: { data: Product }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {data.marketStats.map((stat, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center"
          >
            <p className="text-2xl font-extrabold" style={{ color: data.accentColor }}>
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-slate-500 leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-bold text-white mb-3">Why this problem matters</h2>
        <p className="text-slate-400 leading-relaxed">{data.marketRelevance}</p>
      </div>
    </div>
  )
}

// ─── Purpose tab ──────────────────────────────────────────────────────────────
function PurposeTab({ data }: { data: Product }) {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-bold text-white mb-3">Why {data.name} exists</h2>
        <p className="text-slate-400 leading-relaxed">{data.purpose}</p>
      </div>

      <div>
        <h3 className="text-base font-semibold text-white mb-4">Built for</h3>
        <ul className="space-y-3">
          {data.purposePoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ backgroundColor: `${data.accentColor}20`, color: data.accentColor }}
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

// ─── Pricing tab ──────────────────────────────────────────────────────────────
function PricingTab({ data }: { data: Product }) {
  const tiers = data.pricingTiers
  if (!tiers || tiers.length === 0) return null

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white font-heading">Rate Card</h2>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto">Transparent pricing for every stage of your engagement. All packages include our core quality standards.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
        {tiers.map((tier, i) => (
          <div
            key={i}
            className={`relative rounded-2xl border p-6 ${
              tier.highlighted
                ? 'border-brand-primary/50 bg-brand-primary/5 shadow-lg shadow-brand-primary/10'
                : 'border-slate-800 bg-slate-900/40'
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-white">Most Popular</span>
              </div>
            )}
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-white font-heading">{tier.name}</h3>
              <div className="mt-3">
                <span className="text-4xl font-extrabold text-white">KSh {tier.price.toLocaleString()}</span>
                <span className="text-slate-500 text-sm ml-1">/ {tier.period}</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {tier.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary/15 text-brand-primary text-xs font-bold">✓</span>
                  <span className="text-sm text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
                <a
                  href="https://wa.me/254715849117"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center rounded-lg px-5 py-3 text-sm font-semibold transition-all ${
                    tier.highlighted
                      ? 'bg-brand-primary text-white hover:opacity-90'
                      : 'border border-slate-700 text-slate-300 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  {tier.cta}
                </a>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Collaborate tab ──────────────────────────────────────────────────────────
function CTATab({ data, funnel }: DualFunnelTabsProps) {
  const isLive = data.status === 'live'
  const links = [
    data.liveUrl && { label: 'Live Demo', href: data.liveUrl, external: data.liveUrl.startsWith('http') },
    data.demoUrl && { label: 'Preview', href: data.demoUrl, external: true },
    data.githubUrl && { label: 'GitHub', href: data.githubUrl, external: true },
  ].filter(Boolean) as { label: string; href: string; external: boolean }[]

  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl border p-10 text-center"
        style={{
          borderColor: `${data.accentColor}30`,
          background: `linear-gradient(135deg, ${data.accentColor}08 0%, transparent 70%)`,
        }}
      >
        <div
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
          style={{ backgroundColor: `${data.accentColor}15` }}
        >
          {data.icon}
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-400 mb-4">
          <span className={`h-1.5 w-1.5 rounded-full ${isLive ? 'animate-pulse bg-green-400' : 'bg-blue-400'}`} />
          {isLive ? 'Live in production' : 'Actively in development'}
        </div>
        <h2 className="text-2xl font-bold text-white">{data.name}</h2>
        <p className="mt-3 text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
          {funnel === 'services'
            ? 'Interested in the architecture, want to collaborate, or have a use case in mind? I\'m open to technical conversations, research partnerships, and consulting engagements.'
            : 'Get the full research notebook with complete code, datasets, and interactive visualisations. Free notebooks are email-gated; premium notebooks are a one-time purchase.'}
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: data.accentColor }}
            >
              {l.label} {l.external ? '↗' : '→'}
            </a>
          ))}

          {/* Funnel-specific CTA */}
          {funnel === 'services' ? (
            <a
              href="https://wa.me/254715849117"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a Discovery Call ↗
            </a>
          ) : (
            <Link
              href={data.priceFrom === 0 ? data.liveUrl || '#' : `/products/${data.slug}`}
              className="btn-primary"
            >
              {data.priceFrom === 0 ? 'Get Free Notebook →' : `Buy Now — $${data.priceFrom}`}
            </Link>
          )}

          <Link href="/contact" className="btn-secondary">
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Tech stack */}
      {data.techStack && data.techStack.length > 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            {funnel === 'services' ? 'Technology stack' : 'Tools & libraries'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.techStack.map((tech) => (
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
export function DualFunnelTabs({ data, funnel }: DualFunnelTabsProps) {
  const searchParams = useSearchParams()
  const initialTab = (searchParams.get('tab') as TabId | null) ?? 'overview'

  // Build dynamic tabs based on whether pricing is available
  const TABS = data.slug === 'web-development'
    ? ALL_TABS
    : ALL_TABS.filter(t => t.id !== 'pricing')

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
                  style={isActive ? { borderBottomColor: data.accentColor, color: '#fff' } : {}}
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
        {activeTab === 'overview' && <OverviewTab data={data} />}
        {activeTab === 'market'   && <MarketTab data={data} />}
        {activeTab === 'purpose'  && <PurposeTab data={data} />}
        {activeTab === 'pricing'  && <PricingTab data={data} />}
        {activeTab === 'cta'      && <CTATab data={data} funnel={funnel} />}
      </div>
    </div>
  )
}
