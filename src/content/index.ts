import EP01_POST from './posts/ep01-correlation-matters'
import EP11_POST from './posts/ep11-uniswap-amm'
import type { Post } from '@/types'

// Static posts — used as fallback when Supabase is unavailable (dev / pre-seed)
export const STATIC_POSTS: Post[] = [EP01_POST, EP11_POST]

export function getStaticPost(slug: string): Post | undefined {
  return STATIC_POSTS.find((p) => p.slug === slug)
}

export function getStaticPosts(): Post[] {
  return STATIC_POSTS.filter((p) => p.status === 'published')
}
