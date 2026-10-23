import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { site, siteUrl } from '@/lib/site'

/**
 * Shared Open Graph card renderer. Every page's `opengraph-image.tsx` is a
 * thin wrapper around this, so the cards stay one visual system and a design
 * change happens in a single place.
 */

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/*
 * Satori can't read CSS variables, so the card mirrors the dark-theme tokens
 * from globals.css by value. Keep these in step with `.dark` there.
 */
const color = {
  background: '#111827', // --background (dark)
  card: '#1f2937', // --card (dark)
  border: '#374151', // --border (dark)
  foreground: '#f3f4f6', // --foreground (dark)
  muted: '#9ca3af', // --muted-foreground (dark)
  brand: '#9f4f9d', // --brand
  brandInk: '#cb85c9', // --brand-ink (dark)
}

// Inlined at render time: satori cannot resolve site-relative URLs.
const logo = `data:image/svg+xml;base64,${readFileSync(
  join(process.cwd(), 'public/images/logo-light.svg'),
).toString('base64')}`

/**
 * Inter, to match the live pages. Fetched once per build and cached; if the
 * fetch fails the card still renders in satori's fallback face rather than
 * taking the whole build down with it.
 */
const INTER_BOLD =
  'https://github.com/rsms/inter/raw/v3.19/docs/font-files/Inter-Bold.woff'
const INTER_REGULAR =
  'https://github.com/rsms/inter/raw/v3.19/docs/font-files/Inter-Regular.woff'

type Font = { name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' }

let fontsPromise: Promise<Font[] | undefined> | undefined

async function loadFonts() {
  try {
    const [bold, regular] = await Promise.all(
      [INTER_BOLD, INTER_REGULAR].map(async (url) => {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`font ${res.status}`)
        return res.arrayBuffer()
      }),
    )
    return [
      { name: 'Inter', data: regular, weight: 400 as const, style: 'normal' as const },
      { name: 'Inter', data: bold, weight: 700 as const, style: 'normal' as const },
    ]
  } catch {
    return undefined
  }
}

const domain = new URL(siteUrl).host

export async function ogImage({ title, subtitle }: { title: string; subtitle?: string }) {
  fontsPromise ??= loadFonts()
  const fonts = await fontsPromise
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: color.background,
          padding: 72,
          position: 'relative',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* One soft brand glow, like the aurora behind the live heroes. */}
        <div
          style={{
            position: 'absolute',
            top: -320,
            right: -200,
            width: 900,
            height: 720,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color.brand}59 0%, ${color.brand}00 70%)`,
          }}
        />
        {/* Brand hairline along the top edge, as on the site footer. */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${color.brand}00, ${color.brand}, ${color.brand}00)`,
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={56} height={56} alt="" />
            <span style={{ fontSize: 28, fontWeight: 700, color: color.foreground, letterSpacing: -0.5 }}>{site.person}</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 22px',
              borderRadius: 999,
              border: `1px solid ${color.border}`,
              backgroundColor: color.card,
              fontSize: 22,
              color: color.muted,
            }}
          >
            {domain}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: title.length > 32 ? 72 : 92,
              fontWeight: 700,
              color: color.foreground,
              letterSpacing: -3,
              lineHeight: 1.05,
              display: 'flex',
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                marginTop: 24,
                fontSize: 30,
                color: color.muted,
                lineHeight: 1.4,
                display: 'flex',
                maxWidth: 920,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: color.brand }} />
          <span style={{ fontSize: 24, color: color.muted }}>{`${site.role} at ${site.company}`}</span>
          <span style={{ fontSize: 24, color: color.border }}>·</span>
          <span style={{ fontSize: 24, color: color.brandInk }}>{site.name}</span>
        </div>
      </div>
    ),
    { ...size, ...(fonts ? { fonts } : {}) },
  )
}
