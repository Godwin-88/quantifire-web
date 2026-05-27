// ─── Blog ────────────────────────────────────────────────────────────────────

export type PostStatus = 'draft' | 'published' | 'archived'
export type AccessLevel = 'free' | 'premium' | 'institutional'

export interface Post {
  id: string
  slug: string
  title: string
  summary: string
  body_mdx: string
  cover_image_url: string | null
  youtube_url: string | null
  tags: string[]
  series_id: string | null
  series_order: number | null
  status: PostStatus
  access_level: AccessLevel
  published_at: string | null
  created_at: string
  updated_at: string
  // Joined
  series?: ContentSeries | null
  notebooks?: JupyterNotebook[]
}

export interface ContentSeries {
  id: string
  name: string
  slug: string
  description: string | null
  episode_count: number
  total_views: number
  is_active: boolean
  created_at: string
}

export interface JupyterNotebook {
  id: string
  post_id: string
  title: string
  description: string | null
  storage_path: string
  colab_url: string | null
  github_url: string | null
  access_level: AccessLevel
  language: string
  download_count: number
  created_at: string
}

// ─── Leads / Subscribers ─────────────────────────────────────────────────────

export interface Subscriber {
  id: string
  email: string
  source_channel: string | null
  tier: 'free' | 'premium' | 'vip'
  opted_in_at: string
  tags: string[]
}

export interface Lead {
  id: string
  email: string
  name: string | null
  source_channel: string | null
  message: string | null
  created_at: string
}

// ─── Products ────────────────────────────────────────────────────────────────

export type ProductCategory = 'tradfi' | 'web3' | 'tools' | 'ai' | 'education' | 'media' | 'healthtech' | 'fintech' | 'automation'
export type ProductTier = 'free' | 'premium' | 'institutional'

export interface PricingTier {
  name: string
  price: number | null   // null = custom / contact sales
  period: 'month' | 'year' | 'one-time'
  features: string[]
  cta: string
  highlighted?: boolean
}

export interface MarketStat {
  value: string
  label: string
}

export interface Product {
  slug: string
  name: string
  tagline: string
  description: string
  icon: string
  category: ProductCategory
  tier: ProductTier
  priceFrom: number | null
  priceSuffix: string
  features: string[]
  pricingTiers: PricingTier[]
  status: 'live' | 'beta' | 'coming-soon' | 'in-development'
  accentColor: string
  // Portfolio links
  liveUrl?: string    // fully functional production deployment
  demoUrl?: string    // UI preview / visualisation — no backend wired
  githubUrl?: string
  techStack?: string[]
  // Tabbed content
  purpose: string
  purposePoints: string[]
  marketRelevance: string
  marketStats: MarketStat[]
}

export interface ProductInterestForm {
  name: string
  email: string
  whatsapp: string
  occupation: string
  age: string
  gender: string
  productPurpose: string
  productSlug: string
}
