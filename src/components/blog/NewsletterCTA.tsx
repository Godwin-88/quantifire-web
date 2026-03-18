'use client'

import { useState } from 'react'

export function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source_channel: 'blog-cta' }),
      })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mt-14 rounded-xl border border-qf-red/30 bg-qf-red/5 p-6 text-center">
      <h3 className="text-lg font-semibold text-white">Get the Full Model Code</h3>
      <p className="mt-1 text-sm text-slate-400">
        Subscribe for weekly quant insights, free Jupyter notebooks, and early access to new episodes.
      </p>
      {status === 'success' ? (
        <p className="mt-5 text-green-400 font-medium">✓ You're subscribed!</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="input flex-1 text-center sm:text-left"
          />
          <button type="submit" disabled={status === 'loading'} className="btn-primary shrink-0">
            {status === 'loading' ? 'Subscribing…' : 'Subscribe Free'}
          </button>
        </form>
      )}
      {status === 'error' && <p className="mt-2 text-xs text-red-400">Something went wrong. Try again.</p>}
    </div>
  )
}
