'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const KnowledgeGraph = dynamic(() => import('./KnowledgeGraph'), { ssr: false })

const ALTERNATE_WORDS = ['Stochastic', 'Systematic', 'Statistical', 'Strategic', 'Sophisticated']
const CYCLE_WORDS = [...ALTERNATE_WORDS, 'Signal']

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } }
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const wordVariants = {
  initial: { opacity: 0, y: -12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.3 } }
}

export default function HeroSection3D() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % CYCLE_WORDS.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]">
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
          <motion.div variants={itemFadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-x-5 gap-y-2">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-[var(--foreground)] font-heading leading-none tracking-tight">
              Systems.
            </h1>
            <div className="relative h-[1.2em]">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={CYCLE_WORDS[currentIndex]}
                  variants={wordVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-5xl sm:text-6xl lg:text-8xl font-bold text-brand-primary font-heading leading-none tracking-tight"
                >
                  {CYCLE_WORDS[currentIndex]}.
                </motion.h1>
              </AnimatePresence>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-[var(--foreground)] font-heading leading-none tracking-tight">
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