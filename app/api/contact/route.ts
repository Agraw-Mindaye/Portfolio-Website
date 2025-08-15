import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// minimal validation:
function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !isEmail(email) ||
      !message.trim()
    ) {
      return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587/others
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const to = process.env.CONTACT_TO
    const from = process.env.CONTACT_FROM

    if (!to || !from) {
      return NextResponse.json(
        { ok: false, error: 'Server misconfigured (CONTACT_TO/CONTACT_FROM missing)' },
        { status: 500 }
      )
    }

    const subject = `New portfolio message from ${name}`
    const plain = `From: ${name} <${email}>\n\n${message}`
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height:1.6">
        <h2 style="margin:0 0 8px">New Portfolio Message</h2>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p style="white-space:pre-wrap">${message}</p>
      </div>
    `

    await transporter.sendMail({
      from, // must be allowed by your SMTP provider
      to,
      replyTo: email, // so you can reply directly
      subject,
      text: plain,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to send' }, { status: 500 })
  }
}
