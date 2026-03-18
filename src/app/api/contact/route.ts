import { createClient } from '@/lib/supabase/server'
import { sendContactConfirmation, sendContactAdminNotification } from '@/lib/resend'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, product, message, source } = body

    if (!email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase.from('leads').insert({
      email: email.toLowerCase().trim(),
      name: name ?? null,
      company: company ?? null,
      product: product ?? null,
      message,
      source: source ?? 'contact-page',
      status: 'new',
    })

    if (error) {
      console.error('Contact form error:', error)
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
    }

    // Send emails via Resend (non-blocking — don't fail the response if email fails)
    await Promise.allSettled([
      sendContactConfirmation({ name: name ?? '', email, product }),
      sendContactAdminNotification({ name, email, company, product, message }),
    ])

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
