import type { Post } from '@/types'

export const EP05_POST: Post = {
  id: 'ep05-factor-models',
  slug: 'ep05-factor-models-alpha-or-hidden-beta',
  title: 'Factor Models: Is Your Alpha Just Hidden Beta?',
  summary:
    'You backtest a strategy showing 15% returns with Sharpe 1.8. Then you run a factor regression: 95% of your alpha is exposure to known factors. We derive factor models from first principles and expose the humbling truth: most alpha is beta in disguise.',
  body_mdx: '',   // loaded from ep05-factor-models-alpha-or-hidden-beta.mdx at runtime
  cover_image_url: null,
  youtube_url: 'https://youtu.be/OHMxuk1d2iA?si=5OcyYidq5TwiHCzq',
  tags: ['factor-models', 'fama-french', 'alpha', 'beta', 'factor-regression', 'capm', 'risk-factors'],
  series_id: 'series-classical-quant',
  series_order: 5,
  status: 'published',
  access_level: 'free',
  published_at: '2026-02-17T08:00:00Z',
  created_at: '2026-02-10T00:00:00Z',
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
      id: 'nb-ep05-factors',
      post_id: 'ep05-factor-models',
      title: 'EP05 — Factor Models & Alpha Attribution',
      description:
        'Full implementation: CAPM, Fama-French 3/5-factor models, Carhart momentum, factor regression, rolling beta analysis, crypto factor analogues.',
      storage_path: 'notebooks/ep05-factor-models.ipynb',
      colab_url: 'https://colab.research.google.com/github/Godwin-88/quantifire-web/blob/main/public/notebooks/ep05-factor-models.ipynb',
      github_url: 'https://github.com/Godwin-88/quantifire-web/blob/main/public/notebooks/ep05-factor-models.ipynb',
      access_level: 'free',
      language: 'python',
      download_count: 0,
      created_at: '2026-02-17T00:00:00Z',
    },
  ],
}

export default EP05_POST
