'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { Product } from '@/types'

// ─── Tab definitions ──────────────────────────────────────────────────────────
const TABS = [
  { id: 'overview',  label: 'Overview' },
  { id: 'purpose',   label: 'Product Purpose' },
  { id: 'market',    label: 'Market Relevance' },
  { id: 'interest',  label: 'Register Interest' },
  { id: 'cta',       label: 'Get Started' },
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

// ─── Market relevance tab ─────────────────────────────────────────────────────
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
        <h2 className="text-lg font-bold text-white mb-3">Market opportunity</h2>
        <p className="text-slate-400 leading-relaxed">{product.marketRelevance}</p>
      </div>
    </div>
  )
}

// ─── Interest form tab ────────────────────────────────────────────────────────
const OCCUPATIONS = [
  'Student', 'Software Engineer', 'Quant Analyst / Researcher', 'Trader',
  'Portfolio Manager', 'Financial Advisor', 'Lawyer / Legal Professional',
  'Data Scientist', 'Entrepreneur / Founder', 'Content Creator', 'Other',
]

const AGE_RANGES = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55+']
const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say']

function InterestForm({ product }: { product: Product }) {
  const [form, setForm] = useState({
    name: '', email: '', whatsapp: '', occupation: '', age: '', gender: '', productPurpose: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/product-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, productSlug: product.slug }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-10 text-center">
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
          style={{ backgroundColor: `${product.accentColor}20`, color: product.accentColor }}
        >
          ✓
        </div>
        <h3 className="text-xl font-bold text-white">Interest registered!</h3>
        <p className="mt-2 text-slate-400 max-w-sm mx-auto">
          Thank you for your interest in {product.name}. We&apos;ll be in touch.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-400 mb-3">
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: product.accentColor }} />
          {product.status === 'live' ? 'Get access' : 'Waitlist open'}
        </div>
        <h2 className="text-xl font-bold text-white">
          {product.status === 'live' ? 'Register your interest' : `Join the ${product.name} waitlist`}
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          {product.status === 'live'
            ? `Help us understand who is building with ${product.name} — this data shapes our roadmap and early access priorities.`
            : `Be first in line when ${product.name} launches. Your input directly shapes what we build.`}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1: name + email */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Full name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              required
              className="input w-full"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email address *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              required
              className="input w-full"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Row 2: whatsapp + occupation */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              WhatsApp number
              <span className="ml-1 text-slate-500 font-normal">(incl. country code)</span>
            </label>
            <input
              type="tel"
              value={form.whatsapp}
              onChange={(e) => update('whatsapp', e.target.value)}
              className="input w-full"
              placeholder="+254 700 000 000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Occupation *</label>
            <select
              value={form.occupation}
              onChange={(e) => update('occupation', e.target.value)}
              required
              className="input w-full"
            >
              <option value="">Select your occupation</option>
              {OCCUPATIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: age + gender */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Age range *</label>
            <select
              value={form.age}
              onChange={(e) => update('age', e.target.value)}
              required
              className="input w-full"
            >
              <option value="">Select age range</option>
              {AGE_RANGES.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => update('gender', e.target.value)}
              className="input w-full"
            >
              <option value="">Prefer not to say</option>
              {GENDERS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Product purpose */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            How do you plan to use {product.name}? *
          </label>
          <textarea
            value={form.productPurpose}
            onChange={(e) => update('productPurpose', e.target.value)}
            required
            rows={4}
            className="input w-full resize-none"
            placeholder={`Describe your use case for ${product.name}…`}
          />
        </div>

        {status === 'error' && (
          <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full"
          style={{ backgroundColor: product.accentColor, borderColor: product.accentColor }}
        >
          {status === 'loading'
            ? 'Submitting…'
            : product.status === 'live'
            ? `Register Interest in ${product.name}`
            : `Join the ${product.name} Waitlist`}
        </button>

        <p className="text-center text-xs text-slate-500">
          Your data is used only for product development and early access planning. We do not sell or share it.
        </p>
      </form>
    </div>
  )
}

// ─── CTA / Pricing tab ────────────────────────────────────────────────────────
function CTATab({ product, onSwitchToInterest }: { product: Product; onSwitchToInterest: () => void }) {
  const isLive = product.status === 'live'

  if (!isLive) {
    return (
      <div className="space-y-8">
        {/* Coming soon hero */}
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
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: product.accentColor }} />
            Coming Soon
          </div>
          <h2 className="text-2xl font-bold text-white">{product.name} is launching soon</h2>
          <p className="mt-3 text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
            Pricing and plans will be confirmed at launch. Register your interest now to lock in early-adopter pricing and get priority access.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <button
              onClick={onSwitchToInterest}
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: product.accentColor }}
            >
              Join the Waitlist →
            </button>
            <Link href="/contact" className="btn-secondary">
              Talk to Us
            </Link>
          </div>
        </div>

        {/* Pricing tiers — commented out during pre-launch
        <div>
          <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            Planned pricing
            <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs text-slate-400 font-normal">
              Subject to change
            </span>
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.pricingTiers.map((tier) => {
              const isHighlighted = !!tier.highlighted
              return (
                <div
                  key={tier.name}
                  className={`relative rounded-xl border p-6 flex flex-col opacity-70 ${
                    isHighlighted ? 'border-2' : 'border-slate-800 bg-slate-900/50'
                  }`}
                  style={isHighlighted ? {
                    borderColor: product.accentColor,
                    backgroundColor: `${product.accentColor}08`,
                  } : {}}
                >
                  {isHighlighted && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-semibold text-white"
                      style={{ backgroundColor: product.accentColor }}
                    >
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-white mb-3">{tier.name}</h3>
                  <div className="mb-4">
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
                  <ul className="flex-1 space-y-2 mb-5">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 shrink-0 font-bold" style={{ color: product.accentColor }}>✓</span>
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={onSwitchToInterest}
                    className="w-full text-center py-2.5 px-4 rounded-lg text-sm font-semibold border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-colors"
                  >
                    Join Waitlist
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        */}

        {/* Trust signals */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            {['Early-adopter pricing', 'Cancel anytime', 'GDPR & POPIA compliant', 'Bank-grade encryption'].map((t) => (
              <span key={t} className="flex items-center gap-1">
                <span style={{ color: product.accentColor }}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Live product — normal pricing (commented out during pre-launch)
  return (
    <div className="space-y-10">
      {/* Pricing grid — commented out
      <div>
        <h2 className="text-xl font-bold text-white mb-6 text-center">Choose your plan</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {product.pricingTiers.map((tier) => {
            const isHighlighted = !!tier.highlighted
            return (
              <div
                key={tier.name}
                className={`relative rounded-xl border p-6 flex flex-col ${
                  isHighlighted ? 'border-2 shadow-lg' : 'border-slate-800 bg-slate-900/50'
                }`}
                style={isHighlighted ? {
                  borderColor: product.accentColor,
                  backgroundColor: `${product.accentColor}08`,
                  boxShadow: `0 8px 32px ${product.accentColor}20`,
                } : {}}
              >
                {isHighlighted && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-semibold text-white"
                    style={{ backgroundColor: product.accentColor }}
                  >
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-white mb-4">{tier.name}</h3>
                <div className="mb-5">
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
                      <span className="mt-0.5 shrink-0 font-bold" style={{ color: product.accentColor }}>✓</span>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.price === null ? '/contact' : '/auth/signup'}
                  className={`w-full text-center py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${
                    isHighlighted
                      ? 'text-white'
                      : 'border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white'
                  }`}
                  style={isHighlighted ? { backgroundColor: product.accentColor } : {}}
                >
                  {tier.cta}
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-center">
        <p className="text-sm text-slate-400 mb-4">All plans include a 14-day free trial. No credit card required.</p>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
          {['Cancel anytime', 'Bank-grade encryption', 'GDPR & POPIA compliant', 'SOC 2 ready'].map((t) => (
            <span key={t} className="flex items-center gap-1">
              <span style={{ color: product.accentColor }}>✓</span> {t}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link href="/auth/signup" className="btn-primary">Start Free Trial</Link>
          <Link href="/contact" className="btn-secondary">Talk to Sales</Link>
        </div>
      </div>
      */}

      {/* Project CTA */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-400 mb-4">
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: product.accentColor }} />
          {product.status === 'live' ? 'Live in production' : 'In development'}
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Interested in {product.name}?</h2>
        <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed mb-6">
          Whether you want to collaborate, ask technical questions, or discuss a use case — get in touch.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: product.accentColor }}
        >
          Get in Touch →
        </a>
      </div>
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
        {activeTab === 'overview'  && <OverviewTab product={product} />}
        {activeTab === 'purpose'   && <PurposeTab product={product} />}
        {activeTab === 'market'    && <MarketTab product={product} />}
        {activeTab === 'interest'  && <InterestForm product={product} />}
        {activeTab === 'cta'       && <CTATab product={product} onSwitchToInterest={() => setActiveTab('interest')} />}
      </div>
    </div>
  )
}
