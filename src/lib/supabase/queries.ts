import { createClient } from './server'
import { getStaticPosts, getStaticPost } from '@/content'
import type { Post, ContentSeries } from '@/types'

export async function getPublishedPosts(limit = 20, offset = 0): Promise<Post[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select(`*, series:content_series(id, name, slug)`)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    // Merge DB posts with static posts (static posts fill any gaps)
    const dbSlugs = new Set((data as Post[]).map((p) => p.slug))
    const staticFallbacks = getStaticPosts().filter((p) => !dbSlugs.has(p.slug))
    return [...(data as Post[]), ...staticFallbacks].slice(0, limit)
  } catch {
    return getStaticPosts().slice(offset, offset + limit)
  }
}

export async function getPostBySlug(slug: string): Promise<Post> {
  // Check static content first (always available)
  const staticPost = getStaticPost(slug)

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select(`*, series:content_series(id, name, slug), notebooks:jupyter_notebooks(*)`)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) throw error
    return data as Post
  } catch {
    if (staticPost) return staticPost
    throw new Error(`Post not found: ${slug}`)
  }
}

export async function getPostsByTag(tag: string, limit = 10) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select(`*, series:content_series(id, name, slug)`)
    .contains('tags', [tag])
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as Post[]
}

export async function getPostsBySeries(seriesSlug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select(`*, series:content_series!inner(id, name, slug)`)
    .eq('content_series.slug', seriesSlug)
    .eq('status', 'published')
    .order('series_order', { ascending: true })

  if (error) throw error
  return data as Post[]
}

const STATIC_SERIES: ContentSeries[] = [
  {
    id: 'series-classical-quant',
    name: 'Classical Quantitative Finance',
    slug: 'classical-quant',
    description: 'The mathematical foundations every quant must master — from portfolio theory to factor models.',
    episode_count: 10,
    total_views: 0,
    is_active: true,
    created_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 'series-defi-mechanics',
    name: 'DeFi Mechanics',
    slug: 'defi-mechanics',
    description: 'The mathematics and engineering behind decentralised finance — AMMs, lending protocols, flash loans, and more.',
    episode_count: 8,
    total_views: 0,
    is_active: true,
    created_at: '2026-02-01T00:00:00Z',
  },
]

export async function getAllSeries() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('content_series')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true })

    if (error) throw error
    const dbSlugs = new Set((data as ContentSeries[]).map((s) => s.slug))
    const staticFallbacks = STATIC_SERIES.filter((s) => !dbSlugs.has(s.slug))
    return [...(data as ContentSeries[]), ...staticFallbacks]
  } catch {
    return STATIC_SERIES
  }
}

export async function subscribeEmail(email: string, sourceChannel = 'blog') {
  const supabase = await createClient()
  const { error } = await supabase
    .from('subscribers')
    .upsert({ email, source_channel: sourceChannel, tier: 'free' }, { onConflict: 'email' })

  if (error) throw error
}

export async function saveLead(lead: { email: string; name?: string; message?: string; source_channel?: string }) {
  const supabase = await createClient()
  const { error } = await supabase.from('leads').insert(lead)
  if (error) throw error
}
