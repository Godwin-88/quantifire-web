'use client'

import { useState } from 'react'

export function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source_channel: 'landing-banner' }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setMessage('You\'re in! Expect weekly quant insights in your inbox.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="py-20 border-t border-slate-800 bg-gradient-to-b from-qf-navy/20 to-qf-black">
      <div className="section max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Weekly Quant Insights — Free
        </h2>
        <p className="mt-3 text-slate-400">
          New videos, blog posts, model code, and market commentary — delivered every week.
          Join 500+ quant finance practitioners.
        </p>

        {status === 'success' ? (
          <p className="mt-8 text-green-400 font-medium">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="input flex-1"
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
          <p className="mt-3 text-sm text-red-400">{message}</p>
        )}

        <p className="mt-4 text-xs text-slate-600">
          No spam. Unsubscribe anytime. GDPR & POPIA compliant.
        </p>
      </div>
    </section>
  )
}
