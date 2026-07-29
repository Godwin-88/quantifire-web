/**
 * Stripe client for notebook purchases.
 * 
 * Configure with environment variables:
 *   STRIPE_SECRET_KEY=
 *   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
 *   STRIPE_WEBHOOK_SECRET=
 */

import Stripe from 'stripe'

// Lazy init — Stripe is only used in API routes, not client components
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      // Return a mock in development if no key configured
      if (process.env.NODE_ENV === 'development') {
        console.warn('[stripe] No STRIPE_SECRET_KEY set — using mock')
        return null as unknown as Stripe
      }
      throw new Error('STRIPE_SECRET_KEY is not configured')
    }
    _stripe = new Stripe(key, {
      apiVersion: '2025-02-24.acacia' as any,
      typescript: true,
    })
  }
  return _stripe
}

/**
 * Create a Stripe checkout session for a notebook purchase.
 */
export async function createCheckoutSession(params: {
  productSlug: string
  productName: string
  price: number
  successUrl: string
  cancelUrl: string
  customerEmail?: string
}) {
  const stripe = getStripe()
  if (!stripe) {
    // Mock response for development
    return { url: params.successUrl, sessionId: 'cs_mock_dev' }
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: params.productName,
            description: `QuantiFire Research Notebook: ${params.productName}`,
          },
          unit_amount: params.price * 100, // cents
        },
        quantity: 1,
      },
    ],
    metadata: {
      product_slug: params.productSlug,
    },
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    customer_email: params.customerEmail,
  })

  return { url: session.url, sessionId: session.id }
}