'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface ProductCTAProps {
  productSlug: string
  productName: string
  price: number
  description: string
  icon?: string
  accentColor?: string
}

export function ProductCTA({
  productSlug,
  productName,
  price,
  description,
  icon = '📓',
  accentColor = '#6366f1',
}: ProductCTAProps) {
  return (
    <motion.div
      className="relative my-10 overflow-hidden rounded-2xl border p-6 md:p-8"
      style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}08` }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow */}
      <div
        className="absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
      />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* Icon */}
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-3xl"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Research Notebook
          </p>
          <h3 className="text-lg font-bold text-white font-heading mt-0.5">{productName}</h3>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>

        {/* Price & CTA */}
        <div className="flex flex-col items-center sm:items-end gap-2 shrink-0 w-full sm:w-auto">
          <span className="text-2xl font-bold text-white font-heading">
            {price === 0 ? 'Free' : `$${price}`}
          </span>
          <Link href={price === 0 ? `/blog/${productSlug}` : `/products/${productSlug}`}>
            <button
              className="btn-primary text-sm whitespace-nowrap"
              style={{ backgroundColor: accentColor }}
            >
              {price === 0 ? 'Get Free Notebook' : 'Buy Notebook →'}
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}