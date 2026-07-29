'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="hero-glow-brand absolute inset-0 pointer-events-none" />
      <div className="hero-glow-sky absolute inset-0 pointer-events-none" style={{ transform: 'rotate(180deg)' }} />

      <div className="section relative z-10">
        <ScrollReveal>
          <div className="relative rounded-3xl border border-brand-primary/20 bg-qf-navy/60 p-8 md:p-16 text-center backdrop-blur-sm">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-brand-primary/30 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-brand-accent/30 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-brand-accent/30 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-brand-primary/30 rounded-br-3xl" />

            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3.5 py-1 text-sm font-medium text-brand-primary mb-4">
                  Let's Build Something
                </span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-white font-heading leading-tight">
                Ready to turn your data into a{' '}
                <span className="text-brand-primary">competitive advantage</span>?
              </h2>

              <p className="mt-4 text-lg text-slate-400 max-w-lg mx-auto">
                Whether you need a quantitative model, a web platform, or an automated pipeline — we ship production-grade work on schedule.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <motion.button
                    className="group relative inline-flex items-center gap-2 rounded-lg bg-brand-primary px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-brand-primary/30 active:scale-95"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Start a Project
                    <span className="text-lg group-hover:translate-x-0.5 transition-transform">→</span>
                  </motion.button>
                </Link>
                <Link href="/marketplace">
                  <motion.button
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-8 py-3.5 text-base font-semibold text-slate-200 transition-all duration-200 hover:bg-white/5 active:scale-95"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Browse Products
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}