import type { Post } from '@/types'

export const EP01_POST: Post = {
  id: 'ep01-correlation-matters',
  slug: 'ep01-why-correlation-matters-more-than-returns',
  title: 'Why Correlation Matters More Than Returns',
  summary:
    'Adding a losing asset to your portfolio can make you more money. This is not intuition — it is mathematics. We derive the portfolio variance formula, build a correlation matrix from scratch in Python, and show why diversification fails exactly when you need it most.',
  body_mdx: '',   // loaded from ep01-why-correlation-matters-more-than-returns.mdx at runtime
  cover_image_url: null,
  youtube_url: 'https://youtu.be/zQXCFYm6Ev4?si=_-tQqWLoGGFmHa3X',
  tags: ['portfolio-theory', 'correlation', 'diversification', 'covariance-matrix', 'modern-portfolio-theory'],
  series_id: 'series-classical-quant',
  series_order: 1,
  status: 'published',
  access_level: 'free',
  published_at: '2026-01-20T08:00:00Z',
  created_at: '2026-01-15T00:00:00Z',
  updated_at: '2026-01-20T00:00:00Z',
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
      id: 'nb-ep01-correlation',
      post_id: 'ep01-correlation-matters',
      title: 'EP01 — Portfolio Correlation & Variance',
      description:
        'Full implementation: correlation matrices, portfolio variance, crisis stress-testing, and efficient frontier preview.',
      storage_path: 'notebooks/ep01-correlation-matters.ipynb',
      colab_url: 'https://colab.research.google.com/github/Godwin-88/quantifire-web/blob/main/public/notebooks/ep01-correlation-matters.ipynb',
      github_url: 'https://github.com/Godwin-88/quantifire-web/blob/main/public/notebooks/ep01-correlation-matters.ipynb',
      access_level: 'free',
      language: 'python',
      download_count: 0,
      created_at: '2026-01-20T00:00:00Z',
    },
  ],
}

export default EP01_POST
