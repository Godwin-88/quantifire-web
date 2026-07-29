import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getPublishedPosts, getAllSeries } from '@/lib/supabase/queries'
import { PostCard } from '@/components/blog/PostCard'
import { SeriesNav } from '@/components/blog/SeriesNav'
import { NewsletterSection } from '@/components/home/NewsletterSection'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'In-depth quant finance articles with animated mathematical explainers, LaTeX formulas, and interactive code notebooks.',
}

export const revalidate = 60 // ISR: revalidate every minute

export default async function BlogPage() {
  const [posts, series] = await Promise.all([
    getPublishedPosts(24).catch(() => []),
    getAllSeries().catch(() => []),
  ])

  return (
    <div className="section py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">
          Quant Finance Blog
        </h1>
        <p className="mt-2 text-slate-400">
          Animated videos, deep-dive articles, and executable code — learn quant finance by doing
        </p>
      </div>

      {/* Series filter */}
      {series.length > 0 && (
        <Suspense fallback={null}>
          <SeriesNav series={series} />
        </Suspense>
      )}

      {/* Posts grid */}
      {posts.length === 0 ? (
        <div className="mt-16 text-center text-slate-500">
          <p className="text-4xl mb-3">✍️</p>
          <p className="font-medium text-slate-300">Blog launching soon.</p>
          <p className="text-sm mt-1">Subscribe below to be notified.</p>
          <Link href="/#newsletter" className="btn-primary mt-6 inline-flex">
            Get Notified
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <NewsletterSection />
    </div>
  )
}
