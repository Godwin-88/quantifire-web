'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const SERVICES = [
  {
    id: 'quantitative-research',
    name: 'Quantitative Research',
    icon: '🔬',
    tagline: 'Rigorous statistical models that transform data into competitive advantage',
    description: 'Custom quantitative research engines — from Monte Carlo simulations to factor models and time-series forecasting. Built for finance, energy, and logistics sectors.',
    features: ['Monte Carlo Simulation', 'Factor Model Construction', 'Time-Series Forecasting', 'Risk Decomposition', 'Backtesting Frameworks'],
    color: '#6366f1',
  },
  {
    id: 'web-development',
    name: 'Web Development',
    icon: '🌐',
    tagline: 'Fast, accessible, and scalable web applications',
    description: 'Full-stack web applications built with modern frameworks — Next.js, React, Tailwind — delivered with production-grade quality.',
    features: ['Next.js 16 + React 19', 'TypeScript · Tailwind CSS', 'Responsive & Accessible', 'CMS Integration', 'Performance Optimized'],
    color: '#0ea5e9',
  },
  {
    id: 'process-automation',
    name: 'Process Automation',
    icon: '⚡',
    tagline: 'Eliminate manual work with intelligent automation',
    description: 'Workflow automation using n8n, Make, and custom scripts. From data pipelines to multi-step approval flows — we automate it.',
    features: ['n8n · Make Integrations', 'Custom Python Scripts', 'API Orchestration', 'Error Handling & Retries', 'Monitoring Dashboards'],
    color: '#10b981',
  },
  {
    id: 'data-engineering',
    name: 'Data Engineering',
    icon: '🔗',
    tagline: 'Robust pipelines that turn raw data into structured assets',
    description: 'ETL/ELT pipelines, data warehousing, and real-time streaming. Built on PostgreSQL, dbt, and cloud-native infrastructure.',
    features: ['ETL Pipeline Design', 'dbt Transformations', 'PostgreSQL · BigQuery', 'Real-time Streaming', 'Data Quality Monitoring'],
    color: '#f59e0b',
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    icon: '📊',
    tagline: 'Actionable insights powered by statistical rigor',
    description: 'Exploratory analysis, statistical modeling, and dashboards that drive decisions. Python, R, and BI tool expertise.',
    features: ['Statistical Modeling', 'Python · R Analysis', 'Dashboard Design', 'A/B Testing Framework', 'Predictive Analytics'],
    color: '#ec4899',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 border-b border-slate-800">
      <div className="section">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white">What We Do</h2>
          <p className="mt-2 text-sm text-slate-400">
            Five core service areas designed to take your project from concept to production.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flip-card perspective-1000" style={{ height: 320 }}>
                <div className="flip-card-inner relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Front face */}
                  <div className="flip-card-front absolute inset-0 rounded-2xl border border-slate-800 bg-qf-navy/60 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                    <span className="text-4xl mb-4">{service.icon}</span>
                    <h3 className="text-lg font-bold text-white mb-2">{service.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">Hover to see details →</p>
                  </div>
                  {/* Back face */}
                  <div className="flip-card-back absolute inset-0 rounded-2xl border p-6 flex flex-col" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', borderColor: `${service.color}40`, background: `linear-gradient(135deg, ${service.color}08 0%, transparent 60%)` }}>
                    <h3 className="text-lg font-bold text-white mb-1">{service.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">{service.tagline}</p>
                    <ul className="space-y-1.5 flex-1">
                      {service.features.slice(0, 3).map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="mt-0.5 shrink-0" style={{ color: service.color }}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/services/${service.id}`}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                      style={{ color: service.color }}
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}