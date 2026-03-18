import { createClient } from '@/lib/supabase/server'
import { sendWaitlistConfirmation, sendWaitlistAdminNotification } from '@/lib/resend'
import { getProduct } from '@/lib/products'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, whatsapp, occupation, age, gender, productPurpose, productSlug } = body

    if (!email || !name || !productSlug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const supabase = await createClient()

    // Save to leads table; extra fields go into the metadata JSONB column
    const { error } = await supabase.from('leads').insert({
      email: email.toLowerCase().trim(),
      name,
      product: productSlug,
      message: productPurpose ?? null,
      source: 'product-interest-form',
      status: 'new',
      metadata: {
        whatsapp: whatsapp ?? null,
        occupation: occupation ?? null,
        age: age ?? null,
        gender: gender ?? null,
        product_purpose: productPurpose ?? null,
      },
    })

    if (error) {
      console.error('Product interest form error:', error)
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
    }

    // Also upsert them as a subscriber
    await supabase.from('subscribers').upsert(
      {
        email: email.toLowerCase().trim(),
        source_channel: `product-interest-${productSlug}`,
        status: 'active',
        subscribed_at: new Date().toISOString(),
      },
      { onConflict: 'email', ignoreDuplicates: true }
    )

    // Resolve product display name for email
    const product = getProduct(productSlug)
    const productName = product?.name ?? productSlug

    // Send emails via Resend (non-blocking)
    await Promise.allSettled([
      sendWaitlistConfirmation({ name, email, productName, productSlug }),
      sendWaitlistAdminNotification({ name, email, productName, occupation, whatsapp }),
    ])

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
