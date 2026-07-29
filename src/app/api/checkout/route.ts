import { NextRequest, NextResponse } from 'next/server'
import { getProduct } from '@/lib/products'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, email } = body

    if (!slug) {
      return NextResponse.json({ error: 'Product slug is required' }, { status: 400 })
    }

    const product = getProduct(slug)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    if (!product.priceFrom || product.priceFrom === 0) {
      return NextResponse.json({ error: 'This product is free — no checkout needed' }, { status: 400 })
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000'

    const { url } = await createCheckoutSession({
      productSlug: product.slug,
      productName: product.name,
      price: product.priceFrom,
      successUrl: `${origin}/products/${product.slug}?checkout=success`,
      cancelUrl: `${origin}/products/${product.slug}?checkout=cancelled`,
      customerEmail: email,
    })

    return NextResponse.json({ url })
  } catch (error) {
    console.error('[checkout] Error creating session:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}