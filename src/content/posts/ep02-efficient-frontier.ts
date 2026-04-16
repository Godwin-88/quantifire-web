import type { Post } from '@/types'

export const EP02_POST: Post = {
  id: 'ep02-efficient-frontier',
  slug: 'ep02-efficient-frontier-free-lunch',
  title: 'The Efficient Frontier: The Only Free Lunch in Finance',
  summary:
    'Harry Markowitz won the Nobel Prize for a graph that fits on one page. The Efficient Frontier proves there is exactly one set of portfolios where you get maximum return for every level of risk. Every other portfolio is mathematically inferior.',
  body_mdx: '',   // loaded from ep02-efficient-frontier-free-lunch.mdx at runtime
  cover_image_url: null,
  youtube_url: 'https://youtu.be/bovbpfsnT-U?si=mpqdcYUHIU171-YI',
  tags: ['portfolio-theory', 'efficient-frontier', 'mean-variance-optimization', 'modern-portfolio-theory', 'sharpe-ratio'],
  series_id: 'series-classical-quant',
  series_order: 2,
  status: 'published',
  access_level: 'free',
  published_at: '2026-01-27T08:00:00Z',
  created_at: '2026-01-20T00:00:00Z',
  updated_at: '2026-03-28T00:00:00Z',
  series: {
    id: 'series-classical-quant',
    name: 'Classical Quantitative Finance',
    slug: 'classical-quant',
    description: 'The mathematical foundations every quant must master — from portfolio theory to factor models.',
    episode_count: 10,
    total_views: 0,
    is_active: true,
    created_at: '2026-01-15T00:00:00Z',
  },
  notebooks: [
    {
      id: 'nb-ep02-frontier',
      post_id: 'ep02-efficient-frontier',
      title: 'EP02 — Efficient Frontier & Mean-Variance Optimization',
      description:
        'Full implementation: constrained quadratic optimization, MVP and tangency portfolio, resampled efficient frontier, Black-Litterman preview.',
      storage_path: 'notebooks/ep02-efficient-frontier.ipynb',
      colab_url: 'https://colab.research.google.com/github/Godwin-88/quantifire-web/blob/main/public/notebooks/ep02-efficient-frontier.ipynb',
      github_url: 'https://github.com/Godwin-88/quantifire-web/blob/main/public/notebooks/ep02-efficient-frontier.ipynb',
      access_level: 'free',
      language: 'python',
      download_count: 0,
      created_at: '2026-01-27T00:00:00Z',
    },
  ],
}

export default EP02_POST
