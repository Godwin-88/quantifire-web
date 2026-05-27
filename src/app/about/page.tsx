import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Godwin Edgar Opuka',
  description: 'Full-Stack Developer, Solutions Architect, and AI/ML Engineer based in Nairobi, Kenya. Building production AI agents, enterprise platforms, and quant finance systems.',
}

const EXPERIENCE = [
  {
    title: 'Full-Stack Developer',
    company: 'Zamadi Group',
    dates: 'Dec 2025 – Present',
    bullets: [
      'Lead engineer on  Zamadi\'s flagship borderless remittance platform using the Stellar Network for settlement across multiple African currencies',
      'Engineered full-stack architecture: FastAPI backend, double-entry immutable ledger, JWT auth, Nginx rate limiting, React 19 admin workspace, and Flutter mobile app',
      'Integrated Onfido for 3-tier KYC/AML verification and built the FIAT-to-USDT settlement engine',
      'Built and deployed the NYS Virtual Campus — a full LMS for the National Youth Service Kenya (React 18, Node.js, PostgreSQL)',
      'Own all DevOps: CI/CD pipelines, Docker containerisation, and infrastructure across all Zamadi Group products',
      'Designed and Deployed Double entry ledger system '
    ],
  },
  {
    title: 'Solutions Architect & BI Lead',
    company: 'DigitalQatalyst (Contract)',
    dates: 'Jun – Feb 2026',
    bullets: [
      'Architected the Twin Graph Manager — a graph-powered digital business platform using Neo4j and graph data science',
      'Designed full-stack platform with Neo4j backend, GraphQL/REST API layer, and MACH-aligned React frontend',
      'Directed AI agent deployment for business process automation and enterprise architecture modeling via Ardoq',
      'Promoted from Full-Stack Data Developer to Solutions Architect within 3 months',
    ],
  },
  {
    title: 'Full-Stack Data Developer / AI-ML Engineer',
    company: 'DigitalQatalyst (Contract)',
    dates: 'Jun – Sep 2025',
    bullets: [
      'Engineered end-to-end data pipelines using Python, R, Spark, and Microsoft Fabric',
      'Developed and deployed ML-powered services with REST and GraphQL endpoints',
      'Built CI/CD pipelines for data, ML, and application workloads on Azure DevOps',
    ],
  },
  {
    title: 'Quantitative Research Analyst',
    company: 'Freelance',
    dates: 'Apr 2021 – May 2025',
    bullets: [
      'Delivered quantitative and qualitative analytical solutions across finance and business domains',
      'Conducted financial statement analysis and hypothesis testing using robust statistical methods',
      'Built interactive dashboards and reports to drive data-informed decision-making',
      'Research WriteUps following Rsearch Methodology Format',
      'Quantitative Hypotheses Testing'
    ],
  },
]

const EDUCATION = [
  {
    degree: 'MSc Financial Engineering',
    institution: 'WorldQuant University',
    year: 'In Progress — Expected JUly 2026',
    notes: 'Stochastic Modeling, Derivative Pricing, ML in Finance, Deep Learning for Finance, Financial Econometrics. Capstone: GraphAlpha autonomous trading agent.',
  },
  {
    degree: 'BSc Financial Engineering',
    institution: 'Jomo Kenyatta University of Agriculture and Technology (JKUAT)',
    year: 'Completed Dec 2021',
    notes: 'Stochastic Calculus, Derivative Pricing, Game Theory, Statistical Inference, Numerical Methods.',
  },
]

const ACHIEVEMENTS = [
  'Built and deployed Afripay — a live Stellar-powered cross-border payment platform serving multiple African currencies',
  'AMD Developer Hackathon 2026 entrant: EA Strategy Optimizer running Qwen2.5-72B on AMD MI300X with a 1,416-capability Neo4j knowledge graph and deep reinforcement learning prioritisation',
  'Promoted from Full-Stack Data Developer to Solutions Architect & BI Lead at DigitalQatalyst within 3 months',
  'WQU MScFE capstone: GraphAlpha — autonomous trading agent grounded in a 324-concept financial knowledge graph',
  'Sole engineer for all Zamadi Group DevOps, infrastructure, and platform delivery',
]

const SKILLS = [
  { label: 'Languages', items: ['Python', 'Go', 'TypeScript', 'Rust', 'SQL', 'R'] },
  { label: 'Frontend', items: ['React 18/19', 'Next.js 15', 'Flutter', 'Tailwind CSS'] },
  { label: 'Backend & APIs', items: ['FastAPI', 'Flask', 'Node.js', 'GraphQL', 'gRPC', 'ConnectRPC'] },
  { label: 'Databases', items: ['PostgreSQL', 'Redis', 'Neo4j', 'Memgraph', 'SQLite'] },
  { label: 'AI / ML', items: ['LangGraph', 'LangChain', 'QLoRA fine-tuning', 'GARCH', 'LSTM', 'vLLM', 'PyTorch'] },
  { label: 'Infrastructure', items: ['Docker', 'Kubernetes', 'Azure DevOps', 'CI/CD', 'Nginx', 'Microsoft Fabric'] },
  { label: 'Finance / Web3', items: ['Stellar Network', 'Kraken xStocks API', 'Stochastic Calculus', 'Monte Carlo', 'Half-Kelly sizing'] },
]

export default function AboutPage() {
  return (
    <div className="section py-16 max-w-3xl mx-auto space-y-16">

      {/* ── Hero ── */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-qf-red mb-3">About Me</p>
        <h1 className="text-4xl font-extrabold text-white">
          Godwin Edgar Opuka
        </h1>
        <p className="mt-1 text-lg font-medium text-qf-blue">
          Full-Stack Developer · Solutions Architect · AI/ML Engineer
        </p>
        <p className="mt-2 text-sm text-slate-500">📍 Nairobi, Kenya</p>

        <p className="mt-6 text-slate-300 leading-relaxed text-base">
          I build production-grade platforms end-to-end — from Stellar-powered cross-border payment systems
          and AI-native ERPs to autonomous trading agents and legal knowledge graphs. I currently lead engineering
          at Zamadi Group on Afripay, a borderless remittance platform, while also owning all DevOps across their product suite.
          I'm a MSc Financial Engineering candidate at WorldQuant University, bridging quantitative finance and applied AI.
        </p>

        {/* Social links */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://linkedin.com/in/godwin-edgar-opuka"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-200 hover:border-qf-blue hover:text-qf-blue transition-all"
          >
            in LinkedIn
          </a>
          <a
            href="https://github.com/Godwin-88"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-200 hover:border-slate-400 hover:text-white transition-all"
          >
            ⌥ GitHub
          </a>
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg border border-qf-red/50 bg-qf-red/10 px-4 py-2 text-sm font-medium text-qf-red hover:bg-qf-red/20 transition-all"
          >
            ↓ Download CV
          </a>
        </div>
      </div>

      {/* ── Notable Achievements ── */}
      <div>
        <h2 className="text-xl font-bold text-white mb-5">Notable Achievements</h2>
        <ul className="space-y-3">
          {ACHIEVEMENTS.map((a, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
              <span className="mt-0.5 shrink-0 text-qf-red font-bold">★</span>
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Experience ── */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Experience</h2>
        <div className="space-y-8">
          {EXPERIENCE.map((job) => (
            <div key={job.company + job.title} className="relative border-l-2 border-slate-800 pl-6">
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-qf-red bg-qf-black" />
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <h3 className="font-semibold text-white">{job.title}</h3>
                <span className="text-slate-500 text-sm">·</span>
                <span className="text-qf-blue text-sm font-medium">{job.company}</span>
                <span className="ml-auto text-xs text-slate-500 font-mono">{job.dates}</span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="mt-0.5 shrink-0 text-qf-blue">›</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Skills ── */}
      <div>
        <h2 className="text-xl font-bold text-white mb-5">Skills</h2>
        <div className="space-y-4">
          {SKILLS.map((group) => (
            <div key={group.label} className="flex flex-col sm:flex-row sm:items-start gap-2">
              <span className="w-36 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500 pt-0.5">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-slate-700/60 bg-slate-800/50 px-2 py-0.5 text-[11px] font-mono text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Education ── */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Education</h2>
        <div className="space-y-5">
          {EDUCATION.map((edu) => (
            <div key={edu.degree} className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-white">{edu.degree}</p>
                  <p className="text-sm text-qf-blue mt-0.5">{edu.institution}</p>
                </div>
                <span className="text-xs text-slate-500 font-mono shrink-0">{edu.year}</span>
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">{edu.notes}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 text-center">
        <h2 className="text-lg font-bold text-white mb-2">Open to opportunities</h2>
        <p className="text-sm text-slate-400 mb-6">
          Remote · Hybrid · Nairobi — Full-Stack, Solutions Architecture, AI/ML, DevOps, Financial Engineering
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="#projects" className="btn-primary">
            See My Projects →
          </Link>
          <Link href="/contact" className="btn-secondary">
            Get in Touch
          </Link>
          <a href="/cv.pdf" download className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-slate-500 hover:bg-slate-800 hover:text-white transition-all">
            ↓ Download CV
          </a>
        </div>
      </div>

    </div>
  )
}
