import type { Post } from '@/types'

export const EP03_POST: Post = {
  id: 'ep03-sharpe-sortino',
  slug: 'ep03-sharpe-vs-sortino-which-metric',
  title: 'Sharpe Ratio vs Sortino Ratio: Which One Should You Actually Use?',
  summary:
    'The Sharpe Ratio is broken — it penalizes upside volatility equally to downside. We expose the fundamental flaw that can make a catastrophically risky strategy look safe, derive the Sortino fix, and build a complete performance attribution framework.',
  body_mdx: '',   // loaded from ep03-sharpe-vs-sortino-which-metric.mdx at runtime
  cover_image_url: null,
  youtube_url: 'https://www.youtube.com/watch?v=placeholder-ep03',
  tags: ['performance-metrics', 'sharpe-ratio', 'sortino-ratio', 'risk-adjusted-returns', 'skewness', 'tail-risk'],
  series_id: 'series-classical-quant',
  series_order: 3,
  status: 'published',
  access_level: 'free',
  published_at: '2026-02-03T08:00:00Z',
  created_at: '2026-01-27T00:00:00Z',
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
      id: 'nb-ep03-metrics',
      post_id: 'ep03-sharpe-sortino',
      title: 'EP03 — Performance Metrics & Risk-Adjusted Returns',
      description:
        'Full implementation: Sharpe, Sortino, Calmar ratios, rolling metrics, skewness/kurtosis analysis, tail risk measures (VaR, CVaR).',
      storage_path: 'notebooks/ep03-performance-metrics.ipynb',
      colab_url: 'https://colab.research.google.com/github/Godwin-88/quantifire-web/blob/main/public/notebooks/ep03-performance-metrics.ipynb',
      github_url: 'https://github.com/Godwin-88/quantifire-web/blob/main/public/notebooks/ep03-performance-metrics.ipynb',
      access_level: 'free',
      language: 'python',
      download_count: 0,
      created_at: '2026-02-03T00:00:00Z',
    },
  ],
}

export default EP03_POST
