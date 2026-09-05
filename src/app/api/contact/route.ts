import { site } from '@/lib/site'

/**
 * Server-side contact relay. The browser posts here instead of straight to
 * formsubmit.co, so submissions get validated and rate-limited before any
 * third party sees them. Swapping the upstream (Resend, Postmark, …) is a
 * change to `deliver` alone.
 */

const MAX_LENGTHS = { name: 100, email: 200, message: 5000 } as const
const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 }

// Per-instance only — a serverless fleet gives each instance its own map.
// Enough to blunt a naive flood; not a substitute for an edge WAF.
const hits = new Map<string, number[]>()

function recentHits(ip: string) {
  const now = Date.now()
  return (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs)
}

function rateLimited(ip: string) {
  return recentHits(ip).length >= RATE_LIMIT.max
}

// Only delivered messages count against the limit, so someone who fumbles
// their own email address a few times does not lock themselves out.
function recordDelivery(ip: string) {
  hits.set(ip, [...recentHits(ip), Date.now()])
  if (hits.size > 5000) hits.clear()
}

async function deliver(fields: { name: string; email: string; message: string }) {
  const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...fields,
      _subject: `New message from ${new URL(site.siteUrl).host}`,
      _template: 'table',
    }),
  })
  if (!res.ok) throw new Error(`upstream ${res.status}`)
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (rateLimited(ip)) {
    return Response.json({ error: 'Too many messages. Try again later.' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: a real person never fills a field they cannot see.
  if (typeof body._honey === 'string' && body._honey.length > 0) {
    return Response.json({ ok: true })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name || !email || !message) {
    return Response.json({ error: 'Every field is required.' }, { status: 400 })
  }
  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    message.length > MAX_LENGTHS.message
  ) {
    return Response.json({ error: 'That message is too long.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'That email address looks wrong.' }, { status: 400 })
  }

  try {
    recordDelivery(ip)
    await deliver({ name, email, message })
  } catch {
    return Response.json({ error: 'Delivery failed.' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
