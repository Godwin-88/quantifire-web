import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPublishedPosts } from '@/lib/supabase/queries'
import { getStaticPosts } from '@/content'
import { loadPostMDX } from '@/lib/mdx'
import { PostHeader } from '@/components/blog/PostHeader'
import { MDXContent } from '@/components/blog/MDXContent'
import { NewsletterCTA } from '@/components/blog/NewsletterCTA'
import { NotebookPanel } from '@/components/blog/NotebookPanel'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPostBySlug(slug)
    return {
      title: post.title,
      description: post.summary,
      openGraph: {
        title: post.title,
        description: post.summary,
        type: 'article',
        publishedTime: post.published_at ?? undefined,
        images: post.cover_image_url ? [post.cover_image_url] : [],
      },
    }
  } catch {
    return { title: 'Post not found' }
  }
}

export async function generateStaticParams() {
  const dbPosts = await getPublishedPosts(100).catch(() => [])
  const staticPosts = getStaticPosts()
  const dbSlugs = new Set(dbPosts.map((p) => p.slug))
  const allSlugs = [
    ...dbPosts.map((p) => ({ slug: p.slug })),
    ...staticPosts.filter((p) => !dbSlugs.has(p.slug)).map((p) => ({ slug: p.slug })),
  ]
  return allSlugs
}

export const revalidate = 60

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  let post
  try {
    post = await getPostBySlug(slug)
  } catch {
    notFound()
  }

  // MDX: prefer filesystem file, fall back to DB body_mdx field
  const mdxSource = (await loadPostMDX(slug)) ?? post.body_mdx ?? ''

  return (
    <div className="section py-10 max-w-4xl">
      <PostHeader post={post} />

      {/* YouTube embed */}
      {post.youtube_url && !post.youtube_url.includes('placeholder') && (() => {
        // Normalise any YouTube URL format → embed URL
        // Handles: youtu.be/<id>, youtube.com/watch?v=<id>, youtube.com/embed/<id>
        const toEmbedUrl = (url: string): string | null => {
          try {
            const u = new URL(url)
            let videoId: string | null = null
            if (u.hostname === 'youtu.be') {
              videoId = u.pathname.slice(1)            // /dQw4w9WgXcQ → dQw4w9WgXcQ
            } else if (u.hostname.includes('youtube.com')) {
              if (u.pathname.startsWith('/embed/')) {
                return `https://www.youtube.com${u.pathname}`  // already embed
              }
              videoId = u.searchParams.get('v')        // ?v=dQw4w9WgXcQ
            }
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null
          } catch {
            return null
          }
        }
        const embedSrc = toEmbedUrl(post.youtube_url)
        if (!embedSrc) return null
        return (
          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl border border-slate-800">
            <iframe
              src={embedSrc}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )
      })()}

      {/* Body */}
      <article className="mt-10 prose prose-qf max-w-none">
        <MDXContent source={mdxSource} />
      </article>

      {/* Notebooks panel */}
      {post.notebooks && post.notebooks.length > 0 && (
        <NotebookPanel notebooks={post.notebooks} />
      )}

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </div>
  )
}
