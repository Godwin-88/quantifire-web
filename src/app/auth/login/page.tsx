'use client'

import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const supabase = createClient()

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })
    if (error) {
      setErrorMsg(error.message)
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  async function handleGitHub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }

  return (
    <div className="min-h-screen bg-qf-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-extrabold">
            <span className="gradient-text">Quanti</span>
            <span>🔥</span>
          </Link>
          <h1 className="mt-4 text-xl font-bold text-white">Sign in to your account</h1>
          <p className="mt-1 text-sm text-slate-400">
            No account?{' '}
            <Link href="/auth/signup" className="text-qf-red hover:underline">
              Create one free
            </Link>
          </p>
        </div>

        <div className="card p-6 space-y-4">
          {status === 'success' ? (
            <div className="text-center py-4">
              <p className="text-green-400 font-medium">Check your email!</p>
              <p className="mt-2 text-sm text-slate-400">We sent a magic link to {email}</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleMagicLink} className="space-y-3">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="input w-full"
                  />
                </div>
                {status === 'error' && (
                  <p className="text-xs text-red-400">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full"
                >
                  {status === 'loading' ? 'Sending link…' : 'Send magic link'}
                </button>
              </form>

              <div className="relative flex items-center gap-3">
                <div className="flex-1 border-t border-slate-800" />
                <span className="text-xs text-slate-500">or</span>
                <div className="flex-1 border-t border-slate-800" />
              </div>

              <button
                onClick={handleGitHub}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Continue with GitHub
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
