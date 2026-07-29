'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PremiumNotebookGateProps {
  notebookId: string
  notebookTitle: string
  price: number
  productSlug: string
  children: React.ReactNode
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export function PremiumNotebookGate({
  notebookId,
  notebookTitle,
  price,
  productSlug,
  children,
}: PremiumNotebookGateProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleFreeAccess(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/notebooks/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, notebookId }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorMsg(data.error ?? 'Something went wrong.')
        setStatus('error')
        return
      }

      setStatus('success')

      // Open the Colab link
      if (data.colabUrl) {
        window.open(data.colabUrl, '_blank', 'noopener,noreferrer')
      }

      setTimeout(() => {
        setOpen(false)
        setStatus('idle')
      }, 1800)
    } catch {
      setErrorMsg('Network error.')
      setStatus('error')
    }
  }

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </span>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="w-full max-w-md rounded-xl border border-slate-700 bg-qf-navy shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                  📓 Premium Notebook
                </p>
                <p className="text-sm font-semibold text-white leading-snug">
                  {notebookTitle}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-500 hover:text-white transition-colors ml-4 shrink-0"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              {status === 'success' ? (
                <div className="text-center py-4">
                  <div className="text-3xl mb-3">✅</div>
                  <p className="text-green-400 font-semibold text-base">Access granted!</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Opening in Google Colab… We've also emailed you a permanent link.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Premium option */}
                  <div className="rounded-xl border border-brand-primary/30 bg-brand-primary/5 p-5 text-center">
                    <p className="text-sm text-slate-300">Get the full research suite</p>
                    <p className="mt-1 text-3xl font-bold text-white font-heading">
                      ${price}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">One-time purchase · Lifetime access</p>
                    <Link href={`/products/${productSlug}`}>
                      <button className="btn-primary mt-4 w-full">
                        Buy Premium Notebook →
                      </button>
                    </Link>
                  </div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-700" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-qf-navy px-3 text-xs text-slate-500">or try a sample for free</span>
                    </div>
                  </div>

                  {/* Free sample */}
                  <form onSubmit={handleFreeAccess} className="space-y-3">
                    <p className="text-sm text-slate-400">
                      Enter your email to access a <strong className="text-white">free sample</strong> of this notebook on Google Colab.
                    </p>
                    <div>
                      <label htmlFor="pm-name" className="block text-xs font-medium text-slate-400 mb-1">
                        Name <span className="text-slate-600">(optional)</span>
                      </label>
                      <input
                        id="pm-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="input w-full text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="pm-email" className="block text-xs font-medium text-slate-400 mb-1">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="pm-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="input w-full text-sm"
                      />
                    </div>
                    {status === 'error' && (
                      <p className="text-xs text-red-400">{errorMsg}</p>
                    )}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-secondary w-full flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        'Get Free Sample →'
                      )}
                    </button>
                    <p className="text-xs text-slate-600 text-center">
                      Free forever. No spam. Unsubscribe anytime.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}