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
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-qf-red/30 bg-qf-red/10 px-4 py-1.5 text-sm text-qf-red">
          <span className="h-1.5 w-1.5 rounded-full bg-qf-red animate-pulse" />
          Early Access · Join the Waitlist
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {' '}
          <span className="gradient-text">Antifragile Quantitative Intelligence</span>
          <br />
           for TradFI and DeFI
        </h1>

        {/* Subheadline */}
       <p className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
          Transform market complexity into actionable intelligence. 
          Institutional-grade quantitative tools and content-driven insights — bridging traditional markets 
          and decentralized finance.
      </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="#products" className="btn-primary text-base px-7 py-3">
            Explore Products
          </Link>
          <Link href="/blog" className="btn-secondary text-base px-7 py-3">
            Read the Blog ↓
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="text-green-400">✓</span> Free to register
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-400">✓</span> Early access priority
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-400">✓</span> GDPR & POPIA compliant
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-400">✓</span> No spam, ever
          </span>
        </div>
      </div>
    </section>
  )
}
