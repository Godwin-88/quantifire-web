'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/marketplace', label: 'Notebooks' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-qf-black/80 backdrop-blur-md">
      <nav className="section flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/logo.jpg"
            alt="Quantifaya"
            className="h-9 w-9 rounded-lg object-cover ring-1 ring-slate-700/60"
          />
          <span className="text-xl font-bold tracking-tight font-heading">
            <span className="gradient-text">Quanti</span>
            <span className="text-brand-primary">Faya</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="btn-ghost text-slate-400 hover:text-slate-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/contact" className="btn-primary">Get in Touch</Link>
        </div>

        {/* Theme toggle */}
        <div className="hidden md:flex items-center">
          <ThemeToggle />
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-slate-400 hover:text-slate-100"
          aria-label="Toggle menu"
        >
          <span className={cn('block w-5 h-0.5 bg-current transition-all', open && 'rotate-45 translate-y-1.5')} />
          <span className={cn('block w-5 h-0.5 bg-current my-1 transition-all', open && 'opacity-0')} />
          <span className={cn('block w-5 h-0.5 bg-current transition-all', open && '-rotate-45 -translate-y-1.5')} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-qf-black px-4 pb-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-slate-300 hover:text-white border-b border-slate-800/60 last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex gap-3">
            <Link href="/contact" className="btn-primary flex-1 text-center">Get in Touch</Link>
          </div>
        </div>
      )}
    </header>
  )
}
