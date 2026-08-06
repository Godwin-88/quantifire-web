import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Quantifaya',
  description:
    'Quantifaya designs and ships production digital platforms — from customer experience to applied intelligence and enterprise security. Quant-finance rigor applied to everything we build.',
}

const CAPABILITIES = [
  {
    icon: '🧩',
    title: 'Experience',
    description:
      'Web platforms, product interfaces, and digital experiences engineered to be fast, accessible, and scalable — built on modern front-end architectures with disciplined performance budgets.',
  },
  {
    icon: '🧠',
    title: 'Intelligence',
    description:
      'Quantitative research, statistical modelling, machine learning, and agentic AI systems. From knowledge graphs to autonomous trading agents — intelligence grounded in measurable outcomes.',
  },
  {
    icon: '🔐',
    title: 'Security',
    description:
      'Immutable ledgers, KYC/AML pipelines, rate-limited APIs, and defensible architecture. We design systems where trust is an architectural property, not an afterthought.',
  },
]

const ENTERPRISE_BUILDS = [
  'Cross-border payment and settlement platforms',
  'AI-native ERP and enterprise workflow systems',
  'Knowledge-graph intelligence for legal, clinical, and financial domains',
  'Autonomous multi-agent trading and research platforms',
  'Data engineering and analytics infrastructure',
]

export default function AboutPage() {
  return (
    <div className="section py-16 max-w-4xl mx-auto space-y-20">

      {/* ── Hero ── */}
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary mb-3">About Quantifaya</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-heading leading-tight">
          Rigour applied to everything we build.
        </h1>
        <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Quantifaya is a digital engineering practice grounded in quantitative finance.
          We design, build, and ship production platforms — for independent operators
          and for institutions — with the same research-grade methodology and
          production-grade engineering discipline.
        </p>
      </div>

      {/* ── Core Capabilities ── */}
      <div>
        <h2 className="text-2xl font-bold text-white font-heading mb-8 text-center">
          Every platform we build has three dimensions
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-7"
            >
              <div className="text-3xl">{cap.icon}</div>
              <h3 className="mt-4 text-lg font-bold text-white font-heading">{cap.title}</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Foundation ── */}
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
          <h2 className="text-xl font-bold text-white font-heading mb-3">A quantitative foundation</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Our practice is anchored in advanced quantitative finance: stochastic modelling,
            derivative pricing, financial econometrics, and machine learning for finance.
            This is not a credential — it is an operating discipline. Every system we ship
            is treated as a model: hypothesis, calibration, validation, and honest measurement.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
          <h2 className="text-xl font-bold text-white font-heading mb-3">A delivery track record</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            We have architected and deployed production systems across fintech, healthcare,
            legal intelligence, and enterprise tooling — leading engineering, infrastructure,
            and solution architecture on teams from early-stage products to institutional platforms.
          </p>
        </div>
      </div>

      {/* ── Enterprise platforms ── */}
      <div>
        <h2 className="text-2xl font-bold text-white font-heading mb-3 text-center">
          Custom enterprise platforms we build
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto text-center mb-8">
          Whether you are a sole proprietor needing a full product or an organization
          requiring enterprise-grade infrastructure, we deliver systems that ship and scale.
        </p>
        <ul className="space-y-3 max-w-2xl mx-auto">
          {ENTERPRISE_BUILDS.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/40 px-5 py-4 text-sm text-slate-300"
            >
              <span className="mt-0.5 shrink-0 text-brand-primary font-bold">›</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── CTA ── */}
      <div className="rounded-2xl border border-brand-primary/20 bg-qf-navy/40 p-10 text-center">
        <h2 className="text-2xl font-bold text-white font-heading mb-3">
          Let's design your next platform
        </h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto mb-8">
          We take on select projects — from a single product for an independent operator
          to a full enterprise platform for an organization.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn-primary">
            Start a Project
          </Link>
          <Link href="/portfolio" className="btn-secondary">
            View Work →
          </Link>
        </div>
      </div>

    </div>
  )
}