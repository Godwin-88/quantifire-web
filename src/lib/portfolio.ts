import type { Product } from '@/types'

/**
 * QuantiFire Portfolio — Shipped Projects
 * 
 * These are real production systems that exist and run today.
 * Each entry follows the Product type shape so it can use the
 * same DualFunnelTabs component for consistent presentation.
 * 
 * Funnel: services
 * CTA: "Book a Discovery Call" → Calendly
 */

export const PORTFOLIO: Product[] = [
  {
    slug: 'clinicalmatch',
    name: 'ClinicalMatch AI',
    tagline: 'Precision clinical trial matching powered by FHIR R4 and GraphRAG',
    description:
      'A full-stack AI agent that matches patients to recruiting clinical trials using a Neo4j knowledge graph, real-time ClinicalTrials.gov data, and FHIR R4 patient profiles. Built for the "Agents Assemble: Healthcare AI Endgame Challenge" and deployed live on HuggingFace Spaces.',
    icon: '🧬',
    category: 'healthtech',
    tier: 'free',
    priceFrom: 0,
    priceSuffix: '',
    accentColor: '#6366f1',
    status: 'in-development',
    demoUrl: 'https://huggingface.co/spaces/TheQuantEd/clinicalmatch',
    techStack: ['FastAPI', 'Next.js 16', 'Neo4j', 'GraphRAG', 'FHIR R4', 'A2A', 'MCP', 'Docker', 'Nginx', 'Python'],
    features: [
      'FHIR R4 patient ingestion — SMART on FHIR & synthetic profiles',
      'Neo4j knowledge graph: 500 patients · 250+ trials · 9,100+ ELIGIBLE_FOR edges',
      'GraphRAG natural language queries over the clinical graph',
      'A2A 5-state orchestration pipeline (INGEST → PARSE → MATCH → SCORE → RECRUIT)',
      'MCP server with 6 callable tools for AI agent integration',
      'Recruitment Hub: Kanban board tracking patients from IDENTIFIED → ENROLLED',
      'Personalized AI outreach generation (PCP letter, patient email, social post)',
      'Real-time ClinicalTrials.gov v2 integration — NCT data auto-ingested into graph',
      'Deployed: Docker multi-stage build, Nginx reverse proxy, Supervisord, HuggingFace Spaces',
    ],
    pricingTiers: [],
    purpose:
      '80% of clinical trials fail to meet enrollment deadlines. 85% of eligible patients are never identified. ClinicalMatch AI directly addresses that gap — connecting patients to trials using structured clinical eligibility scoring over a live knowledge graph.',
    purposePoints: [
      'Clinical trial coordinators who need to identify eligible patients without manual chart review',
      'Oncology research teams running multiple concurrent trials with overlapping eligibility criteria',
      'Patients seeking relevant trials for their diagnosis who lack access to specialist research networks',
      'Healthcare AI researchers exploring FHIR-native agent architectures and MCP integration patterns',
    ],
    marketRelevance:
      'Clinical trial recruitment failure costs the pharmaceutical industry an estimated $8B annually. The intersection of FHIR R4 standardisation, graph-based eligibility reasoning, and LLM-powered agent orchestration represents the current frontier of healthcare AI infrastructure.',
    marketStats: [
      { value: '500', label: 'Synthetic patient profiles in graph' },
      { value: '250+', label: 'NCT trials indexed' },
      { value: '9,100+', label: 'ELIGIBLE_FOR graph edges' },
      { value: '6', label: 'MCP tools for AI agent integration' },
    ],
  },
  {
    slug: 'afripay',
    name: 'Afripay',
    tagline: 'Cross-border remittance and digital payments on the Stellar Network',
    description:
      'A production cross-border payments platform settling across multiple African currencies via the Stellar Network. Full-stack: FastAPI backend with a double-entry immutable ledger, React 19 admin workspace, Flutter mobile app, and 3-tier KYC/AML via Onfido. Built at Zamadi Group.',
    icon: '💸',
    category: 'fintech',
    tier: 'premium',
    priceFrom: null,
    priceSuffix: '',
    accentColor: '#22c55e',
    status: 'live',
    techStack: ['FastAPI', 'React 19', 'Flutter', 'Stellar Network', 'PostgreSQL', 'Redis', 'Onfido', 'Docker', 'Nginx', 'Python'],
    features: [
      'Stellar Network settlement — FIAT-to-USDT across multiple African currency corridors',
      'Double-entry immutable ledger with cryptographic audit trail',
      'JWT + refresh-token auth with Nginx rate limiting',
      '3-tier KYC/AML verification via Onfido integration',
      'React 19 admin workspace — transaction monitoring, compliance dashboard',
      'Flutter mobile app with Riverpod state management (iOS + Android)',
      'Diaspora remittance corridors — East African cross-border focus',
      'Real-time settlement status tracking and notification system',
    ],
    pricingTiers: [],
    purpose:
      'Cross-border remittances to Sub-Saharan Africa cost an average 8% per transaction. Afripay uses the Stellar Network to reduce settlement costs and time while maintaining full KYC/AML compliance — making borderless money movement accessible across African currency corridors.',
    purposePoints: [
      'Diaspora communities sending remittances home to East Africa',
      'Businesses making cross-border supplier payments across African markets',
      'Fintech teams needing a compliant, auditable ledger foundation',
    ],
    marketRelevance:
      'Africa receives over $100B in remittances annually, with fees averaging 8%+ — the highest globally. Stellar-based settlement reduces this dramatically while providing near-instant finality. The Afripay architecture demonstrates that institutional-grade payment infrastructure can be built natively for African markets.',
    marketStats: [
      { value: '$100B+', label: 'Annual Africa remittance volume' },
      { value: '8%', label: 'Avg. industry remittance fee' },
      { value: '3-tier', label: 'KYC/AML verification depth' },
      { value: 'Live', label: 'Production deployment' },
    ],
  },
  {
    slug: 'jobhunter',
    name: 'Job Hunter KE',
    tagline: 'AI-powered job application automation for the Kenyan market',
    description:
      'A full-stack SaaS that scrapes Kenyan and global remote job boards, generates tailored CVs and cover letters with AI, routes them through a React dashboard for review, and dispatches approved applications. Runs on Flask + n8n + SQLite with Supabase auth.',
    icon: '🎯',
    category: 'automation',
    tier: 'free',
    priceFrom: 0,
    priceSuffix: '',
    accentColor: '#f59e0b',
    status: 'in-development',
    demoUrl: 'https://jobappagent.vercel.app/',
    techStack: ['Flask', 'React 18', 'n8n', 'SQLite', 'Supabase', 'Groq', 'Docker', 'Python', 'TypeScript'],
    features: [
      '14 job board scrapers — LinkedIn, BrighterMonday, Fuzu, RemoteOK, Himalayas, WeWorkRemotely + specialist quant boards',
      'AI document generation — tailored CV + cover letter per job via Groq / OpenRouter',
      'n8n workflow orchestration — scrape → generate → email → dispatch pipeline',
      'React dashboard with sortable job table, status tracking, and document preview',
      'Employer reply inbox with AI-powered response drafting',
      'Supabase auth with Google OAuth and magic link',
      'Background task runner with ThreadPoolExecutor and SQLite task log',
      'Scholarship scraper module running in parallel with job pipeline',
    ],
    pricingTiers: [],
    purpose:
      'Job hunting at scale in Kenya requires monitoring 10+ job boards simultaneously and customising applications for each role. Job Hunter KE automates the entire pipeline — from discovery to tailored document generation to dispatch — leaving only the review step to the human.',
    purposePoints: [
      'Engineers applying to multiple roles who need tailored documents without writing each from scratch',
      'Kenyan job seekers targeting both local and international remote opportunities',
      'Anyone who wants a data-driven view of their application pipeline',
    ],
    marketRelevance:
      "Kenya's tech talent market is expanding rapidly, with increasing remote-first hiring by international companies. A system that bridges Kenyan local boards and global remote job sites — while generating AI-tailored documents — directly addresses the asymmetry between job volume and application bandwidth.",
    marketStats: [
      { value: '14', label: 'Job board scrapers integrated' },
      { value: '3', label: 'AI providers supported' },
      { value: '5', label: 'n8n workflow automations' },
      { value: 'Live', label: 'Running in production daily' },
    ],
  },
  {
    slug: 'graphalpha',
    name: 'GraphAlpha',
    tagline: 'Autonomous multi-agent trading system with knowledge graph signal generation',
    description:
      'A multi-agent autonomous trading system combining a Neo4j/Memgraph knowledge graph for signal generation with 8 specialised sub-agents — regime classification, news sentiment, macro calendar, derivatives pricing, risk management, and execution routing to IBKR and Kraken.',
    icon: '📈',
    category: 'tradfi',
    tier: 'premium',
    priceFrom: null,
    priceSuffix: '',
    accentColor: '#3b82f6',
    status: 'in-development',
    techStack: ['Python', 'Neo4j', 'Memgraph', 'Redis', 'PostgreSQL', 'Prometheus', 'GARCH', 'IBKR API', 'Kraken API', 'Docker'],
    features: [
      '8 specialised sub-agents: Regime · Signal · News · MacroCalendar · KGSignal · KGDerivatives · Risk · Execution',
      'Knowledge graph formula evaluation — KG nodes encode trading signals evaluated per tick',
      'GARCH volatility modelling + VARLiNGAM causal discovery (pgmpy, lingam)',
      'Options pricing engine: Black-Scholes, Heston SV, FFT, live Greeks',
      'Dual execution: IBKR TWS (equity + options) and Kraken (crypto perps)',
      'Redis inter-agent messaging bus with async orchestration loop (5-min ticks)',
      'Prometheus metrics: PnL gauge, drawdown gauge, signal count, loop counter',
      'Hard risk limits: max drawdown halt, position sizing via RiskAgent',
      'Paper trading mode with full audit trail before live deployment',
    ],
    pricingTiers: [],
    purpose:
      'GraphAlpha encodes market relationships as a knowledge graph — allowing signal logic to traverse concept relationships rather than evaluating flat indicator crossovers. The knowledge graph is the brain; the sub-agents are the hands.',
    purposePoints: [
      'Quantitative researchers exploring graph-native signal generation architectures',
      'Systematic traders who want risk-gated autonomous execution across equity, options, and crypto',
      'ML engineers building causal inference pipelines for financial time series',
    ],
    marketRelevance:
      "Most systematic trading systems evaluate signals independently. GraphAlpha's graph-based approach contextualises signals via macro regime nodes, earnings event nodes, and sector relationship edges — producing signals that encode market structure rather than just price history.",
    marketStats: [
      { value: '8', label: 'Autonomous sub-agents' },
      { value: '2', label: 'Execution venues (IBKR + Kraken)' },
      { value: 'GARCH', label: 'Volatility model' },
      { value: 'Paper', label: 'Current trading mode' },
    ],
  },
  {
    slug: 'agentic-erp',
    name: 'Agentic ERP',
    tagline: 'AI-native enterprise resource planning in Go with 27 MCP tools',
    description:
      'A full-stack, AI-native ERP platform where every module is driven by a provider-agnostic LLM layer. Users describe intent in natural language; the AI selects the right ERP tool and drafts actions for human approval before any write occurs. Ships as both a web app and a native desktop app (Wails v3).',
    icon: '⚙️',
    category: 'tools',
    tier: 'premium',
    priceFrom: null,
    priceSuffix: '',
    accentColor: '#ec4899',
    status: 'in-development',
    demoUrl: 'https://erp-web-chi-silk.vercel.app/',
    techStack: ['Go', 'ConnectRPC', 'NATS JetStream', 'Temporal', 'Keycloak', 'Next.js 15', 'Wails v3', 'PostgreSQL', 'ClickHouse', 'Terraform'],
    features: [
      '6 ERP modules: Financial (GL/AP/AR) · HR · CRM · Supply Chain · Project Mgmt · AI Agent',
      '27 MCP tools in the registry — full ERP function-calling surface for LLMs',
      'Provider-agnostic LLM client — Groq default, OpenAI-compat, Anthropic, Ollama',
      'ConnectRPC inter-service communication with Protobuf definitions',
      'NATS JetStream event bus for domain events + IoT leaf nodes',
      'Temporal for crash-safe long-running workflow orchestration',
      'Keycloak OIDC + Casbin RBAC/ABAC for enterprise auth',
      'Clean Architecture across all services (domain → application → infrastructure → interfaces)',
      'Dual deployment: Next.js 15 web app + Wails v3 desktop app (same frontend)',
      'GCP Terraform infra + Kubernetes Helm charts per service',
    ],
    pricingTiers: [],
    purpose:
      'Traditional ERP systems are form-driven. Agentic ERP replaces that model with an agent loop: the AI understands intent, selects the appropriate tool from a 27-tool MCP registry, and presents a draft action for human approval before any write occurs.',
    purposePoints: [
      'SMEs that need enterprise-grade workflow automation without enterprise-grade complexity',
      'Organisations with non-technical staff who struggle with traditional ERP navigation',
      'Developers exploring agentic architectures for domain-specific tool-calling systems',
      'Companies requiring both web and native desktop deployment from a single codebase',
    ],
    marketRelevance:
      'The global ERP market exceeds $50B. The intersection of LLM tool-calling and enterprise workflow automation represents a genuine architectural shift — not AI bolted onto legacy CRUD, but a system where the agent loop is the primary interaction model. Built in Go for the performance and correctness guarantees that financial and HR data demands.',
    marketStats: [
      { value: '27', label: 'MCP tools in registry' },
      { value: '6', label: 'ERP service modules' },
      { value: '2', label: 'Deployment targets (web + desktop)' },
      { value: 'Go', label: 'Core language' },
    ],
  },
  {
    slug: 'amd-ea-optimizer',
    name: 'AMD EA Strategy Optimizer',
    tagline: 'Enterprise Architecture intelligence powered by AMD MI300X, GraphRAG, and DRL',
    description:
      'An AI-native Enterprise Architecture platform built for the AMD Developer Hackathon 2026. Transforms business goals into governance-grounded, Jira-ready strategic roadmaps using a 1,416-capability Neo4j knowledge graph, Deep Reinforcement Learning prioritisation, and a self-correcting LangGraph agentic pipeline — all served from AMD Instinct MI300X via vLLM.',
    icon: '⚡',
    category: 'ai',
    tier: 'free',
    priceFrom: 0,
    priceSuffix: '',
    accentColor: '#ef4444',
    status: 'live',
    liveUrl: 'https://huggingface.co/spaces/TheQuantEd/amd-ea-optimizer',
    techStack: ['FastAPI', 'Streamlit', 'Neo4j', 'LangGraph', 'vLLM', 'Qwen2.5-72B', 'DRL/MLP', 'Docker', 'AMD MI300X', 'Python'],
    features: [
      'Neo4j knowledge graph: 44 domains · 248 subdomains · 1,416 capabilities · 200+ trends',
      'LangGraph 4-node agentic pipeline: Retrieve → Optimize → Generate → Verify (self-correcting)',
      'Deep Reinforcement Learning prioritisation — MLP trained on governance reward signals',
      'AMD Instinct MI300X inference: Qwen2.5-72B at fp16, 192 GB HBM3, SSE streaming',
      'Strategic Roadmap generator: questionnaire → Epics → Features → User Stories → Tasks',
      'Live Jira REST API v3 export + ServiceNow / Azure DevOps integration',
      'Graph Explorer: interactive force-directed network of 44 EA domains',
      'Chat session persistence backed by Neo4j — full conversation memory per project',
      'Export handover: JSON / Markdown / CSV of complete roadmaps',
    ],
    pricingTiers: [],
    purpose:
      'Enterprise architecture planning is time-consuming and expertise-scarce. This platform encodes 1,416 industry capabilities in a knowledge graph, uses DRL to prioritise gaps against business goals, and generates governance-grounded roadmaps that plug directly into Jira — collapsing weeks of EA consulting into minutes.',
    purposePoints: [
      'CTOs and enterprise architects mapping capability gaps against strategic objectives',
      'Engineering leaders who need structured roadmaps with governance acceptance criteria',
      'AI researchers exploring graph-RAG + DRL hybrid architectures for domain-specific reasoning',
      'Organisations running on Jira, ServiceNow, or Azure DevOps who need AI-generated epics',
    ],
    marketRelevance:
      'Enterprise Architecture consulting commands $300–$500/hr. The intersection of knowledge graph retrieval, DRL-based prioritisation, and LLM generation represents a new class of AI system — not a chatbot over documents, but a structured reasoning engine over a formal capability taxonomy. Built on AMD MI300X to demonstrate that open-weight models at 72B parameters can match proprietary API quality at scale.',
    marketStats: [
      { value: '1,416', label: 'EA capabilities in knowledge graph' },
      { value: '44', label: 'Enterprise domains modelled' },
      { value: 'MI300X', label: 'AMD GPU (192 GB HBM3)' },
      { value: 'Jira', label: 'Live export integration' },
    ],
  },
  {
    slug: 'lex-kenya',
    name: 'Lex Kenya',
    tagline: 'Constitutionally-anchored GraphRAG intelligence over Kenyan corporate and statutory law',
    description:
      'A proprietary GraphRAG legal intelligence platform built over a Neo4j knowledge graph of Kenyan law — the Constitution of Kenya 2010, 19 Acts, 997 court judgments, and 28 legal concepts. Every answer is traceable to its constitutional authority chain via graph traversal. Targets corporate lawyers, in-house counsel, compliance officers, and legal researchers operating in the Kenyan jurisdiction.',
    icon: '⚖️',
    category: 'ai',
    tier: 'premium',
    priceFrom: null,
    priceSuffix: '',
    accentColor: '#0ea5e9',
    status: 'in-development',
    demoUrl: 'https://app-bnmkj1cjrzlt.appmedo.com/',
    techStack: ['FastAPI', 'React 18', 'Vite', 'Neo4j', 'GraphRAG', 'BGE-M3', 'Groq', 'Mistral-7B', 'QLoRA', 'Python'],
    features: [
      'Neo4j knowledge graph: 4,862 nodes · 8,417 edges — Constitution, 19 Acts, 997 judgments',
      'Constitutional authority chain: every section traceable to its Article via DERIVES_AUTHORITY_FROM',
      'GraphRAG Q&A — Cypher traversal + BGE-M3 semantic retrieval, answers cite specific legal sources',
      'Compliance Checker — input a business action, get relevant statutory constraints with constitutional basis',
      'Ruling Predictor — precedent analysis across 997 judgments from 5 superior courts',
      'QLoRA fine-tuned Mistral-7B on 700 Kenyan law QA pairs (Unsloth + TRL)',
      'Case law scraper — kenyalaw.org with court-specific pagination logic',
      'Graph Admin panel — live stats, scraper controls, node/relationship counts',
      '28 legal concepts modelled (Rule of Law, Transfer Pricing, etc.) with constitutional grounding',
    ],
    pricingTiers: [],
    purpose:
      'Kenyan legal research is fragmented across statute books, gazette notices, and case law databases that do not speak to each other. Lex Kenya connects them — grounding every Act in its constitutional authority and linking case law to the statutes cited — so queries return structured, traceable answers rather than keyword matches.',
    purposePoints: [
      'Corporate lawyers and in-house counsel researching Kenyan compliance obligations',
      'Financial engineers and CFOs navigating the Income Tax Act, Capital Markets Act, and Companies Act',
      'Legal researchers mapping constitutional derivation of regulatory frameworks',
      'Law students building understanding of how Acts relate to the Constitution',
    ],
    marketRelevance:
      "Kenya's legal technology market is early-stage despite a large and active legal profession. The intersection of constitutional graph modelling, GraphRAG retrieval, and fine-tuned LLMs represents a qualitatively different capability from search-based legal tools — answers that cite both the statutory provision and its constitutional basis are uniquely defensible in professional practice.",
    marketStats: [
      { value: '4,862', label: 'Knowledge graph nodes' },
      { value: '8,417', label: 'Graph relationships' },
      { value: '997', label: 'Court judgments indexed' },
      { value: '19', label: 'Acts + Constitution ingested' },
    ],
  },
]

export function getPortfolioItem(slug: string): Product | undefined {
  return PORTFOLIO.find((p) => p.slug === slug)
}

export function getPortfolio(): Product[] {
  return PORTFOLIO
}