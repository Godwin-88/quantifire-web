import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6366f1',
          accent: '#0ea5e9',
          bg: '#0f0a2e',
          fg: '#e2e8f0',
        },
        qf: {
          black:  '#0d0d1a',
          navy:   '#1a1a2e',
          dark:   '#16213e',
          mid:    '#0f3460',
          red:    '#e94560',
          pink:   '#ec4899',
          blue:   '#3b82f6',
          green:  '#22c55e',
          orange: '#f97316',
          muted:  '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'Menlo', 'monospace'],
        heading: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)
        `,
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.2), transparent)',
        'hero-glow-2': 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(14,165,233,0.15), transparent)',
      },
      backgroundSize: {
        'grid': '48px 48px',
      },
      typography: {
        qf: {
          css: {
            '--tw-prose-body': '#cbd5e1',
            '--tw-prose-headings': '#f8fafc',
            '--tw-prose-lead': '#94a3b8',
            '--tw-prose-links': '#6366f1',
            '--tw-prose-bold': '#f1f5f9',
            '--tw-prose-counters': '#94a3b8',
            '--tw-prose-bullets': '#475569',
            '--tw-prose-hr': '#1e293b',
            '--tw-prose-quotes': '#e2e8f0',
            '--tw-prose-quote-borders': '#6366f1',
            '--tw-prose-captions': '#64748b',
            '--tw-prose-code': '#6366f1',
            '--tw-prose-pre-code': '#e2e8f0',
            '--tw-prose-pre-bg': '#0f172a',
            '--tw-prose-th-borders': '#1e293b',
            '--tw-prose-td-borders': '#0f172a',
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-spin': 'borderSpin 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'rotate-3d': 'rotate3d 20s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'scroll-reveal': 'scrollReveal 0.6s ease-out forwards',
        'tilt-shift': 'tiltShift 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        borderSpin: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        rotate3d: {
          '0%': { transform: 'rotate3d(1, 0.5, 0.3, 0deg)' },
          '100%': { transform: 'rotate3d(1, 0.5, 0.3, 360deg)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        scrollReveal: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        tiltShift: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg)' },
          '100%': { transform: 'rotateX(0deg) rotateY(0deg)' },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
