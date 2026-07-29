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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantifire.io'),
  title: {
    default: 'QuantiFire — Quantitative Research & Digital Engineering',
    template: '%s | QuantiFire',
  },
  description:
    'QuantiFire delivers quantitative research, web development, process automation, data engineering, and data analytics services for forward-thinking organizations.',
  keywords: [
    'quantitative research', 'web development', 'process automation',
    'data engineering', 'data analytics', 'QuantiFire', 'Nairobi', 'Kenya',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://quantifire.io',
    siteName: 'QuantiFire',
    title: 'QuantiFire — Quantitative Research & Digital Engineering',
    description: 'Quantitative research, web development, process automation, data engineering, and data analytics services.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@quantifire',
    creator: '@quantifire',
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
