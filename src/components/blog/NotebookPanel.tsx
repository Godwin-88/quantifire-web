'use client'

import type { JupyterNotebook } from '@/types'
import { NotebookGate } from './NotebookGate'

export function NotebookPanel({ notebooks }: { notebooks: JupyterNotebook[] }) {
  return (
    <div className="mt-12 rounded-xl border border-slate-700 bg-qf-navy/40 p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
        📓 Jupyter Notebooks
      </h3>
      <div className="space-y-3">
        {notebooks.map((nb) => {
          const isFree = nb.access_level === 'free'
          const isPremium = nb.access_level === 'premium'
          const hasAccess = isFree // premium handled separately when auth is live

          return (
            <div
              key={nb.id}
              className="rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-4"
            >
              {/* Top row: title + badge */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white leading-snug">{nb.title}</p>
                  {nb.description && (
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{nb.description}</p>
                  )}
                </div>
                <span
                  className={`badge shrink-0 ${
                    isFree
                      ? 'bg-green-400/10 text-green-400'
                      : isPremium
                      ? 'bg-yellow-400/10 text-yellow-400'
                      : 'bg-purple-400/10 text-purple-400'
                  }`}
                >
                  {nb.access_level}
                </span>
              </div>

              {/* Actions */}
              {hasAccess ? (
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Open in Colab — gated */}
                  <NotebookGate notebookId={nb.id} notebookTitle={nb.title} action="colab">
                    <button className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.9 4.8C14.4 2.3 10.5 2 7.6 4L4.8 1.2C4.4.8 3.7 1 3.5 1.5L2.1 5.3C1.9 5.9 2.3 6.5 2.9 6.5H5c0 .3 0 .6.1.9L2.8 9.7c-.5.5-.4 1.3.3 1.6l3.4 1.5c.2.6.4 1.2.7 1.7l-1.4 3.2c-.3.7.1 1.4.8 1.5l4 .6c.6.1 1.1-.3 1.2-.9l.3-1.8c.8.2 1.6.3 2.4.2l.9 1.6c.3.6 1.1.7 1.6.3l3.1-2.3c.5-.4.6-1.1.2-1.6L19 13.9c.3-.6.5-1.2.6-1.8l1.8-.9c.6-.3.8-1 .4-1.6L19.4 7c-.3-.4-.8-.6-1.3-.5l-1.2.3z"/>
                      </svg>
                      Open in Colab
                    </button>
                  </NotebookGate>

                  {/* Download — gated */}
                  <NotebookGate notebookId={nb.id} notebookTitle={nb.title} action="download">
                    <button className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download .ipynb
                    </button>
                  </NotebookGate>
                </div>
              ) : (
                /* Premium / locked state */
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Premium access required
                  </div>
                  <a
                    href="/products/content?tab=interest"
                    className="text-xs text-qf-red hover:underline"
                  >
                    Join waitlist →
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-xs text-slate-600 leading-relaxed">
        All notebooks are written in Python 3 and run in Google Colab or local Jupyter.
        Enter your email to get permanent download links sent to your inbox.
      </p>
    </div>
  )
}
