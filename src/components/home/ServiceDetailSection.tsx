'use client'

import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import SectionHeading from './SectionHeading'

const SERVICES = [
  {
    id: 'quantitative-research',
    name: 'Quantitative Research',
    icon: '📐',
    tagline: 'Rigorous statistical models that transform data into competitive advantage',
    description:
      'Custom quantitative research engines — from Monte Carlo simulations to factor models and time-series forecasting. Built for finance, energy, and logistics sectors.',
    features: [
      'Monte Carlo Simulation',
      'Factor Model Construction',
      'Time-Series Forecasting',
      'Risk Decomposition',
      'Backtesting Frameworks',
    ],
    color: '#6366f1',
    gradient: 'from-indigo-500/20 to-indigo-500/5',
  },
  {
    id: 'web-development',
    name: 'Web Development',
    icon: '🌐',
    tagline: 'Fast, accessible, and scalable web applications',
    description:
      'Full-stack web applications built with modern frameworks — Next.js, React, Tailwind — delivered with production-grade quality.',
    features: [
      'Next.js 16 + React 19',
      'TypeScript · Tailwind CSS',
      'Responsive & Accessible',
      'CMS Integration',
      'Performance Optimized',
    ],
    color: '#0ea5e9',
    gradient: 'from-sky-500/20 to-sky-500/5',
  },
  {
    id: 'process-automation',
    name: 'Process Automation',
    icon: '⚡',
    tagline: 'Eliminate manual work with intelligent automation',
    description:
      'Workflow automation using n8n, Make, and custom scripts. From data pipelines to multi-step approval flows — we automate it.',
    features: [
      'n8n · Make Integrations',
      'Custom Python Scripts',
      'API Orchestration',
      'Error Handling & Retries',
      'Monitoring Dashboards',
    ],
    color: '#10b981',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    id: 'data-engineering',
    name: 'Data Engineering',
    icon: '🔗',
    tagline: 'Robust pipelines that turn raw data into structured assets',
    description:
      'ETL/ELT pipelines, data warehousing, and real-time streaming. Built on PostgreSQL, dbt, and cloud-native infrastructure.',
    features: [
      'ETL Pipeline Design',
      'dbt Transformations',
      'PostgreSQL · BigQuery',
      'Real-time Streaming',
      'Data Quality Monitoring',
    ],
    color: '#f59e0b',
    gradient: 'from-amber-500/20 to-amber-500/5',
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    icon: '📊',
    tagline: 'Actionable insights powered by statistical rigor',
    description:
      'Exploratory analysis, statistical modeling, and dashboards that drive decisions. Python, R, and BI tool expertise.',
    features: [
      'Statistical Modeling',
      'Python · R Analysis',
      'Dashboard Design',
      'A/B Testing Framework',
      'Predictive Analytics',
    ],
    color: '#ec4899',
    gradient: 'from-pink-500/20 to-pink-500/5',
  },
]

export function ServiceDetailSection() {
  return (
    <section className="relative py-24">
      <div className="section">
        <ScrollReveal>
          <SectionHeading
            label="What We Do"
            title="Deep expertise across the full data-to-decision stack"
            tagline="From mathematical models to production dashboards — each service is built with the same rigour: research-grade methodology, production-grade engineering."
          />
        </ScrollReveal>

        <div className="mt-16 space-y-24">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.id}>
              <div
                className={`grid gap-8 lg:gap-16 items-center ${
                  i % 2 === 0 ? 'lg:grid-cols-[1fr_1fr]' : 'lg:grid-cols-[1fr_1fr]'
                }`}
              >
                {/* Content */}
                <div className={i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-300 mb-4">
                    <span className="text-base">{service.icon}</span>
                    {service.name}
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading leading-tight">
                    {service.tagline}
                  </h3>
                  <p className="mt-4 text-slate-400 leading-relaxed">{service.description}</p>
                  <ul className="mt-6 grid grid-cols-2 gap-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                        <span
                          className="h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: service.color }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className={i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                  <motion.div
                    className={`relative rounded-2xl border border-slate-800 bg-gradient-to-br ${service.gradient} p-8 backdrop-blur-sm`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <div className="flex items-center justify-center h-48">
                      <span className="text-7xl">{service.icon}</span>
                    </div>
                    <div
                      className="absolute inset-0 rounded-2xl opacity-20"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${service.color}22, transparent)`,
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}