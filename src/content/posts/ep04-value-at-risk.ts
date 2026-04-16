import type { Post } from '@/types'

export const EP04_POST: Post = {
  id: 'ep04-value-at-risk',
  slug: 'ep04-value-at-risk-how-much-lose-bad-day',
  title: 'Value at Risk: How Much Can You Lose on a Bad Day?',
  summary:
    'Every major bank and hedge fund must answer one question: how much could we lose in a really bad day? Value at Risk (VaR) is the industry standard. We derive three calculation methods, expose VaR biggest limitation, and build a complete risk reporting system.',
  body_mdx: '',   // loaded from ep04-value-at-risk-how-much-lose-bad-day.mdx at runtime
  cover_image_url: null,
  youtube_url: 'https://www.youtube.com/watch?v=placeholder-ep04',
  tags: ['risk-management', 'value-at-risk', 'var', 'expected-shortfall', 'cvar', 'backtesting', 'fat-tails'],
  series_id: 'series-classical-quant',
  series_order: 4,
  status: 'published',
  access_level: 'free',
  published_at: '2026-02-10T08:00:00Z',
  created_at: '2026-02-03T00:00:00Z',
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
      id: 'nb-ep04-var',
      post_id: 'ep04-value-at-risk',
      title: 'EP04 — Value at Risk & Expected Shortfall',
      description:
        'Full implementation: Historical/Normal/Student-t VaR, Expected Shortfall (CVaR), component VaR decomposition, Kupiec backtesting, GARCH volatility scaling.',
      storage_path: 'notebooks/ep04-value-at-risk.ipynb',
      colab_url: 'https://colab.research.google.com/github/Godwin-88/quantifire-web/blob/main/public/notebooks/ep04-value-at-risk.ipynb',
      github_url: 'https://github.com/Godwin-88/quantifire-web/blob/main/public/notebooks/ep04-value-at-risk.ipynb',
      access_level: 'free',
      language: 'python',
      download_count: 0,
      created_at: '2026-02-10T00:00:00Z',
    },
  ],
}

export default EP04_POST
