import type { Product } from '@/types'

export const PRODUCTS: Product[] = [
  {
    slug: 'quantifaya',
    name: 'Quantifaya',
    tagline: 'Institutional-grade quant finance for every desk',
    description:
      'A full-stack quantitative finance platform with 8 integrated modules — from options pricing to portfolio optimisation and risk management. Built for quant researchers, portfolio managers, and algorithmic traders.',
    icon: '📊',
    category: 'tradfi',
    tier: 'premium',
    priceFrom: 299,
    priceSuffix: '/mo',
    accentColor: '#3b82f6',
    status: 'coming-soon',
    features: [
      'Options Pricing Engine (Black-Scholes, FFT, Heston SV, live Greeks)',
      'Portfolio Analytics (moments, performance ratios, CAPM)',
      'Risk Management (VaR, Greeks aggregation, covariance health)',
      'Portfolio Optimizer (MVO, Black-Litterman, Kelly, Risk Parity, HRP)',
      'Volatility Lab (IV surface, Heston calibration, historical vs implied)',
      'Factor Lab (Fama-MacBeth, smart beta, ML factor discovery)',
      'Scenario Engine (Monte Carlo, behavioural, crisis overlays)',
      'Trade Blotter (position tracking, P&L attribution, audit trail)',
    ],
    pricingTiers: [
      {
        name: 'Starter',
        price: 299,
        period: 'month',
        features: ['All 8 modules', '10 users', '1,000 API calls/day', 'Email support'],
        cta: 'Start Free Trial',
      },
      {
        name: 'Professional',
        price: 999,
        period: 'month',
        highlighted: true,
        features: [
          'Everything in Starter',
          '50 users',
          '10,000 API calls/day',
          'Priority support',
          'Custom dashboards',
        ],
        cta: 'Start Free Trial',
      },
      {
        name: 'Institutional',
        price: null,
        period: 'month',
        features: [
          'Everything in Professional',
          'Unlimited users',
          'Dedicated account manager',
          'SLA guarantee',
          'White-label options',
        ],
        cta: 'Contact Sales',
      },
    ],
    purpose:
      'Quantifaya exists to close the gap between institutional-grade quant research and the tools accessible to independent traders, small prop desks, and fintech teams. Professional enterprise terminal access costs upwards of $24,000 per seat per year — Quantifaya delivers equivalent analytical depth at a fraction of that cost, in a web-first platform built for modern workflows.',
    purposePoints: [
      'Quant researchers who need fast options pricing, factor modelling, and scenario analysis without writing boilerplate infrastructure',
      'Portfolio managers running systematic strategies who need risk dashboards that integrate directly with their execution layer',
      'Algorithmic traders backtesting factor models and stress-testing portfolios under historical crisis scenarios',
      'Fintech startups embedding institutional analytics into their own products via the Quantifaya API',
      'University research teams who want a reproducible, code-first quant environment without expensive data vendor lock-in',
    ],
    marketRelevance:
      'The global quantitative finance software market is valued at over $4 billion and growing at 12% CAGR, driven by the democratisation of algorithmic trading and the explosion of retail participation in derivatives markets. Legacy enterprise terminal vendors serve large institutions with high-friction, high-cost contracts. The underserved segment — independent quants, boutique prop desks, family offices, and emerging-market fintech teams — is large and growing. Quantifaya targets this segment directly with a modern SaaS pricing model, a developer-friendly API, and a composable 8-module architecture that scales from individual researchers to multi-desk operations.',
    marketStats: [
      { value: '$4.2B', label: 'Quant software market size' },
      { value: '12% CAGR', label: 'Market growth rate' },
      { value: '$24K/yr', label: 'Enterprise terminal cost per seat' },
      { value: '2.8M+', label: 'Independent quant traders globally' },
    ],
  },
  {
    slug: 'yield-agent',
    name: 'Yield Agent',
    tagline: 'AI-powered DeFi yield optimisation',
    description:
      'An autonomous DeFi yield optimisation agent powered by a stablecoin execution layer and a knowledge graph for protocol relationships. Discovers, analyses, and executes optimal yield strategies across EVM chains and Solana.',
    icon: '🤖',
    category: 'web3',
    tier: 'premium',
    priceFrom: 49,
    priceSuffix: '/mo',
    accentColor: '#22c55e',
    status: 'coming-soon',
    features: [
      'Multi-chain yield discovery (Ethereum, Base, Solana)',
      'Knowledge graph for protocol relationship mapping',
      'Stablecoin execution layer for yield strategies',
      'Delta-neutral yield strategies',
      'Automated rebalancing with gas optimisation',
      'Liquidation risk monitoring and alerts',
      'On-chain audit trail',
      'Web3 wallet connectivity (browser & mobile)',
    ],
    pricingTiers: [
      {
        name: 'Pro',
        price: 49,
        period: 'month',
        features: ['Up to $50K AUM', 'EVM chains', 'Daily rebalancing', 'Email alerts'],
        cta: 'Start Free Trial',
      },
      {
        name: 'Growth',
        price: 299,
        period: 'month',
        highlighted: true,
        features: [
          'Up to $500K AUM',
          'All chains incl. Solana',
          'Real-time rebalancing',
          'Priority alerts',
          'API access',
        ],
        cta: 'Start Free Trial',
      },
      {
        name: 'Enterprise',
        price: null,
        period: 'month',
        features: ['Unlimited AUM', 'Custom strategies', 'Dedicated support', 'SLA'],
        cta: 'Contact Sales',
      },
    ],
    purpose:
      'Yield Agent solves the fundamental challenge of DeFi yield farming: the opportunity space is enormous but the cognitive load of navigating hundreds of protocols, chains, and liquidity pools is unsustainable for individual investors. Yield Agent acts as an autonomous on-chain portfolio manager — continuously scanning, analysing, and executing yield strategies so users capture optimal returns without constant manual intervention.',
    purposePoints: [
      'DeFi-native investors managing $10K–$10M who want systematic, data-driven yield strategies rather than ad-hoc farming',
      'TradFi investors entering DeFi for the first time who need guardrails, risk metrics, and plain-English strategy explanations',
      'DAO treasuries seeking to deploy idle stablecoin reserves into delta-neutral, low-risk yield strategies',
      'Crypto hedge funds that want automated rebalancing and gas-optimised execution to reduce operational overhead',
      'Developers building yield aggregation products who need a battle-tested strategy engine via API',
    ],
    marketRelevance:
      'DeFi Total Value Locked (TVL) has exceeded $100 billion across all chains, with yield-generating protocols accounting for the majority. The yield optimisation segment alone — encompassing automated vaults, liquid staking, and LP management — represents over $40 billion in assets. Despite this scale, the tooling available to individual yield farmers remains fragmented: users must manually monitor APYs across dozens of protocols, model impermanent loss, and time rebalances around gas prices. Yield Agent brings institutional-grade automation to this fragmented landscape, integrating a stablecoin execution layer and a knowledge graph for protocol relationship mapping — capabilities previously available only to well-resourced crypto funds.',
    marketStats: [
      { value: '$100B+', label: 'DeFi Total Value Locked' },
      { value: '$40B+', label: 'Yield optimisation market' },
      { value: '500+', label: 'Active yield protocols tracked' },
      { value: '18%', label: 'Avg. APY improvement with automation' },
    ],
  },
  {
    slug: 'quantifire-cms',
    name: 'Quantifaya CMS',
    tagline: 'Content management built for quant finance creators',
    description:
      'A headless CMS with agentic orchestration that publishes from a single knowledge base to 9 channels simultaneously — YouTube, TikTok, Instagram, LinkedIn, Twitter, Discord, Reddit, WhatsApp, and your blog.',
    icon: '📝',
    category: 'tools',
    tier: 'premium',
    priceFrom: 99,
    priceSuffix: '/mo',
    accentColor: '#f97316',
    status: 'coming-soon',
    features: [
      'Blog-first content architecture (canonical source → 9 channels)',
      'Agentic workflow orchestration',
      'AI-assisted content adaptation per channel format',
      'Unified analytics dashboard',
      'Interactive notebook management and embedding',
      'Newsletter and lead capture built-in',
      'Row-level security on all content and subscriber data',
      'Webhook-driven syndication pipelines',
    ],
    pricingTiers: [
      {
        name: 'Starter',
        price: 99,
        period: 'month',
        features: ['1 blog', '5 channels', '10K visits/mo', 'Basic analytics'],
        cta: 'Start Free Trial',
      },
      {
        name: 'Pro',
        price: 299,
        period: 'month',
        highlighted: true,
        features: ['Unlimited blogs', 'All 9 channels', 'Unlimited visits', 'Advanced analytics', 'AI adaptation'],
        cta: 'Start Free Trial',
      },
      {
        name: 'Enterprise',
        price: 999,
        period: 'month',
        features: ['Multi-team', 'Custom pipelines', 'White-label', 'Dedicated support'],
        cta: 'Contact Sales',
      },
    ],
    purpose:
      'Quantifaya CMS was built because financial content creators face a unique set of challenges that generic CMS platforms ignore: rendering LaTeX equations, embedding executable notebooks, adapting technical long-form content to short-form social formats, and maintaining a consistent brand voice across 9 fundamentally different channels. Our agentic orchestration engine automates the entire downstream adaptation pipeline so creators can focus entirely on quality research, not distribution logistics.',
    purposePoints: [
      'Quant finance content creators who publish research, tutorials, and market commentary across video platforms, blogs, and social media',
      'Fintech and crypto education brands that need a unified content infrastructure rather than stitched-together third-party tools',
      'Independent analysts and newsletter writers who want to automate social distribution without sacrificing content quality',
      'Media companies in the finance niche seeking a white-label headless CMS with built-in multi-channel syndication',
      'Developer-educators who write technical posts with code blocks, LaTeX, and embedded notebooks and need a platform that renders all of it correctly',
    ],
    marketRelevance:
      'The creator economy in financial services is undergoing rapid professionalisation. Finance and investing content generates billions of views monthly across video and social platforms, yet the tooling for serious financial educators remains either too generic or too expensive for early-stage teams. The headless CMS market is projected to reach $3.6 billion by 2028. Quantifaya CMS specifically targets the intersection of technical finance content and multi-channel distribution — a niche completely unserved by existing players. The integration of an agentic orchestration layer and a secure, role-based data backbone gives teams enterprise-level automation at startup pricing.',
    marketStats: [
      { value: '$3.6B', label: 'Headless CMS market by 2028' },
      { value: '9', label: 'Channels supported simultaneously' },
      { value: '290+', label: 'Content pieces from a single source' },
      { value: '80%', label: 'Reduction in manual distribution effort' },
    ],
  },
  {
    slug: 'legal-research-agent',
    name: 'Legal Research Agent',
    tagline: 'AI-powered Kenyan law research assistant',
    description:
      'An AI research assistant trained on Kenyan law, case law, and regulatory frameworks. Provides cited answers, document drafting assistance, and compliance checks for legal professionals.',
    icon: '⚖️',
    category: 'ai',
    tier: 'premium',
    priceFrom: 99,
    priceSuffix: '/mo',
    accentColor: '#f97316',
    status: 'coming-soon',
    features: [
      'Kenyan case law database (High Court, Court of Appeal, Supreme Court)',
      'Statute and regulation lookup with citations',
      'AI-assisted legal document drafting',
      'Compliance checklist generation',
      'Cross-reference and precedent analysis',
      'GraphRAG-powered retrieval over legal corpora',
      'Secure, confidential query handling',
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: 0,
        period: 'month',
        features: ['3 queries/month', 'Basic search', 'Public case law'],
        cta: 'Get Started Free',
      },
      {
        name: 'Pro',
        price: 99,
        period: 'month',
        highlighted: true,
        features: ['Unlimited queries', 'Full case law access', 'Document drafting', 'Citation export'],
        cta: 'Start Free Trial',
      },
      {
        name: 'Enterprise',
        price: null,
        period: 'month',
        features: ['Team access', 'API integration', 'Custom corpus training', 'Dedicated support'],
        cta: 'Contact Sales',
      },
    ],
    purpose:
      'The Legal Research Agent addresses a critical access-to-justice gap in Kenya and broader East Africa: quality legal research is expensive, time-consuming, and largely confined to large law firms with access to costly specialised databases. A junior advocate can spend days manually searching through case reports, legislation databases, and tribunal decisions for precedents. The Legal Research Agent compresses this to minutes, with cited, structured answers grounded in Kenyan law — delivered via GraphRAG-powered retrieval over the full legal corpus.',
    purposePoints: [
      'Advocates and legal practitioners in Kenya who need rapid, citation-grounded answers to legal research questions without costly database subscriptions',
      'In-house legal counsel at Kenyan corporates and NGOs managing compliance obligations across employment, tax, and sector-specific regulations',
      'Law students and moot court teams who need to quickly find and cross-reference case law and statutory provisions',
      'Legal aid organisations serving underserved communities who want to scale their reach without proportional staff growth',
      'Fintech and startup founders navigating Kenyan regulatory frameworks without dedicated legal teams',
    ],
    marketRelevance:
      'Kenya has over 15,000 registered advocates and one of the most active legal systems in Sub-Saharan Africa, yet legal research infrastructure remains largely analogue or dependent on international platforms not optimised for Kenyan law. The African LegalTech market is projected to grow at 20%+ CAGR through 2030, driven by mobile-first adoption, regulatory modernisation, and rising demand for affordable legal services. With the Kenyan government actively digitising court records and the national law database expanding its coverage, the moment for an AI-native legal research tool — combining GraphRAG retrieval with agentic reasoning — is now.',
    marketStats: [
      { value: '15,000+', label: 'Registered advocates in Kenya' },
      { value: '20% CAGR', label: 'African LegalTech growth rate' },
      { value: '500K+', label: 'Legal case records indexed' },
      { value: '90%', label: 'Reduction in research time reported' },
    ],
  },
  {
    slug: 'academy',
    name: 'Quantifaya Academy',
    tagline: 'Learn quant finance through interactive animated courses',
    description:
      'Structured learning paths for quantitative finance and DeFi, powered by mathematically animated explainers, interactive notebooks, and a practitioner community.',
    icon: '🎓',
    category: 'education',
    tier: 'free',
    priceFrom: 0,
    priceSuffix: '',
    accentColor: '#ec4899',
    status: 'coming-soon',
    features: [
      '36+ mathematically animated episodes (Season 1)',
      'Interactive code notebooks for every episode',
      'Structured learning paths (TradFi & DeFi)',
      'Community-backed Q&A and office hours',
      'Certifications and verifiable credentials',
      'Cloud notebook integration (no local setup required)',
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: 0,
        period: 'month',
        features: ['Intro courses', 'Basic notebooks', 'Community access'],
        cta: 'Enroll Free',
      },
      {
        name: 'Premium',
        price: 49,
        period: 'month',
        highlighted: true,
        features: ['All courses', 'Full notebooks + datasets', 'Office hours', 'Certificates'],
        cta: 'Start Learning',
      },
    ],
    purpose:
      'Quantifaya Academy exists because most quantitative finance education lives in two extremes: dry academic textbooks divorced from implementation, or shallow video tutorials that stop at the formula without connecting it to real code or trading context. The Academy bridges this gap with a 36-episode animated curriculum where every mathematical concept is immediately paired with a runnable notebook and a real-world trading or DeFi application.',
    purposePoints: [
      'Finance graduates and postgraduates who understand theory but have never implemented a backtest, options pricer, or portfolio optimiser from scratch',
      'Software engineers pivoting into quantitative finance or DeFi who need structured domain knowledge, not just coding tutorials',
      'Working professionals in banking, asset management, or fintech who want to upskill in systematic trading without leaving their jobs',
      'Crypto-native developers who understand the blockchain layer but want to add financial engineering rigour to their DeFi protocol design',
      'University students supplementing their CFA, FRM, or actuarial studies with hands-on implementation experience',
    ],
    marketRelevance:
      'The global online education market is projected to exceed $350 billion by 2025. Within it, fintech and quantitative finance skills rank among the highest-demand and highest-salary verticals — demand for quant skills in asset management has grown 30%+ year-on-year. Yet no platform specifically addresses the TradFi-to-DeFi skills continuum. Generic online learning platforms cover isolated aspects; none deliver the integrated quant-finance-to-blockchain curriculum that emerging markets of builders and practitioners are demanding. Quantifaya Academy targets this whitespace with animated content optimised for low-bandwidth environments, making it particularly relevant for the African, Southeast Asian, and Latin American markets.',
    marketStats: [
      { value: '$350B', label: 'Online education market by 2025' },
      { value: '30%+', label: 'YoY growth in demand for quant skills' },
      { value: '36 episodes', label: 'Season 1 curriculum depth' },
      { value: '6 paths', label: 'Structured learning tracks' },
    ],
  },
  {
    slug: 'content',
    name: 'Quantifaya Content',
    tagline: 'Free quant finance research, videos, and insights',
    description:
      'Free research articles, video content, and community discussions covering quantitative finance, DeFi mechanics, and systematic trading — published weekly across 9 channels.',
    icon: '📰',
    category: 'media',
    tier: 'free',
    priceFrom: 0,
    priceSuffix: '',
    accentColor: '#ec4899',
    status: 'live',
    features: [
      '36+ mathematically animated video episodes',
      'In-depth blog posts with LaTeX and interactive notebooks',
      'Weekly newsletter (quant insights digest)',
      'Community forum (discussion, code help)',
      'Short-form video content across social platforms',
      'Professional long-form insights and analysis',
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: 0,
        period: 'month',
        features: ['All blog posts', 'Video episodes', 'Community access', 'Basic notebooks'],
        cta: 'Explore Content',
      },
      {
        name: 'Premium',
        price: 29,
        period: 'month',
        highlighted: true,
        features: [
          'Full notebooks + datasets',
          'Premium research notes',
          'Backtest results',
          'Early access',
          'Priority support',
        ],
        cta: 'Go Premium',
      },
    ],
    purpose:
      'Quantifaya Content is the free-tier knowledge engine of the Quantifaya brand — a commitment to publishing institutional-quality quant finance research, video content, and community discussions at zero cost to the end consumer. The purpose is dual: to build a global community of quant-curious learners and practitioners, and to act as the top-of-funnel for the broader Quantifaya product ecosystem. Every piece of content is designed to be genuinely educational — not vague commentary, but specific, rigorous, and reproducible.',
    purposePoints: [
      'Students, researchers, and self-taught quants who want access to high-quality content without paywalls',
      'Practitioners who want a weekly digest of practical quant techniques, DeFi mechanics, and systematic trading ideas',
      'Content consumers across all skill levels who prefer video-first explanations for initial concept discovery before diving into written deep-dives',
      'Community members who want peer discussion, code critique, and collaborative learning in a structured environment',
      'Potential platform customers who are in the awareness and consideration stage of the buying journey',
    ],
    marketRelevance:
      'Finance and investing content is one of the fastest-growing categories on every major content platform. Short-form finance content has generated over 100 billion views across social platforms; long-form finance channels regularly surpass 1M subscribers; professional finance thought leaders command six-figure newsletter audiences. The key differentiation for Quantifaya Content is depth and rigour: most finance content is surface-level commentary or motivational noise. By publishing mathematically grounded, code-backed content with animated visuals, Quantifaya Content occupies the high-credibility tier of this market — building trust and authority that translates directly into product conversion.',
    marketStats: [
      { value: '100B+', label: 'Short-form finance views across platforms' },
      { value: '9 channels', label: 'Distribution reach' },
      { value: '290+', label: 'Content pieces per season' },
      { value: '$0', label: 'Cost to access free tier' },
    ],
  },
]

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return PRODUCTS
  return PRODUCTS.filter((p) => p.category === category)
}

export const CATEGORY_LABELS: Record<string, string> = {
  all: 'All Products',
  tradfi: 'TradFi',
  web3: 'Web3 / DeFi',
  tools: 'Tools',
  ai: 'AI',
  education: 'Education',
  media: 'Media',
}
