'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

// Note: metadata export from a 'use client' page requires a separate layout or server wrapper.
// For now this is a client page with inline head management via useEffect if needed.

const PRODUCTS = [
  { value: '', label: 'Select a project (optional)' },
  { value: 'clinicalmatch', label: 'ClinicalMatch AI — Healthcare Graph-RAG' },
  { value: 'hazardgraph', label: 'HazardGraph — Food Security Early Warning' },
  { value: 'jobhunter', label: 'Job Hunter KE — AI Application Automation' },
  { value: 'graphalpha', label: 'GraphAlpha — Autonomous Trading System' },
  { value: 'agentic-erp', label: 'Agentic ERP — LLM-native Enterprise Platform' },
  { value: 'amd-ea-optimizer', label: 'AMD EA Optimizer — Enterprise Architecture AI' },
  { value: 'lex-kenya', label: 'Lex Kenya — Kenyan Legal AI' },
  { value: 'content', label: 'Quantifaya Content — Quant Finance Research' },
  { value: 'other', label: 'Other / General enquiry' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', product: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact-page' }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="section py-16 max-w-2xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-white">Get in Touch</h1>
        <p className="mt-2 text-slate-400">
          Technical questions, collaboration proposals, or just want to say hi.
        </p>
      </div>

      {status === 'success' ? (
        <div className="card p-10 text-center">
          <p className="text-3xl mb-4">✓</p>
          <h2 className="text-xl font-bold text-white">Message received</h2>
          <p className="mt-2 text-slate-400">We'll get back to you within 1–2 business days.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Name *</label>
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
              <label className="block text-sm font-medium text-slate-300 mb-1">Email *</label>
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

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Company / Organisation</label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              className="input w-full"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Product interest</label>
            <select
              value={form.product}
              onChange={(e) => update('product', e.target.value)}
              className="input w-full"
            >
              {PRODUCTS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Message *</label>
            <textarea
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              required
              rows={5}
              className="input w-full resize-none"
              placeholder="Tell me about your use case, question, or collaboration idea…"
            />
          </div>

          {status === 'error' && (
            <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full"
          >
            {status === 'loading' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      )}
    </div>
  )
}
