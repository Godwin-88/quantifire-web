import type { Product } from '@/types'

/**
 * QuantiFire Service Offerings
 * 
 * These are the 5 core service areas offered by the agency.
 * Each entry follows the Product type shape so it can use the
 * same DualFunnelTabs component for consistent presentation.
 * 
 * Funnel: services
 * CTA: "Book a Discovery Call" → Calendly
 */

export const SERVICES: Product[] = [
  {
    slug: 'quantitative-research',
    name: 'Quantitative Research',
    tagline: 'Rigorous statistical models that transform data into competitive advantage',
    description:
      'Custom quantitative research engines — from Monte Carlo simulations to factor models and time-series forecasting. Built for finance, energy, and logistics sectors. Every model is validated against historical data, stress-tested for edge cases, and delivered with full documentation.',
    icon: '📐',
    category: 'tradfi',
    tier: 'premium',
    priceFrom: null,
    priceSuffix: '',
    accentColor: '#6366f1',
    status: 'live',
    features: [
      'Monte Carlo Simulation & Stochastic Modelling',
      'Factor Model Construction (CAPM, Fama-French, PCA)',
      'Time-Series Forecasting (ARIMA, GARCH, Prophet)',
      'Risk Decomposition & Stress Testing',
      'Backtesting Frameworks with Walk-Forward Validation',
      'Custom Research Reports with Reproducible Code',
    ],
    pricingTiers: [],
    purpose:
      'Most organisations have data but lack the statistical rigour to extract defensible insights. We build quantitative research engines that turn raw data into decision-grade intelligence — with full reproducibility and audit trails.',
    purposePoints: [
      'Investment firms needing factor-based portfolio construction and risk decomposition',
      'Energy and logistics companies forecasting demand, pricing, and exposure',
      'Fintech startups building credit scoring, fraud detection, or pricing algorithms',
      'Research teams that need production-grade statistical infrastructure',
    ],
    marketRelevance:
      'The demand for quantitative research talent far exceeds supply. Organisations that cannot hire full-time PhDs still need rigorous statistical work. We bridge that gap — delivering research-grade methodology with engineering-grade production quality.',
    marketStats: [
      { value: '5+', label: 'Years quant research experience' },
      { value: 'Python', label: 'Primary research language' },
      { value: 'GARCH', label: 'Core time-series methodology' },
      { value: 'Live', label: 'Models in production today' },
    ],
    techStack: ['Python', 'NumPy/SciPy', 'Statsmodels', 'PyTorch', 'PostgreSQL', 'Docker', 'Jupyter', 'Git'],
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    tagline: 'Fast, accessible, and scalable web applications — built with modern frameworks',
    description:
      'Full-stack web applications built with Next.js, React, and Tailwind CSS. From marketing sites to complex SaaS platforms — every project is performance-optimised, accessibility-audited, and deployment-ready.',
    icon: '🌐',
    category: 'tools',
    tier: 'premium',
    priceFrom: null,
    priceSuffix: '',
    accentColor: '#0ea5e9',
    status: 'live',
    features: [
      'Next.js 16 + React 19 — App Router, Server Components, Streaming',
      'TypeScript throughout — strict mode, full type safety',
      'Tailwind CSS — responsive, dark-mode, custom design systems',
      'CMS Integration — Supabase, Sanity, or custom headless CMS',
      'Performance Optimised — Lighthouse 95+, Core Web Vitals',
      'Accessibility — WCAG 2.1 AA, screen-reader tested',
    ],
    pricingTiers: [],
    purpose:
      'A website is never just a website. It is a sales funnel, a documentation hub, a product demo, and a credibility signal — all at once. We build web applications that serve all these functions without compromising on any of them.',
    purposePoints: [
      'Startups needing a production-grade web presence before Series A',
      'SaaS companies migrating from legacy frameworks to modern stacks',
      'Agencies and consultancies that need a portfolio that converts',
      'Enterprise teams building internal tools with consumer-grade UX',
    ],
    marketRelevance:
      'The gap between "it works" and "it ships" has never been wider. Modern web development requires expertise across rendering strategies, data fetching, auth, payments, and deployment — all while maintaining performance and accessibility. We handle the full stack.',
    marketStats: [
      { value: '27+', label: 'Websites and apps built' },
      { value: 'Next.js', label: 'Primary framework' },
      { value: 'Lighthouse', label: '95+ target score' },
      { value: 'Live', label: 'Production deployments' },
    ],
    techStack: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Docker', 'Vercel'],
  },
  {
    slug: 'process-automation',
    name: 'Process Automation',
    tagline: 'Eliminate manual work with intelligent, resilient automation',
    description:
      'Workflow automation using n8n, Make, and custom Python scripts. From data pipelines to multi-step approval flows — we design automations that handle errors, notify stakeholders, and log every step for audit.',
    icon: '⚡',
    category: 'automation',
    tier: 'premium',
    priceFrom: null,
    priceSuffix: '',
    accentColor: '#10b981',
    status: 'live',
    features: [
      'n8n & Make Workflow Design — visual automation with error handling',
      'Custom Python Scripts — for logic that visual tools cannot express',
      'API Orchestration — connecting 10+ services in a single workflow',
      'Error Handling & Retries — exponential backoff, dead-letter queues',
      'Monitoring Dashboards — real-time workflow status and alerting',
      'Documentation — every automation ships with runbooks',
    ],
    pricingTiers: [],
    purpose:
      'Manual processes are the single largest drag on organisational efficiency. We identify the highest-ROI automation opportunities and build resilient workflows that run without supervision.',
    purposePoints: [
      'Operations teams drowning in manual data entry and report generation',
      'Finance departments running weekly reconciliations that could run hourly',
      'HR teams managing onboarding workflows across multiple systems',
      'Any team spending more than 5 hours/week on a repeatable digital process',
    ],
    marketRelevance:
      'The automation market is exploding, but most tools are sold as "no-code" solutions that still require significant technical expertise to configure correctly. We provide that expertise — designing automations that are robust, monitored, and documented.',
    marketStats: [
      { value: '60+', label: 'Automations deployed' },
      { value: 'n8n', label: 'Primary automation engine' },
      { value: '99.9%', label: 'Target uptime' },
      { value: 'Live', label: 'Running in production' },
    ],
    techStack: ['n8n', 'Make', 'Python', 'Docker', 'PostgreSQL', 'Redis', 'Prometheus', 'Grafana'],
  },
  {
    slug: 'data-engineering',
    name: 'Data Engineering',
    tagline: 'Robust pipelines that turn raw data into structured, queryable assets',
    description:
      'ETL/ELT pipelines, data warehousing, and real-time streaming infrastructure. Built on PostgreSQL, dbt, and cloud-native infrastructure — with data quality monitoring built into every pipeline.',
    icon: '🔗',
    category: 'tools',
    tier: 'premium',
    priceFrom: null,
    priceSuffix: '',
    accentColor: '#f59e0b',
    status: 'live',
    features: [
      'ETL/ELT Pipeline Design — batch and streaming architectures',
      'dbt Transformations — version-controlled, tested data models',
      'PostgreSQL & BigQuery — schema design, indexing, partitioning',
      'Real-time Streaming — Kafka, NATS, or custom WebSocket pipelines',
      'Data Quality Monitoring — schema validation, anomaly detection',
      'Infrastructure as Code — Terraform for repeatable deployments',
    ],
    pricingTiers: [],
    purpose:
      'Data is only valuable when it is accessible, reliable, and timely. We build the infrastructure that turns messy source data into structured assets — with the observability and documentation that data teams need to trust their sources.',
    purposePoints: [
      'Companies migrating from spreadsheets to structured data warehouses',
      'Data teams that need production-grade pipeline infrastructure',
      'Organisations struggling with data quality and inconsistent schemas',
      'Startups that need to build data infrastructure that scales from day one',
    ],
    marketRelevance:
      'Every organisation is a data organisation — but most are drowning in unmanaged data. The difference between a data-driven company and one that merely collects data is the quality of its engineering infrastructure. We build that infrastructure.',
    marketStats: [
      { value: '40+', label: 'Data pipelines built' },
      { value: 'dbt', label: 'Transformation framework' },
      { value: 'PostgreSQL', label: 'Primary warehouse' },
      { value: 'Live', label: 'Production pipelines' },
    ],
    techStack: ['Python', 'dbt', 'PostgreSQL', 'BigQuery', 'Kafka', 'Docker', 'Terraform', 'Grafana'],
  },
  {
    slug: 'data-analytics',
    name: 'Data Analytics',
    tagline: 'Actionable insights powered by statistical rigour and clear visualisation',
    description:
      'Exploratory analysis, statistical modelling, and dashboard design that drives decisions. Python, R, and BI tool expertise — delivered with the context and narrative that makes data actionable.',
    icon: '📊',
    category: 'education',
    tier: 'premium',
    priceFrom: null,
    priceSuffix: '',
    accentColor: '#ec4899',
    status: 'live',
    features: [
      'Statistical Modelling — regression, classification, clustering',
      'Python & R Analysis — reproducible research workflows',
      'Dashboard Design — Plotly Dash, Streamlit, Metabase, Superset',
      'A/B Testing Framework — design, power analysis, interpretation',
      'Predictive Analytics — forecasting, anomaly detection, segmentation',
      'Executive Summaries — insights translated for non-technical stakeholders',
    ],
    pricingTiers: [],
    purpose:
      'Dashboards are not insights. We provide the analytical rigour that turns data into decisions — with statistical methodology that prevents false conclusions and visualisation that communicates clearly.',
    purposePoints: [
      'Leadership teams that need data-driven strategy recommendations',
      'Product teams running experiments and needing rigorous analysis',
      'Marketing teams measuring campaign effectiveness beyond surface metrics',
      'Operations teams identifying efficiency opportunities through data',
    ],
    marketRelevance:
      'The volume of data available to organisations has exploded, but the capacity to analyse it rigorously has not kept pace. We provide the analytical horsepower — from statistical methodology to executive communication.',
    marketStats: [
      { value: 'Python', label: 'Primary analysis language' },
      { value: 'R', label: 'Statistical computing' },
      { value: 'BI', label: 'Multi-platform expertise' },
      { value: 'Live', label: 'Dashboards in production' },
    ],
    techStack: ['Python', 'R', 'Pandas', 'Plotly', 'Streamlit', 'Metabase', 'PostgreSQL', 'Jupyter'],
  },
]

export function getService(slug: string): Product | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

export function getServices(): Product[] {
  return SERVICES
}