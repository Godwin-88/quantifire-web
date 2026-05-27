import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-qf-black">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-100" />
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-qf-blue/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-qf-red/10 blur-3xl" />

      <div className="section relative z-10 flex flex-col items-center justify-center py-28 text-center lg:py-36">
        {/* Eyebrow */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-qf-blue/30 bg-qf-blue/10 px-4 py-1.5 text-sm text-qf-blue">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          Financial Engineer · Enterprise Architect · AI Agent Developer · Nairobi, Kenya
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          <span className="gradient-text">Engineering Complexity.</span>
          <br />
          Shipping Systems That Work.
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
          I build production AI agents, enterprise architecture platforms, and quant finance systems —
          spanning healthcare graph-RAG, blockchain payments, autonomous trading, and LLM-native ERP.
          Every project below runs in production or active development.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="#projects" className="btn-primary text-base px-7 py-3">
            View Projects
          </Link>
          <Link href="/blog" className="btn-secondary text-base px-7 py-3">
            Read the Blog ↓
          </Link>
        </div>

        {/* Stack indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="text-qf-blue">◆</span> Python · Go · TypeScript · Rust
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-qf-blue">◆</span> FastAPI · React · Flutter · Next.js
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-qf-blue">◆</span> Neo4j · PostgreSQL · Redis
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-qf-blue">◆</span> Docker · Kubernetes · Azure
          </span>
        </div>
      </div>
    </section>
  )
}
