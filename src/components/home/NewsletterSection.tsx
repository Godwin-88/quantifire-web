'use client'

import { useState } from 'react'
import ScrollReveal from './ScrollReveal'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source_channel: 'homepage-newsletter' }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="relative py-24 border-t border-slate-800/60">
      <div className="section">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-4xl mb-4">📬</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-heading">
              Stay ahead of the curve
            </h2>
            <p className="mt-3 text-slate-400 max-w-md mx-auto">
              Weekly insights on quant research, data engineering, and automation. Free notebooks, early access to new tools, and exclusive content.
            </p>

            {status === 'success' ? (
              <div className="mt-8 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
                <p className="text-green-400 font-medium">✓ You're subscribed! Check your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="input flex-1 text-center sm:text-left"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary shrink-0"
                >
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe Free'}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="mt-2 text-xs text-red-400">Something went wrong. Try again.</p>
            )}

            <p className="mt-4 text-xs text-slate-600">
              No spam. Unsubscribe anytime. Read our{' '}
              <a href="/privacy" className="text-slate-500 hover:text-slate-300 underline underline-offset-2">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}