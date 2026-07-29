import type { Product } from '@/types'

/**
 * QuantiFire Products — Research Notebooks
 * 
 * These are the sellable content products — Jupyter notebooks
 * that accompany blog posts and YouTube videos.
 * Each entry follows the Product type shape so it can use the
 * same DualFunnelTabs component for consistent presentation.
 * 
 * Funnel: content
 * CTA: "Buy Notebook" → Stripe checkout (or "Free" → email gate)
 */

export const PRODUCTS: Product[] = [
  {
    slug: 'ep01-correlation-matters',
    name: 'Correlation Matters',
    tagline: 'Why correlation matters more than returns in portfolio construction',
    description:
      'A deep dive into correlation analysis for portfolio construction. Covers Pearson vs Spearman correlation, rolling correlation windows, correlation matrices as network graphs, and the impact of regime changes on correlation structure. Includes a complete Jupyter notebook with synthetic and real market data.',
    icon: '🔗',
    category: 'education',
    tier: 'free',
    priceFrom: 0,
    priceSuffix: '',
    accentColor: '#6366f1',
    status: 'live',
    liveUrl: '/blog/ep01-correlation-matters',
    techStack: ['Python', 'Pandas', 'NumPy', 'Plotly', 'SciPy', 'Jupyter'],
    features: [
      'Pearson vs Spearman correlation — when each applies',
      'Rolling correlation windows for regime detection',
      'Correlation matrix visualisation as network graph',
      'Regime-change impact on correlation structure',
      'Complete Jupyter notebook with synthetic + real data',
      'Google Colab ready — no setup required',
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: 0,
        period: 'one-time',
        features: ['Full notebook', 'Google Colab access', 'All charts interactive'],
        cta: 'Get Free Notebook',
      },
    ],
    purpose:
      'Most portfolio construction starts with returns. But correlation structure determines diversification benefits — and it changes over time. This notebook teaches you to measure, visualise, and adapt to correlation dynamics.',
    purposePoints: [
      'Finance students learning portfolio theory beyond the textbook',
      'Self-taught quants who need practical correlation analysis skills',
      'Portfolio managers reviewing their correlation assumptions',
      'DeFi developers building cross-protocol correlation models',
    ],
    marketRelevance:
      'Correlation is the single most important input to portfolio construction after expected returns — yet most practitioners use a single static number. This notebook teaches dynamic correlation analysis with production-grade code.',
    marketStats: [
      { value: 'Free', label: 'Always free' },
      { value: 'Python', label: 'Implementation language' },
      { value: 'Colab', label: 'Ready to run' },
      { value: 'Series', label: 'Classical Quant Finance' },
    ],
  },
  {
    slug: 'ep02-efficient-frontier',
    name: 'Efficient Frontier',
    tagline: 'Finding the optimal portfolio with Markowitz mean-variance optimisation',
    description:
      'A complete implementation of Modern Portfolio Theory — from the efficient frontier to the tangency portfolio and capital market line. Includes Monte Carlo simulation of thousands of portfolios, optimisation with and without constraints, and interactive visualisation of the efficient frontier.',
    icon: '📈',
    category: 'education',
    tier: 'free',
    priceFrom: 0,
    priceSuffix: '',
    accentColor: '#0ea5e9',
    status: 'live',
    liveUrl: '/blog/ep02-efficient-frontier',
    techStack: ['Python', 'Pandas', 'NumPy', 'SciPy', 'Plotly', 'Jupyter'],
    features: [
      'Monte Carlo simulation of 10,000+ random portfolios',
      'Mean-variance optimisation with SciPy minimiser',
      'Tangency portfolio with risk-free asset (CML)',
      'Constraints: no short-selling, sector limits, cardinality',
      'Interactive efficient frontier with hover annotations',
      'Complete notebook with real market data',
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: 0,
        period: 'one-time',
        features: ['Full notebook', 'Google Colab access', 'Interactive charts'],
        cta: 'Get Free Notebook',
      },
    ],
    purpose:
      'Markowitz mean-variance optimisation is the foundation of modern portfolio theory — but most explanations stop at the formula. This notebook implements it from scratch, letting you explore the efficient frontier interactively.',
    purposePoints: [
      'Finance professionals implementing portfolio optimisation for the first time',
      'Students who want to see MPT work with real data',
      'Quant developers building portfolio construction engines',
    ],
    marketRelevance:
      'Every portfolio construction engine — from robo-advisors to institutional risk systems — implements some form of mean-variance optimisation. Understanding the mechanics behind the optimisation is essential for anyone building or using these systems.',
    marketStats: [
      { value: 'Free', label: 'Always free' },
      { value: '10K+', label: 'Simulated portfolios' },
      { value: 'SciPy', label: 'Optimisation engine' },
      { value: 'Series', label: 'Classical Quant Finance' },
    ],
  },
  {
    slug: 'ep03-performance-metrics',
    name: 'Performance Metrics',
    tagline: 'Sharpe ratio, Sortino ratio, and beyond — measuring what matters',
    description:
      'A comprehensive guide to risk-adjusted performance metrics. Implements Sharpe ratio, Sortino ratio, Calmar ratio, information ratio, and maximum drawdown from scratch. Compares metrics across different market regimes and shows how each metric can be manipulated — and how to defend against it.',
    icon: '📊',
    category: 'education',
    tier: 'free',
    priceFrom: 0,
    priceSuffix: '',
    accentColor: '#10b981',
    status: 'live',
    liveUrl: '/blog/ep03-sharpe-vs-sortino-which-metric',
    techStack: ['Python', 'Pandas', 'NumPy', 'Plotly', 'Jupyter'],
    features: [
      'Sharpe ratio, Sortino ratio, Calmar ratio from scratch',
      'Information ratio and Treynor ratio implementations',
      'Maximum drawdown and drawdown duration analysis',
      'Metric comparison across bull/bear/crab regimes',
      'Manipulation analysis — how each metric can be gamed',
      'Complete notebook with real fund data',
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: 0,
        period: 'one-time',
        features: ['Full notebook', 'Google Colab access', 'All metrics implemented'],
        cta: 'Get Free Notebook',
      },
    ],
    purpose:
      'Performance metrics are the language of fund evaluation — but each metric tells a different story. This notebook teaches you to read between the numbers and understand what each metric actually measures.',
    purposePoints: [
      'Analysts evaluating fund performance beyond the Sharpe ratio',
      'Investors conducting due diligence on managed portfolios',
      'Quant developers building performance reporting systems',
    ],
    marketRelevance:
      'The Sharpe ratio is the most cited performance metric in finance — and the most misused. Understanding its limitations and alternatives is essential for anyone evaluating or reporting investment performance.',
    marketStats: [
      { value: 'Free', label: 'Always free' },
      { value: '6', label: 'Metrics implemented' },
      { value: 'Regimes', label: 'Cross-regime comparison' },
      { value: 'Series', label: 'Classical Quant Finance' },
    ],
  },
  {
    slug: 'ep04-value-at-risk',
    name: 'Value at Risk',
    tagline: 'How much can you lose on a bad day? VaR methods compared',
    description:
      'A complete implementation of Value at Risk (VaR) using three methodologies: historical simulation, parametric (variance-covariance), and Monte Carlo. Compares accuracy across different portfolio types and market conditions. Includes Expected Shortfall (CVaR) as a coherent risk measure alternative.',
    icon: '🛡️',
    category: 'education',
    tier: 'free',
    priceFrom: 0,
    priceSuffix: '',
    accentColor: '#f59e0b',
    status: 'live',
    liveUrl: '/blog/ep04-value-at-risk-how-much-lose-bad-day',
    techStack: ['Python', 'Pandas', 'NumPy', 'SciPy', 'Plotly', 'Jupyter'],
    features: [
      'Historical simulation VaR — non-parametric approach',
      'Parametric VaR — variance-covariance method',
      'Monte Carlo VaR — stochastic simulation',
      'Expected Shortfall (CVaR) — coherent risk measure',
      'Method comparison across portfolio types',
      'Backtesting VaR models with Kupiec test',
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: 0,
        period: 'one-time',
        features: ['Full notebook', 'Google Colab access', '3 VaR methods'],
        cta: 'Get Free Notebook',
      },
    ],
    purpose:
      'VaR is the most widely used risk measure in finance — and one of the most criticised. This notebook implements all three VaR methodologies so you can understand their assumptions, limitations, and appropriate use cases.',
    purposePoints: [
      'Risk managers implementing or reviewing VaR models',
      'Traders who need to understand their risk numbers',
      'Students learning risk management with practical code',
    ],
    marketRelevance:
      'Basel III/IV continues to use VaR as a core regulatory capital measure. Understanding its implementation — and its alternatives — is essential for anyone working in financial risk management.',
    marketStats: [
      { value: 'Free', label: 'Always free' },
      { value: '3', label: 'VaR methodologies' },
      { value: 'CVaR', label: 'Coherent alternative' },
      { value: 'Series', label: 'Classical Quant Finance' },
    ],
  },
  {
    slug: 'ep05-factor-models',
    name: 'Factor Models',
    tagline: 'Alpha or hidden beta? Decomposing returns with factor models',
    description:
      'A production-grade implementation of factor models for return decomposition. Covers CAPM, Fama-French 3-factor, and Carhart 4-factor models. Includes factor construction from raw data, regression-based decomposition, and visualisation of factor exposures over time.',
    icon: '🧩',
    category: 'education',
    tier: 'premium',
    priceFrom: 29,
    priceSuffix: '',
    accentColor: '#ec4899',
    status: 'live',
    liveUrl: '/blog/ep05-factor-models-alpha-or-hidden-beta',
    techStack: ['Python', 'Pandas', 'NumPy', 'Statsmodels', 'Plotly', 'Jupyter'],
    features: [
      'CAPM — single factor market model',
      'Fama-French 3-factor — size, value, market',
      'Carhart 4-factor — momentum added',
      'Factor construction from raw price data',
      'Rolling regression for time-varying exposures',
      'Alpha significance testing with t-statistics',
    ],
    pricingTiers: [
      {
        name: 'Premium',
        price: 29,
        period: 'one-time',
        highlighted: true,
        features: ['Full notebook + datasets', 'Factor construction code', 'Rolling regression analysis', 'Alpha significance testing', 'Email support'],
        cta: 'Buy Premium Notebook',
      },
    ],
    purpose:
      'Factor models are the standard tool for return decomposition in institutional finance. This notebook teaches you to build them from scratch — from factor construction to regression-based attribution.',
    purposePoints: [
      'Analysts building factor-based investment strategies',
      'Researchers testing for alpha in portfolio returns',
      'Quant developers implementing factor models in production',
    ],
    marketRelevance:
      'Factor investing has grown from an academic concept to a multi-trillion-dollar industry. Understanding factor model construction — and the difference between alpha and hidden beta — is essential for anyone in systematic investing.',
    marketStats: [
      { value: '$29', label: 'One-time purchase' },
      { value: '4', label: 'Factor models' },
      { value: 'Statsmodels', label: 'Regression engine' },
      { value: 'Series', label: 'Classical Quant Finance' },
    ],
  },
  {
    slug: 'ep11-uniswap-amm',
    name: 'Uniswap AMM',
    tagline: 'How Uniswap works — the x*y=k formula explained with code',
    description:
      'A complete implementation of the Uniswap V2 constant product AMM from first principles. Covers the x*y=k formula, liquidity provision, impermanent loss, arbitrage, and fee mechanics. Includes interactive visualisation of the bonding curve and price impact.',
    icon: '🔄',
    category: 'education',
    tier: 'free',
    priceFrom: 0,
    priceSuffix: '',
    accentColor: '#a855f7',
    status: 'live',
    liveUrl: '/blog/ep11-how-uniswap-works-xy-k-formula',
    techStack: ['Python', 'Pandas', 'NumPy', 'Plotly', 'Jupyter'],
    features: [
      'x*y=k constant product formula from scratch',
      'Liquidity provision and pool share calculation',
      'Impermanent loss simulation and visualisation',
      'Arbitrage mechanics — how prices stay aligned',
      'Fee accumulation and LP returns analysis',
      'Interactive bonding curve visualisation',
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: 0,
        period: 'one-time',
        features: ['Full notebook', 'Google Colab access', 'Interactive AMM charts'],
        cta: 'Get Free Notebook',
      },
    ],
    purpose:
      'Uniswap\'s constant product AMM is the foundational primitive of DeFi. This notebook implements it from the formula up — giving you a complete understanding of how automated market makers work under the hood.',
    purposePoints: [
      'DeFi developers building on top of AMM protocols',
      'Quant researchers modelling AMM dynamics',
      'Anyone who wants to understand how Uniswap really works',
    ],
    marketRelevance:
      'Uniswap processes billions in weekly volume. Its constant product formula is the most important DeFi primitive — and understanding its mechanics is essential for anyone building or investing in DeFi protocols.',
    marketStats: [
      { value: 'Free', label: 'Always free' },
      { value: 'x*y=k', label: 'Core formula' },
      { value: 'Interactive', label: 'Bonding curve viz' },
      { value: 'Series', label: 'DeFi Mechanics' },
    ],
  },
]

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProducts(): Product[] {
  return PRODUCTS
}

export const CATEGORY_LABELS: Record<string, string> = {
  all: 'All Notebooks',
  education: 'Quant Finance',
  free: 'Free',
  premium: 'Premium',
}