import { NextResponse, type NextRequest } from 'next/server'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SUBSTACK_PUBLICATION_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/

export async function POST(request: NextRequest) {
  const publication = process.env.SUBSTACK_PUBLICATION?.trim().toLowerCase()
  if (!publication) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  if (!SUBSTACK_PUBLICATION_PATTERN.test(publication)) {
    return NextResponse.json({ error: 'invalid_publication' }, { status: 503 })
  }

  let email: string
  try {
    const body = await request.json()
    email = String(body?.email ?? '').trim().toLowerCase()
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
  }

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const sourceUrl = new URL('/blog', request.url).toString()

  try {
    const res = await fetch(`https://${publication}.substack.com/api/v1/free`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        first_url: sourceUrl,
        first_referrer: '',
        current_url: sourceUrl,
        current_referrer: '',
        referral_code: '',
        source: 'embed',
      }),
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'substack_failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'network_error' }, { status: 502 })
  }
}
