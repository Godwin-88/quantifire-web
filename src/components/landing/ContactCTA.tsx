import Link from 'next/link'

export function ContactCTA() {
  return (
    <section className="py-20 border-t border-slate-800 bg-gradient-to-b from-qf-navy/20 to-qf-black">
      <div className="section max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-qf-red mb-3">
          Open to Opportunities
        </p>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Let&apos;s build something together
        </h2>
        <p className="mt-3 text-slate-400 leading-relaxed">
          I&apos;m available for full-time, contract, and remote roles in Full-Stack Engineering,
          Solutions Architecture, AI/ML, and Financial Engineering.
          Based in Nairobi — open globally.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary text-base px-7 py-3">
            Get in Touch →
          </Link>
          <Link href="/about" className="btn-secondary text-base px-7 py-3">
            About Me
          </Link>
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-7 py-3 text-base font-semibold text-slate-200 hover:border-slate-500 hover:bg-slate-800 hover:text-white transition-all"
          >
            ↓ Download CV
          </a>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-slate-500">
          <a
            href="https://linkedin.com/in/godwin-edgar-opuka"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-qf-blue transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/Godwin-88"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="mailto:millenialwitness@gmail.com"
            className="hover:text-slate-300 transition-colors"
          >
            millenialwitness@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}
