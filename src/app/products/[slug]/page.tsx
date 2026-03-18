import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getProduct, PRODUCTS } from '@/lib/products'
import { ProductHero } from '@/components/products/ProductHero'
import { ProductTabs } from '@/components/products/ProductTabs'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: 'Product not found' }
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.description },
  }
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  return (
    <div>
      <ProductHero product={product} />
      <Suspense fallback={null}>
        <ProductTabs product={product} />
      </Suspense>
    </div>
  )
}
