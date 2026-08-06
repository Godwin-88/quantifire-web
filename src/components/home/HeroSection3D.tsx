'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const KnowledgeGraph = dynamic(() => import('./KnowledgeGraph'), { ssr: false })

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } }
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function HeroSection3D() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]">
      {/* Knowledge graph — fullscreen animated background */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <KnowledgeGraph style={{ position: 'absolute', inset: 0 }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center justify-center text-center gap-10"
        >
          {/* Three words — centered, horizontal */}
          <motion.div variants={itemFadeUp} className="flex flex-wrap items-baseline justify-center gap-x-5 gap-y-1">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-[var(--foreground)] font-heading leading-none tracking-tight">
              Systems.
            </h1>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-brand-primary font-heading leading-none tracking-tight">
              Signal.
            </h1>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-[var(--foreground)] font-heading leading-none tracking-tight">
              Scale.
            </h1>
          </motion.div>

          {/* Two buttons */}
          <motion.div variants={itemFadeUp} className="flex flex-wrap justify-center gap-4">
            <Link href="/portfolio">
              <button className="group relative inline-flex items-center gap-2 rounded-lg bg-brand-primary px-7 py-3.5 text-base font-semibold text-white transition-all duration-200 active:translate-y-0.5 active:shadow-none hover:shadow-lg hover:shadow-brand-primary/30">
                Explore Work
              </button>
            </Link>
            <Link href="/blog">
              <button className="group inline-flex items-center gap-2 rounded-lg border border-[var(--foreground)]/30 px-7 py-3.5 text-base font-semibold text-[var(--foreground)] transition-all duration-200 hover:bg-[var(--foreground)] hover:text-[var(--background)]">
                Read the Research
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}