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
        // Quantifire brand palette (dark quant aesthetic)
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
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)
        `,
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(233,69,96,0.18), transparent)',
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
            '--tw-prose-links': '#3b82f6',
            '--tw-prose-bold': '#f1f5f9',
            '--tw-prose-counters': '#94a3b8',
            '--tw-prose-bullets': '#475569',
            '--tw-prose-hr': '#1e293b',
            '--tw-prose-quotes': '#e2e8f0',
            '--tw-prose-quote-borders': '#e94560',
            '--tw-prose-captions': '#64748b',
            '--tw-prose-code': '#e94560',
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
      },
    },
  },
  plugins: [typography],
}

export default config
