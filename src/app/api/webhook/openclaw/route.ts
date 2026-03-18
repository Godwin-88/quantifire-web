import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// OpenClaw sends webhook events when pipelines complete or post statuses update
interface OpenClawEvent {
  event: 'post.published' | 'adaptation.completed' | 'pipeline.triggered' | 'pipeline.completed'
  pipeline?: string
  post_slug?: string
  channel?: string
  payload?: Record<string, unknown>
  timestamp: string
}

export async function POST(request: NextRequest) {
  // Verify shared secret
  const secret = request.headers.get('x-openclaw-secret')
  if (secret !== process.env.OPENCLAW_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let event: OpenClawEvent
  try {
    event = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const supabase = await createClient()

  switch (event.event) {
    case 'post.published': {
      // OpenClaw notifies us a post has been published — update syndication status
      if (event.post_slug) {
        await supabase
          .from('posts')
          .update({ syndicated_at: event.timestamp })
          .eq('slug', event.post_slug)
      }
      break
    }

    case 'adaptation.completed': {
      // A channel-specific content adaptation was created
      if (event.post_slug && event.channel) {
        await supabase.from('content_adaptations').upsert({
          post_slug: event.post_slug,
          channel: event.channel,
          status: 'completed',
          completed_at: event.timestamp,
          payload: event.payload ?? {},
        }, { onConflict: 'post_slug,channel' })
      }
      break
    }

    case 'pipeline.triggered':
    case 'pipeline.completed': {
      // Log pipeline events for observability
      await supabase.from('pipeline_events').insert({
        event_type: event.event,
        pipeline: event.pipeline ?? 'unknown',
        post_slug: event.post_slug ?? null,
        channel: event.channel ?? null,
        payload: event.payload ?? {},
        occurred_at: event.timestamp,
      })
      break
    }

    default:
      return NextResponse.json({ error: 'Unknown event type' }, { status: 400 })
  }

  return NextResponse.json({ received: true })
}
