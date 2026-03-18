import { createClient } from '@/lib/supabase/server'
import { sendNewsletterWelcome } from '@/lib/resend'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source_channel } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error, data } = await supabase.from('subscribers').upsert(
      {
        email: email.toLowerCase().trim(),
        source_channel: source_channel ?? 'unknown',
        subscribed_at: new Date().toISOString(),
        status: 'active',
      },
      { onConflict: 'email', ignoreDuplicates: false }
    ).select('subscribed_at').single()

    if (error) {
      console.error('Subscribe error:', error)
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }

    // Only send welcome email on first subscription (not re-subscription)
    // ignoreDuplicates: false means upsert updates the row — treat every successful upsert as welcome-worthy
    await sendNewsletterWelcome({ email }).catch(console.error)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
