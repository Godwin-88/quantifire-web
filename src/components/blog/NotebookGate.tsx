'use client'

import { useState } from 'react'

interface NotebookGateProps {
  notebookId: string
  notebookTitle: string
  action: 'download' | 'colab'
  children: React.ReactNode // the trigger button
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export function NotebookGate({ notebookId, notebookTitle, action, children }: NotebookGateProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
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
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')

      // Execute the action immediately after gate passes
      if (action === 'colab') {
        window.open(data.colabUrl, '_blank', 'noopener,noreferrer')
      } else {
        // Trigger download
        const link = document.createElement('a')
        link.href = data.downloadUrl
        link.download = data.downloadUrl.split('/').pop() ?? 'notebook.ipynb'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }

      // Close modal after short delay
      setTimeout(() => {
        setOpen(false)
        setStatus('idle')
      }, 1800)
    } catch {
      setErrorMsg('Network error. Please check your connection.')
      setStatus('error')
    }
  }

  return (
    <>
      {/* Trigger — render whatever button was passed as children */}
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </span>

      {/* Modal backdrop */}
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
                  📓 Free notebook access
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
                  <p className="text-green-400 font-semibold text-base">
                    {action === 'colab' ? 'Opening in Google Colab…' : 'Download starting…'}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    We've also emailed you a permanent link to <span className="text-white">{email}</span>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Enter your email to{' '}
                    <strong className="text-white">
                      {action === 'colab' ? 'open in Google Colab' : 'download the .ipynb file'}
                    </strong>
                    . We'll also email you a permanent link.
                  </p>

                  <div>
                    <label htmlFor="nb-gate-name" className="block text-xs font-medium text-slate-400 mb-1">
                      Name <span className="text-slate-600">(optional)</span>
                    </label>
                    <input
                      id="nb-gate-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="input w-full text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="nb-gate-email" className="block text-xs font-medium text-slate-400 mb-1">
                      Email <span className="text-qf-red">*</span>
                    </label>
                    <input
                      id="nb-gate-email"
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
                    className="btn-primary w-full flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#ef4444' }}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : action === 'colab' ? (
                      'Open in Colab →'
                    ) : (
                      'Download .ipynb →'
                    )}
                  </button>

                  <p className="text-xs text-slate-600 text-center">
                    Free forever. No spam. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
