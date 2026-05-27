import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,   // millenialwitness@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD,  // 16-char Gmail App Password
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, product, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    await transporter.sendMail({
      from: `"Quantifaya Portfolio" <${process.env.GMAIL_USER}>`,
      to: 'millenialwitness@gmail.com',
      replyTo: email,
      subject: `Portfolio contact: ${name}${company ? ` — ${company}` : ''}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        company  ? `Company: ${company}` : '',
        product  ? `Project: ${product}` : '',
        ``,
        message,
      ].filter(Boolean).join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:560px;color:#1e293b;">
          <h2 style="margin:0 0 16px;">New portfolio enquiry</h2>
          <table style="border-collapse:collapse;width:100%;font-size:14px;">
            <tr><td style="padding:6px 12px 6px 0;color:#64748b;white-space:nowrap;">Name</td><td style="padding:6px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#64748b;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:#6366f1;">${email}</a></td></tr>
            ${company ? `<tr><td style="padding:6px 12px 6px 0;color:#64748b;">Company</td><td style="padding:6px 0;">${company}</td></tr>` : ''}
            ${product ? `<tr><td style="padding:6px 12px 6px 0;color:#64748b;">Project</td><td style="padding:6px 0;">${product}</td></tr>` : ''}
          </table>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
          <p style="white-space:pre-wrap;font-size:15px;line-height:1.7;margin:0;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
          <p style="font-size:12px;color:#94a3b8;">Hit reply — it goes straight to ${email}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] email failed:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
