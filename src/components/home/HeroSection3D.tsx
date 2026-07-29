'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import ParticleField from './ParticleField'

const Icosahedron = dynamic(() => import('./Icosahedron'), { ssr: false })

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } }
}

const itemFadeDown = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function HeroSection3D() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-qf-black">
      <div className="hero-glow-brand glow-pulse absolute bottom-0 left-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full pointer-events-none" />
      <div className="hero-glow-sky glow-pulse absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none" style={{ animationDelay: '2s' }} />

      <Icosahedron />

      <ParticleField />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={itemFadeDown}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary/50 bg-brand-primary/10 px-3.5 py-1 text-sm font-medium text-brand-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
                Digital Engineering Agency
              </span>
            </motion.div>

            <motion.div variants={itemFadeDown} className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight">
                Research.
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                <span className="text-brand-primary draw-underline">Build.</span>
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight">
                Scale.
              </h1>
            </motion.div>

            <motion.div variants={itemFadeDown}>
              <p className="text-lg text-slate-400 max-w-lg">
                Quantitative research, web development, process automation, data engineering, and analytics — built to move at the speed of business.
              </p>
            </motion.div>

            <motion.div variants={itemFadeUp} className="flex flex-wrap gap-4 pt-2">
              <Link href="/services">
                <button className="group relative inline-flex items-center gap-2 rounded-lg bg-brand-primary px-6 py-3 text-base font-semibold text-white transition-all duration-200 active:translate-y-0.5 active:shadow-none hover:shadow-lg hover:shadow-brand-primary/30">
                  Our Services
                </button>
              </Link>
              <Link href="/work">
                <button className="group inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-foreground transition-all duration-200 hover:bg-white hover:text-background">
                  View Work
                </button>
              </Link>
            </motion.div>

            <motion.div variants={itemFadeUp} className="flex flex-wrap gap-3 pt-2">
              {[
                { icon: '🔬', name: 'Research', count: '15+' },
                { icon: '🌐', name: 'Projects', count: '27+' },
                { icon: '📊', name: 'Data Pipelines', count: '40+' },
                { icon: '⚡', name: 'Automations', count: '60+' },
              ].map((s) => (
                <span key={s.name} className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-xs font-medium text-slate-300">
                  <span>{s.icon}</span>
                  <span>{s.count}</span>
                  <span className="text-slate-500">{s.name}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:flex flex-col items-center justify-center relative"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4 } }}
          >
            <div className="relative perspective-1000" style={{ transformStyle: 'preserve-3d' }}>
              <motion.div
                className="absolute top-0 left-0 w-64 h-40 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 backdrop-blur-sm flex items-center justify-center"
                style={{ transform: 'rotateY(-8deg) translateZ(40px)' }}
                animate={{ y: [0, -6, 0], rotateY: [-8, -10, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-3xl">🔬</span>
              </motion.div>
              <motion.div
                className="absolute top-4 left-8 w-64 h-40 rounded-2xl border border-brand-primary/30 bg-brand-primary/8 backdrop-blur-sm flex items-center justify-center"
                style={{ transform: 'rotateY(0deg) translateZ(20px)' }}
                animate={{ y: [0, -8, 0], rotateY: [0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              >
                <span className="text-3xl">🌐</span>
              </motion.div>
              <motion.div
                className="absolute top-8 left-16 w-64 h-40 rounded-2xl border border-brand-accent/30 bg-brand-accent/8 backdrop-blur-sm flex items-center justify-center"
                style={{ transform: 'rotateY(8deg) translateZ(0px)' }}
                animate={{ y: [0, -10, 0], rotateY: [8, 10, 8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              >
                <span className="text-3xl">📊</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2 } }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-xs text-slate-500/60">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-slate-500/60">
            <path d="M8 3v10m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}