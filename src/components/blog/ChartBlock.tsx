'use client'

import { useState } from 'react'

interface ChartBlockProps {
  title: string
  description?: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function ChartBlock({ title, description, children, defaultOpen = true }: ChartBlockProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="my-8 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-700">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-qf-blue mr-2">
            ◈ Interactive
          </span>
          <span className="text-sm font-semibold text-white">{title}</span>
          {description && (
            <p className="text-xs text-slate-500 mt-0.5">{description}</p>
          )}
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 ml-4 rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
        >
          {open ? '▲ Hide' : '▼ Show'}
        </button>
      </div>

      {/* Chart area */}
      {open && (
        <div className="bg-slate-950 p-4 overflow-x-auto">
          {children}
        </div>
      )}
    </div>
  )
}
