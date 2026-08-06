import Link from 'next/link'
import { getPublishedPosts } from '@/lib/supabase/queries'
import { formatDate, readingTime } from '@/lib/utils'

/**
 * LatestResearchSection — two most recent published posts.
 * Server component so it can read directly from the content source.
 */
export async function LatestResearchSection() {
  const posts = await getPublishedPosts(2).catch(() => [])

  if (posts.length === 0) return null

  return (
    <section className="relative py-24 border-t border-slate-800/60">
      <div className="section">
        <div className="flex items-start justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-brand-accent rounded-full shrink-0" />
            <div>
              <p className="text-brand-accent text-xs uppercase tracking-widest font-semibold mb-0.5">
                Latest Research
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-heading">
                From the quant desk
              </h2>
            </div>
          </div>
          <Link href="/blog" className="text-brand-accent text-sm font-medium hover:underline shrink-0 mt-1 flex items-center gap-1">
            View all →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {posts.map((post) => {
            const mins = readingTime(post.body_mdx ?? post.summary)
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-hover group flex flex-col p-5 rounded-xl"
              >
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  {post.series?.name && (
                    <>
                      <span className="font-mono text-qf-red">
                        {post.series_order ? `EP ${String(post.series_order).padStart(2, '0')}` : ''}
                      </span>
                      <span>·</span>
                      <span>{post.series.name}</span>
                    </>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white font-heading group-hover:text-brand-accent transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 line-clamp-3 flex-1">{post.summary}</p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-500">
                  <span>{post.published_at ? formatDate(post.published_at) : ''}</span>
                  <span>{mins} min read</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}