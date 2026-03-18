'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { ContentSeries } from '@/types'

export function SeriesNav({ series }: { series: ContentSeries[] }) {
  const params = useSearchParams()
  const activeSeries = params.get('series')

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link
        href="/blog"
        className={`badge border transition-colors ${
          !activeSeries
            ? 'border-qf-red bg-qf-red/15 text-qf-red'
            : 'border-slate-700 bg-slate-800/60 text-slate-400 hover:text-slate-200'
        }`}
      >
        All
      </Link>
      {series.map((s) => (
        <Link
          key={s.slug}
          href={`/blog?series=${s.slug}`}
          className={`badge border transition-colors ${
            activeSeries === s.slug
              ? 'border-qf-blue bg-qf-blue/15 text-qf-blue'
              : 'border-slate-700 bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          {s.name}
        </Link>
      ))}
    </div>
  )
}
