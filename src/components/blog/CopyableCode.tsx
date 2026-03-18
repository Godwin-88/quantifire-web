'use client'

import { useState } from 'react'

interface CopyableCodeProps {
  code: string
  language?: string
  filename?: string
}

export function CopyableCode({ code, language = 'python', filename }: CopyableCodeProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-xl border border-slate-700 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-700">
        <div className="flex items-center gap-3">
          {filename && (
            <span className="text-xs font-mono text-slate-400">{filename}</span>
          )}
          <span className="rounded px-2 py-0.5 text-xs font-semibold bg-slate-800 text-slate-400 uppercase tracking-wider">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-600">read-only</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
          >
            {copied ? (
              <>
                <span className="text-green-400">✓</span>
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <span>⧉</span>
                Copy code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code — non-editable */}
      <pre className="overflow-x-auto p-5 bg-[#0d1117] text-sm leading-relaxed">
        <code className={`language-${language} text-slate-300 font-mono`}>
          {code}
        </code>
      </pre>
    </div>
  )
}
