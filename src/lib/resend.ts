import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'Quantifaya <onboarding@resend.dev>'
const ADMIN = process.env.ADMIN_EMAIL ?? 'hello@quantifaya.com'

// ─── Shared layout ────────────────────────────────────────────────────────────

function layout(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quantifaya</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0d0d14;border:1px solid #1e2030;border-radius:12px;overflow:hidden;max-width:560px;">
        <!-- Header -->
        <tr>
          <td style="padding:28px 32px;border-bottom:1px solid #1e2030;">
            <span style="font-size:22px;font-weight:800;color:#e2e8f0;">Quanti<span style="color:#ef4444;">🔥</span></span>
          </td>
        </tr>
        <!-- Body -->
        <tr><td style="padding:32px;">${content}</td></tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #1e2030;font-size:11px;color:#475569;line-height:1.6;">
            Quantifaya — Quantitative Finance for Web2 &amp; Web3<br />
            Not financial advice. For educational purposes only.<br />
            <a href="https://quantifaya.com" style="color:#ef4444;text-decoration:none;">quantifaya.com</a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function h1(text: string) {
  return `<h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#f1f5f9;">${text}</h1>`
}

function p(text: string) {
  return `<p style="margin:0 0 16px;font-size:15px;color:#94a3b8;line-height:1.7;">${text}</p>`
}

function pill(text: string) {
  return `<span style="display:inline-block;background:#ef444420;color:#ef4444;border:1px solid #ef444440;border-radius:999px;padding:3px 12px;font-size:12px;font-weight:600;">${text}</span>`
}

function divider() {
  return `<div style="border-top:1px solid #1e2030;margin:24px 0;"></div>`
}

// ─── Contact confirmation (to user) ───────────────────────────────────────────

export async function sendContactConfirmation(opts: {
  name: string
  email: string
  product?: string
}) {
  const greeting = opts.name ? `Hi ${opts.name.split(' ')[0]},` : 'Hi there,'
  const productNote = opts.product
    ? p(`Your enquiry has been tagged to <strong style="color:#e2e8f0;">${opts.product}</strong>.`)
    : ''

  return resend.emails.send({
    from: FROM,
    to: opts.email,
    subject: "We've received your message — Quantifaya",
    html: layout(`
      ${h1("We've got your message")}
      ${p(greeting)}
      ${p("Thanks for reaching out. We've received your message and will respond within <strong style=\"color:#e2e8f0;\">2 business days</strong>.")}
      ${productNote}
      ${divider()}
      ${p('In the meantime, explore our research on the blog or check out our upcoming products.')}
      <a href="https://quantifaya.com/blog" style="display:inline-block;background:#ef4444;color:#fff;text-decoration:none;padding:10px 22px;border-radius:8px;font-size:14px;font-weight:600;">Read the Blog →</a>
    `),
  })
}

// ─── Admin notification (new contact lead) ────────────────────────────────────

export async function sendContactAdminNotification(opts: {
  name?: string
  email: string
  company?: string
  product?: string
  message: string
}) {
  return resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `New contact form submission — ${opts.email}`,
    html: layout(`
      ${pill('New Lead')}
      ${h1('Contact form submission')}
      ${p(`<strong style="color:#e2e8f0;">From:</strong> ${opts.name ?? 'Unknown'} &lt;${opts.email}&gt;`)}
      ${opts.company ? p(`<strong style="color:#e2e8f0;">Company:</strong> ${opts.company}`) : ''}
      ${opts.product ? p(`<strong style="color:#e2e8f0;">Product:</strong> ${opts.product}`) : ''}
      ${divider()}
      <p style="margin:0;font-size:15px;color:#94a3b8;line-height:1.7;white-space:pre-wrap;">${opts.message}</p>
    `),
  })
}

// ─── Newsletter welcome (to subscriber) ───────────────────────────────────────

export async function sendNewsletterWelcome(opts: { email: string }) {
  return resend.emails.send({
    from: FROM,
    to: opts.email,
    subject: "You're in — Quantifaya Quant Finance Weekly",
    html: layout(`
      ${h1("You're on the list 🎯")}
      ${p("Welcome to <strong style=\"color:#e2e8f0;\">Quantifaya</strong> — you'll receive weekly quant finance insights, DeFi research, animated explainers, and early-access updates for our platform.")}
      ${p("Here's what to expect:")}
      <ul style="margin:0 0 20px;padding-left:20px;color:#94a3b8;font-size:15px;line-height:2;">
        <li>Weekly quant finance deep-dives</li>
        <li>Animated mathematical explainers</li>
        <li>Interactive Jupyter notebooks</li>
        <li>Early access to platform products</li>
      </ul>
      ${divider()}
      <a href="https://quantifaya.com/blog" style="display:inline-block;background:#ef4444;color:#fff;text-decoration:none;padding:10px 22px;border-radius:8px;font-size:14px;font-weight:600;">Start Reading →</a>
    `),
  })
}

// ─── Waitlist confirmation (to user) ─────────────────────────────────────────

export async function sendWaitlistConfirmation(opts: {
  name: string
  email: string
  productName: string
  productSlug: string
}) {
  const firstName = opts.name.split(' ')[0]
  return resend.emails.send({
    from: FROM,
    to: opts.email,
    subject: `You're on the waitlist — ${opts.productName}`,
    html: layout(`
      ${pill("Early Access")}
      ${h1(`You're on the list, ${firstName}!`)}
      ${p(`You've successfully registered your interest in <strong style="color:#e2e8f0;">${opts.productName}</strong>. You'll be among the first to get access when we launch.`)}
      ${p("As an early registrant you'll get:")}
      <ul style="margin:0 0 20px;padding-left:20px;color:#94a3b8;font-size:15px;line-height:2;">
        <li>Priority access before public launch</li>
        <li>Early-adopter pricing locked in</li>
        <li>Direct input on features &amp; roadmap</li>
      </ul>
      ${divider()}
      ${p("In the meantime, check out our research content to get a feel for the depth we bring.")}
      <a href="https://quantifaya.com/blog" style="display:inline-block;background:#ef4444;color:#fff;text-decoration:none;padding:10px 22px;border-radius:8px;font-size:14px;font-weight:600;">Read Research →</a>
    `),
  })
}

// ─── Admin notification (new waitlist signup) ─────────────────────────────────

export async function sendWaitlistAdminNotification(opts: {
  name: string
  email: string
  productName: string
  occupation?: string
  whatsapp?: string
}) {
  return resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `New waitlist signup — ${opts.productName} — ${opts.email}`,
    html: layout(`
      ${pill('New Waitlist')}
      ${h1(`${opts.productName} waitlist signup`)}
      ${p(`<strong style="color:#e2e8f0;">Name:</strong> ${opts.name}`)}
      ${p(`<strong style="color:#e2e8f0;">Email:</strong> ${opts.email}`)}
      ${opts.occupation ? p(`<strong style="color:#e2e8f0;">Occupation:</strong> ${opts.occupation}`) : ''}
      ${opts.whatsapp ? p(`<strong style="color:#e2e8f0;">WhatsApp:</strong> ${opts.whatsapp}`) : ''}
    `),
  })
}
