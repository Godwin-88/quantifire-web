import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Quantifaya — building the quant finance stack for Web2 and Web3 builders.',
}

const TIMELINE = [
  { year: '2024', event: 'Quantifaya founded. Research begins on TradFi + DeFi quant tooling.' },
  { year: '2025 Q1', event: 'Content engine launched. 36-episode mathematically animated series kicks off.' },
  { year: '2025 Q2', event: 'Agentic orchestration MVP. 9-channel syndication pipeline live.' },
  { year: '2025 Q3', event: 'Quantifaya (TradFi) enters private beta.' },
  { year: '2025 Q4', event: 'Yield Agent (DeFi) enters private beta.' },
  { year: '2026', event: 'Public launch across all products.' },
]

export default function AboutPage() {
  return (
    <div className="section py-16 max-w-3xl mx-auto">
      {/* Hero */}
      <div className="mb-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-qf-red mb-3">About Quantifaya</p>
        <h1 className="text-4xl font-extrabold text-white">
          Quant Finance for<br />
          <span className="gradient-text">Web2 &amp; Web3 Builders</span>
        </h1>
        <p className="mt-5 text-lg text-slate-400 leading-relaxed">
          Quantifaya exists to bridge the gap between academic quantitative finance and real-world
          implementation — across traditional markets and decentralised protocols. We build tools,
          educate, and publish research so every builder can trade, invest, and build with rigour.
        </p>
      </div>

      {/* Mission */}
      <div className="mb-14 rounded-xl border border-slate-800 bg-slate-900/50 p-8">
        <h2 className="text-xl font-bold text-white mb-3">Mission</h2>
        <p className="text-slate-400 leading-relaxed">
          To democratise quantitative finance by making institutional-grade tools, research, and
          education accessible to individual traders, DeFi protocol teams, and fintech builders —
          at every level of the stack.
        </p>
      </div>

      {/* What we build */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-white mb-6">What we build</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: '📊', title: 'TradFi Platforms', desc: 'Quantifaya — risk, factor models, execution for traditional markets.' },
            { icon: '⚡', title: 'DeFi Tools', desc: 'Yield Agent — AMM analytics, yield optimisation, MEV research.' },
            { icon: '🤖', title: 'AI Agents', desc: 'Agentic orchestration + Legal Research Agent for compliance workflows.' },
            { icon: '📚', title: 'Education', desc: 'Quantifaya Academy — from probability theory to live strategy deployment.' },
            { icon: '📡', title: 'Content Engine', desc: '9-channel content syndication: blog, YouTube, TikTok, LinkedIn, and more.' },
            { icon: '🔬', title: 'Research', desc: 'Open-source code notebooks, animated mathematical explainers, weekly insights.' },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 rounded-lg border border-slate-800 p-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-white text-sm">{item.title}</p>
                <p className="text-sm text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-white mb-6">Timeline</h2>
        <div className="relative border-l border-slate-800 pl-6 space-y-6">
          {TIMELINE.map((item) => (
            <div key={item.year} className="relative">
              <span className="absolute -left-[1.625rem] top-1 h-3 w-3 rounded-full border-2 border-qf-red bg-qf-black" />
              <p className="text-xs font-bold text-qf-red uppercase tracking-wider">{item.year}</p>
              <p className="mt-1 text-slate-300">{item.event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href="/marketplace" className="btn-primary">
          Explore Products →
        </Link>
        <span className="mx-4 text-slate-600">or</span>
        <Link href="/contact" className="btn-secondary">
          Get in Touch
        </Link>
      </div>
    </div>
  )
}
