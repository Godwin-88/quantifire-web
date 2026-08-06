import type { Metadata } from 'next'
import { Raleway, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { cn } from "@/lib/utils";

const raleway = Raleway({subsets:['latin'],variable:'--font-sans',weight:['400','500','600','700','800']});


const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantifire.io'),
  title: {
    default: 'Quantifaya — Quant AI Systems & Quant Finance Research',
    template: '%s | Quantifaya',
  },
  description:
    'Quantifaya builds production quant AI systems for institutions and publishes rigorous quant finance research for practitioners. Engineering complexity, shipping systems that work.',
  keywords: [
    'quantitative research', 'quant AI systems', 'quant finance', 'web development',
    'process automation', 'data engineering', 'data analytics', 'Quantifaya', 'Nairobi', 'Kenya',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://quantifire.io',
    siteName: 'Quantifaya',
    title: 'Quantifaya — Quant AI Systems & Quant Finance Research',
    description: 'Quant AI systems for institutions. Research for practitioners.',
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
    <html lang="en" className={cn(raleway.variable, jetbrainsMono.variable, "font-sans")}>
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
