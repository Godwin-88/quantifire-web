'use client'

import { useState } from 'react'

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code"
      className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900/80 px-2.5 py-1.5 text-xs text-slate-400 opacity-0 transition-all group-hover:opacity-100 hover:border-slate-500 hover:text-white"
    >
      {copied ? (
        <span className="text-green-400">✓ Copied</span>
      ) : (
        <>⧉ Copy</>
      )}
    </button>
  )
}
