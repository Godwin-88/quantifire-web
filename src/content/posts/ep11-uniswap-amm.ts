import type { Post } from '@/types'

export const EP11_POST: Post = {
  id: 'ep11-uniswap-amm',
  slug: 'ep11-how-uniswap-works-xy-k-formula',
  title: 'How Uniswap Actually Works: The x·y=k Formula',
  summary:
    'Every stock exchange uses order books and human market makers. Uniswap replaced all of that with one equation: x·y=k. This post derives the constant product formula, calculates price impact from first principles, and shows why V3 concentrated liquidity is a capital efficiency revolution.',
  body_mdx: '',   // loaded from ep11-how-uniswap-works-xy-k-formula.mdx at runtime
  cover_image_url: null,
  youtube_url: 'https://www.youtube.com/watch?v=placeholder-ep11',
  tags: ['defi', 'uniswap', 'amm', 'constant-product', 'liquidity', 'price-impact'],
  series_id: 'series-defi-mechanics',
  series_order: 1,
  status: 'published',
  access_level: 'free',
  published_at: '2026-02-20T08:00:00Z',
  created_at: '2026-02-15T00:00:00Z',
  updated_at: '2026-02-20T00:00:00Z',
  series: {
    id: 'series-defi-mechanics',
    name: 'DeFi Mechanics',
    slug: 'defi-mechanics',
    description: 'The mathematics and engineering behind decentralised finance — AMMs, lending protocols, flash loans, and more.',
    episode_count: 8,
    total_views: 0,
    is_active: true,
    created_at: '2026-02-01T00:00:00Z',
  },
  notebooks: [
    {
      id: 'nb-ep11-amm',
      post_id: 'ep11-uniswap-amm',
      title: 'EP11 — AMM Mechanics & Price Impact',
      description:
        'Full implementation: x·y=k invariant, price impact simulation, V2 vs V3 capital efficiency comparison.',
      storage_path: 'notebooks/ep11-uniswap-amm.ipynb',
      colab_url: 'https://colab.research.google.com/github/Godwin-88/quantifire-web/blob/main/public/notebooks/ep11-uniswap-amm.ipynb',
      github_url: 'https://github.com/Godwin-88/quantifire-web/blob/main/public/notebooks/ep11-uniswap-amm.ipynb',
      access_level: 'free',
      language: 'python',
      download_count: 0,
      created_at: '2026-02-20T00:00:00Z',
    },
    {
      id: 'nb-ep11-v3',
      post_id: 'ep11-uniswap-amm',
      title: 'EP11 (Premium) — V3 Concentrated Liquidity Deep Dive',
      description:
        'Tick-level liquidity analysis, capital efficiency calculations, optimal range selection, and LP P&L modelling.',
      storage_path: 'notebooks/ep11-uniswap-v3-premium.ipynb',
      colab_url: null,
      github_url: null,
      access_level: 'premium',
      language: 'python',
      download_count: 0,
      created_at: '2026-02-20T00:00:00Z',
    },
  ],
}

export default EP11_POST
