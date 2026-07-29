import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getProduct, getProducts } from '@/lib/products'
import { DualFunnelTabs } from '@/components/shared/DualFunnelTabs'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: 'Product not found' }
  return {
    title: product.name,
    description: product.tagline,
    openGraph: { title: product.name, description: product.tagline },
  }
}

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  return (
    <div>
      {/* Hero */}
      <div className="section py-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{product.icon}</span>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                product.priceFrom === 0
                  ? 'bg-green-500/15 text-green-400'
                  : 'bg-brand-primary/15 text-brand-primary'
              }`}
            >
              {product.priceFrom === 0 ? 'Free' : `$${product.priceFrom}`}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-heading leading-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl">{product.tagline}</p>
        </div>
      </div>

      {/* Tabs */}
      <Suspense fallback={null}>
        <DualFunnelTabs data={product} funnel="content" />
      </Suspense>
    </div>
  )
}