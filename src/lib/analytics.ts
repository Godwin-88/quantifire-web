/**
 * QuantiFire Dual-Funnel Analytics
 *
 * Tracks both funnels separately to understand which is performing.
 * Implementations use PostHog (if configured) or noop for development.
 *
 * Services funnel: discovery call bookings per month
 * Content funnel: email subscribers per month, notebook downloads, revenue
 */

const enabled = typeof window !== 'undefined' && !!process.env.NEXT_PUBLIC_POSTHOG_KEY

function posthog() {
  if (!enabled) return { capture: () => {}, identify: () => {} }
  // PostHog is loaded via the PostHogProvider component
  try {
    const { posthog: ph } = window as any
    return ph || { capture: () => {}, identify: () => {} }
  } catch {
    return { capture: () => {}, identify: () => {} }
  }
}

export const track = {
  // ── Services funnel ──────────────────────────────────────────────────────
  servicePageViewed: (slug: string) => {
    posthog().capture('service_page_viewed', { slug })
  },

  portfolioViewed: (slug: string) => {
    posthog().capture('portfolio_viewed', { slug })
  },

  discoveryCallClicked: (source: string) => {
    posthog().capture('discovery_call_clicked', { source })
  },

  contactFormSubmitted: (service: string, budget?: string) => {
    posthog().capture('contact_form_submitted', { service, budget })
  },

  // ── Content funnel ──────────────────────────────────────────────────────
  blogPostRead: (slug: string, percentRead: number) => {
    posthog().capture('blog_post_read', { slug, percentRead })
  },

  emailCaptureViewed: (source: string) => {
    posthog().capture('email_capture_viewed', { source })
  },

  emailCaptureSubmitted: (source: string) => {
    posthog().capture('email_capture_submitted', { source })
  },

  productPageViewed: (slug: string, price: number | 'free') => {
    posthog().capture('product_page_viewed', { slug, price })
  },

  checkoutStarted: (slug: string, price: number) => {
    posthog().capture('checkout_started', { slug, price })
  },

  purchaseCompleted: (slug: string, price: number) => {
    posthog().capture('purchase_completed', { slug, price })
  },

  notebookDownloaded: (notebookId: string, tier: 'free' | 'premium') => {
    posthog().capture('notebook_downloaded', { notebookId, tier })
  },

  // ── Cross-funnel ────────────────────────────────────────────────────────
  cvDownloaded: () => {
    posthog().capture('cv_downloaded')
  },

  linkedInClicked: (source: string) => {
    posthog().capture('linkedin_clicked', { source })
  },

  githubClicked: (source: string) => {
    posthog().capture('github_clicked', { source })
  },

  donationClicked: (platform: string) => {
    posthog().capture('donation_clicked', { platform })
  },
}