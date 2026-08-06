'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (stored) {
      setTheme(stored)
      if (stored === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-14 items-center rounded-full border border-slate-700 bg-slate-800/60 backdrop-blur-sm transition-colors duration-200 hover:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
      aria-label="Toggle theme"
    >
      <span
        className={cn(
          'inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-white shadow-lg transition-transform duration-200',
          theme === 'dark' ? 'translate-x-7' : 'translate-x-1',
        )}
      >
        {theme === 'dark' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </span>
    </button>
  )
}
