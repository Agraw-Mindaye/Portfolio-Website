import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  message: z.string().min(1).max(5000),
})

// ─── Rate limiting ────────────────────────────────────────────────────────────

const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 3

/**
 * In-memory throttle on an otherwise unauthenticated sendMail trigger.
 *
 * Deliberately simple, with a known limit: serverless instances don't share
 * this map and it resets on cold start, so it raises the bar against casual
 * abuse rather than guaranteeing a global cap. Appropriate at this traffic
 * level; a durable store would be the next step if abuse actually happens.
 */
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return true
  }

  recent.push(now)
  hits.set(ip, recent)

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }

  return false
}

// ─── Failure classification ───────────────────────────────────────────────────

/**
 * What the sender should do about a failure — the only distinction that matters
 * to someone staring at the form.
 *
 * `retry`    — transient (network blip, Gmail rate limit). Trying again may work.
 * `blocked`  — the mail path is misconfigured or the account is rejected. No
 *              amount of retrying will help, so the UI must offer email instead.
 * `rejected` — Gmail refused this specific message or recipient address.
 */
type FailureKind = 'retry' | 'blocked' | 'rejected'

/** Nodemailer/SMTP error shape — only the fields we actually branch on. */
type MailError = { code?: string; responseCode?: number; command?: string }

/**
 * Maps an SMTP failure to what the sender can do about it.
 *
 * Deliberately conservative: anything unrecognized is treated as `retry`, since
 * telling someone to give up on a blip is worse than one wasted retry on a
 * genuine outage.
 */
function classify(err: unknown): FailureKind {
  const { code, responseCode } = (err ?? {}) as MailError

  // Credentials rejected (bad/revoked App Password, 2SV disabled) or the account
  // isn't permitted to relay. Config problem — retrying is futile.
  if (code === 'EAUTH' || responseCode === 535 || responseCode === 530) return 'blocked'

  // Missing/incorrect SMTP_HOST, DNS failure, or the port is blocked outright.
  if (code === 'EDNS' || code === 'ENOTFOUND') return 'blocked'

  // 550/553 — mailbox unavailable or address rejected by the server.
  if (responseCode === 550 || responseCode === 553) return 'rejected'

  // Connection-level trouble and Gmail's own 4xx throttling are genuinely
  // transient: timeouts, refused connections, dropped sockets, "try again later".
  if (
    code === 'ETIMEDOUT' ||
    code === 'ECONNECTION' ||
    code === 'ECONNREFUSED' ||
    code === 'ECONNRESET' ||
    code === 'ESOCKET' ||
    (typeof responseCode === 'number' && responseCode >= 400 && responseCode < 500)
  ) {
    return 'retry'
  }

  return 'retry'
}

/** Fails fast at request time if the mail path was never configured. */
function missingEnv(): string[] {
  return ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_TO', 'CONTACT_FROM'].filter(
    (key) => !process.env[key],
  )
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests', kind: 'rate-limited' }, { status: 429 })
  }

  // Catches the deploy-time mistake of forgetting these in Vercel, and reports
  // it as `blocked` rather than letting it surface as a confusing SMTP error.
  const missing = missingEnv()
  if (missing.length > 0) {
    console.error(`Contact form is not configured — missing env: ${missing.join(', ')}`)
    return NextResponse.json({ error: 'Email is unavailable', kind: 'blocked' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { name, email, message } = result.data

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <br />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    })
  } catch (err) {
    const kind = classify(err)
    const { code, responseCode, command } = (err ?? {}) as MailError

    // Server-side log carries the diagnostic detail; the response deliberately
    // does not, so SMTP internals never reach the browser.
    console.error(
      `Failed to send email [${kind}] code=${code ?? '—'} responseCode=${responseCode ?? '—'} command=${command ?? '—'}`,
      err,
    )

    // 503 for a broken mail path (the server is at fault and it won't fix itself
    // on retry); 502 for an upstream rejection; 500 for anything transient.
    const status = kind === 'blocked' ? 503 : kind === 'rejected' ? 502 : 500

    return NextResponse.json({ error: 'Failed to send email', kind }, { status })
  }

  return NextResponse.json({ ok: true })
}
