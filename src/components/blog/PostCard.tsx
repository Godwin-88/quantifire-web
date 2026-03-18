import Link from 'next/link'
import { formatDate, readingTime } from '@/lib/utils'
import type { Post } from '@/types'

const ACCESS_BADGE = {
  free:          { label: 'Free',          cls: 'text-green-400 bg-green-400/10' },
  premium:       { label: 'Premium',       cls: 'text-yellow-400 bg-yellow-400/10' },
  institutional: { label: 'Institutional', cls: 'text-purple-400 bg-purple-400/10' },
}

export function PostCard({ post }: { post: Post }) {
  const access = ACCESS_BADGE[post.access_level]
  const mins = readingTime(post.body_mdx ?? post.summary)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-hover group flex flex-col p-5 rounded-xl"
    >
      {/* Series + episode */}
      {post.series && (
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <span className="font-mono text-qf-red">
            {post.series_order ? `EP ${String(post.series_order).padStart(2, '0')}` : ''}
          </span>
          {post.series_order && <span>·</span>}
          <span>{post.series.name}</span>
        </div>
      )}

      {/* Title */}
      <h2 className="text-sm font-semibold text-white group-hover:text-qf-blue transition-colors line-clamp-2 flex-1">
        {post.title}
      </h2>

      {/* Summary */}
      <p className="mt-2 text-xs text-slate-500 line-clamp-3">{post.summary}</p>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="badge bg-slate-800 text-slate-400">{tag}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className={`badge ${access.cls}`}>{access.label}</span>
          {post.published_at && <span>{formatDate(post.published_at)}</span>}
        </div>
        <span>{mins} min read</span>
      </div>
    </Link>
  )
}
