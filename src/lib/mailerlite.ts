/**
 * MailerLite integration for dual-list email architecture.
 * 
 * Two separate lists:
 *   List A — Content/Quant subscribers (notebook downloads, newsletter)
 *   List B — Services/Professional (contact form, discovery calls)
 * 
 * Configure with environment variables:
 *   MAILERLITE_API_KEY=
 *   MAILERLITE_CONTENT_GROUP_ID=
 *   MAILERLITE_SERVICES_GROUP_ID=
 */

const MAILERLITE_API = 'https://connect.mailerlite.com/api'

interface MailerLiteResponse {
  data?: { id: string }
  error?: string
}

async function mailerliteRequest(path: string, body: Record<string, unknown>): Promise<MailerLiteResponse> {
  const apiKey = process.env.MAILERLITE_API_KEY

  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[mailerlite] No MAILERLITE_API_KEY set — using mock')
      return { data: { id: 'mock_subscriber_id' } }
    }
    throw new Error('MAILERLITE_API_KEY is not configured')
  }

  const res = await fetch(`${MAILERLITE_API}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = await res.text()
    console.error('[mailerlite] API error:', error)
    return { error: `MailerLite API error: ${res.status}` }
  }

  return res.json()
}

/**
 * Subscribe to the content/quant list (List A).
 * Triggered by: free notebook download, newsletter signup
 */
export async function subscribeContent(params: {
  email: string
  name?: string
  source: string
  tags?: string[]
}) {
  const groupId = process.env.MAILERLITE_CONTENT_GROUP_ID

  const result = await mailerliteRequest('/subscribers', {
    email: params.email,
    name: params.name || '',
    groups: groupId ? [groupId] : [],
    fields: {
      source: params.source,
      list_type: 'content',
    },
    ...(params.tags ? { tags: params.tags } : {}),
  })

  return result
}

/**
 * Subscribe to the services/professional list (List B).
 * Triggered by: contact form submission, discovery call booking
 */
export async function subscribeServices(params: {
  email: string
  name?: string
  source: string
  service?: string
}) {
  const groupId = process.env.MAILERLITE_SERVICES_GROUP_ID

  const result = await mailerliteRequest('/subscribers', {
    email: params.email,
    name: params.name || '',
    groups: groupId ? [groupId] : [],
    fields: {
      source: params.source,
      list_type: 'services',
      interested_service: params.service || '',
    },
  })

  return result
}