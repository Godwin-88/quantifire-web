import { createClient } from '@/lib/supabase/server'
import { resend } from '@/lib/resend'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantifaya.com'
const FROM = 'Quantifaya <onboarding@resend.dev>'
const ADMIN = process.env.ADMIN_EMAIL ?? 'hello@quantifaya.com'

// Map notebook IDs to their static file paths and Colab URLs
const NOTEBOOK_REGISTRY: Record<string, { title: string; file: string; colabUrl: string }> = {
  'nb-ep01-correlation': {
    title: 'EP01 — Portfolio Correlation & Variance',
    file: 'ep01-correlation-matters.ipynb',
    colabUrl: `https://colab.research.google.com/github/Godwin-88/quantifire-web/blob/main/public/notebooks/ep01-correlation-matters.ipynb`,
  },
  'nb-ep02-frontier': {
    title: 'EP02 — Efficient Frontier & Mean-Variance Optimization',
    file: 'ep02-efficient-frontier.ipynb',
    colabUrl: `https://colab.research.google.com/github/Godwin-88/quantifire-web/blob/main/public/notebooks/ep02-efficient-frontier.ipynb`,
  },
  'nb-ep03-metrics': {
    title: 'EP03 — Performance Metrics & Risk-Adjusted Returns',
    file: 'ep03-performance-metrics.ipynb',
    colabUrl: `https://colab.research.google.com/github/Godwin-88/quantifire-web/blob/main/public/notebooks/ep03-performance-metrics.ipynb`,
  },
  'nb-ep04-var': {
    title: 'EP04 — Value at Risk & Expected Shortfall',
    file: 'ep04-value-at-risk.ipynb',
    colabUrl: `https://colab.research.google.com/github/Godwin-88/quantifire-web/blob/main/public/notebooks/ep04-value-at-risk.ipynb`,
  },
  'nb-ep05-factors': {
    title: 'EP05 — Factor Models & Alpha Attribution',
    file: 'ep05-factor-models.ipynb',
    colabUrl: `https://colab.research.google.com/github/Godwin-88/quantifire-web/blob/main/public/notebooks/ep05-factor-models.ipynb`,
  },
  'nb-ep11-amm': {
    title: 'EP11 — AMM Mechanics & Price Impact',
    file: 'ep11-uniswap-amm.ipynb',
    colabUrl: `https://colab.research.google.com/github/Godwin-88/quantifire-web/blob/main/public/notebooks/ep11-uniswap-amm.ipynb`,
  },
}

function notebookAccessEmail(opts: {
  name: string
  email: string
  notebookTitle: string
  downloadUrl: string
  colabUrl: string
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>Quantifaya Notebook</title></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0d0d14;border:1px solid #1e2030;border-radius:12px;overflow:hidden;max-width:560px;">
        <tr><td style="padding:28px 32px;border-bottom:1px solid #1e2030;">
          <span style="font-size:22px;font-weight:800;color:#e2e8f0;">Quanti🔥</span>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#f1f5f9;">Your notebook is ready 📓</h1>
          <p style="margin:0 0 16px;font-size:15px;color:#94a3b8;line-height:1.7;">
            Hi ${opts.name || 'there'},<br/>Here are your access links for <strong style="color:#e2e8f0;">${opts.notebookTitle}</strong>:
          </p>
          <div style="background:#0a0a0f;border:1px solid #1e2030;border-radius:8px;padding:20px;margin:0 0 24px;">
            <p style="margin:0 0 12px;font-size:13px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Access Links</p>
            <a href="${opts.colabUrl}" style="display:block;background:#ef4444;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:14px;font-weight:600;margin-bottom:10px;text-align:center;">
              Open in Google Colab →
            </a>
            <a href="${opts.downloadUrl}" style="display:block;background:#1e2030;color:#e2e8f0;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:14px;font-weight:600;text-align:center;border:1px solid #334155;">
              Download .ipynb →
            </a>
          </div>
          <p style="margin:0 0 8px;font-size:13px;color:#64748b;line-height:1.6;">
            These links will always be available from the blog post. Bookmark the post for future reference.
          </p>
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #1e2030;font-size:11px;color:#475569;line-height:1.6;">
          Quantifaya — Quantitative Finance for Web2 &amp; Web3<br/>
          Not financial advice. Educational purposes only.<br/>
          <a href="${SITE_URL}" style="color:#ef4444;text-decoration:none;">quantifaya.com</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, notebookId } = body

    if (!email || !notebookId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const notebook = NOTEBOOK_REGISTRY[notebookId]
    if (!notebook) {
      return NextResponse.json({ error: 'Notebook not found' }, { status: 404 })
    }

    const downloadUrl = `${SITE_URL}/notebooks/${notebook.file}`

    // Save to Supabase (upsert subscriber + record lead)
    const supabase = await createClient()
    await Promise.allSettled([
      supabase.from('subscribers').upsert(
        {
          email: email.toLowerCase().trim(),
          source_channel: `notebook-${notebookId}`,
          subscribed_at: new Date().toISOString(),
          status: 'active',
        },
        { onConflict: 'email', ignoreDuplicates: true }
      ),
      supabase.from('leads').insert({
        email: email.toLowerCase().trim(),
        name: name ?? null,
        source: 'notebook-access',
        message: `Requested access to: ${notebook.title}`,
        status: 'new',
        metadata: { notebook_id: notebookId, notebook_title: notebook.title },
      }),
    ])

    // Send access email with links
    await Promise.allSettled([
      resend.emails.send({
        from: FROM,
        to: email,
        subject: `Your notebook: ${notebook.title} — Quantifaya`,
        html: notebookAccessEmail({
          name: name ?? '',
          email,
          notebookTitle: notebook.title,
          downloadUrl,
          colabUrl: notebook.colabUrl,
        }),
      }),
      // Admin notification
      resend.emails.send({
        from: FROM,
        to: ADMIN,
        subject: `Notebook access: ${notebook.title} — ${email}`,
        html: `<p>${name ?? 'Anonymous'} (${email}) requested access to <strong>${notebook.title}</strong>.</p>`,
      }),
    ])

    return NextResponse.json({
      success: true,
      downloadUrl,
      colabUrl: notebook.colabUrl,
    })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
