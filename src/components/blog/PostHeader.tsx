import Link from 'next/link'
import { formatDate, readingTime } from '@/lib/utils'
import type { Post } from '@/types'

export function PostHeader({ post }: { post: Post }) {
  const mins = readingTime(post.body_mdx ?? post.summary)

  return (
    <header className="pb-8 border-b border-slate-800">
      {/* Breadcrumb */}
      <nav className="mb-5 flex items-center gap-2 text-xs text-slate-500">
        <Link href="/blog" className="hover:text-slate-300">Blog</Link>
        {post.series && (
          <>
            <span>/</span>
            <Link href={`/blog?series=${post.series.slug}`} className="hover:text-slate-300">
              {post.series.name}
            </Link>
          </>
        )}
        {post.series_order && (
          <>
            <span>/</span>
            <span className="font-mono text-qf-red">
              EP {String(post.series_order).padStart(2, '0')}
            </span>
          </>
        )}
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-extrabold text-white sm:text-4xl leading-tight">
        {post.title}
      </h1>

      {/* Summary */}
      <p className="mt-4 text-lg text-slate-400">{post.summary}</p>

      {/* Meta row */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
        {post.published_at && <span>{formatDate(post.published_at)}</span>}
        <span>{mins} min read</span>
        <span className={`badge ${
          post.access_level === 'free'
            ? 'bg-green-400/10 text-green-400'
            : post.access_level === 'premium'
            ? 'bg-yellow-400/10 text-yellow-400'
            : 'bg-purple-400/10 text-purple-400'
        }`}>
          {post.access_level.charAt(0).toUpperCase() + post.access_level.slice(1)}
        </span>
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="badge bg-slate-800 text-slate-400">#{tag}</span>
          ))}
        </div>
      )}
    </header>
  )
}
