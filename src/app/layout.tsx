import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantifaya.io'),
  title: {
    default: 'Quantifaya — Antifragile Quantitative Intelligence for TradFi and DeFi"',
    template: '%s | Quantifaya',
  },
  description:
    'Quantifaya delivers institutional-grade quant finance tools, DeFi strategies, and educational content for traditional finance professionals and Web3 builders.',
  keywords: [
    'quantitative finance', 'quant trading', 'DeFi', 'portfolio optimization',
    'Black-Scholes', 'Yield Agent', 'algorithmic trading', 'blockchain',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://quantifaya.io',
    siteName: 'Quantifaya',
    title: 'Quantifaya — Antifragile Quantitative Intelligence for TradFi and DeFi"',
    description: 'Institutional quant finance tools, DeFi strategies, and research content.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@quantifaya',
    creator: '@quantifaya',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
