'use client'

import ScrollReveal from './ScrollReveal'
import SectionHeading from './SectionHeading'

const STEPS = [
  {
    step: '01',
    title: 'Discover',
    description: 'We audit your current data infrastructure, identify bottlenecks, and map the highest-impact opportunities.',
    icon: '🔍',
    color: '#6366f1',
  },
  {
    step: '02',
    title: 'Build',
    description: 'Rapid iteration with research-grade rigour. Models are validated, pipelines are tested, and automation is battle-hardened before deployment.',
    icon: '⚙️',
    color: '#0ea5e9',
  },
  {
    step: '03',
    title: 'Scale',
    description: 'Production deployment with monitoring, documentation, and knowledge transfer. We stay on retainer for ongoing optimisation.',
    icon: '🚀',
    color: '#10b981',
  },
]

export function ProcessSection() {
  return (
    <section className="relative py-24">
      <div className="section">
        <ScrollReveal>
          <SectionHeading
            label="How We Work"
            title="From discovery to production in three phases"
            tagline="Every engagement follows the same disciplined approach — no matter the scope."
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 0.15}>
              <div className="group relative rounded-2xl border border-slate-800 bg-qf-navy/40 p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-qf-navy/60">
                {/* Step number */}
                <div className="text-5xl font-bold font-heading text-slate-800/30 transition-colors group-hover:text-slate-700/30">
                  {step.step}
                </div>

                {/* Icon */}
                <div
                  className="mt-4 flex h-14 w-14 items-center justify-center rounded-xl text-2xl"
                  style={{ backgroundColor: `${step.color}15` }}
                >
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-bold text-white font-heading">{step.title}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{step.description}</p>

                {/* Connector line (desktop) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-4 w-8 border-t border-dashed border-slate-700/50" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}