import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Shared Open Graph card renderer. Every page's `opengraph-image.tsx` is a
 * thin wrapper around this, so the cards stay one visual system and a design
 * change happens in a single place.
 */

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const ACCENT = '#9f4f9d'
const ACCENT_LIGHT = '#c06fbe'

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
          backgroundColor: '#111827',
          padding: 72,
          position: 'relative',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Accent glow, echoing the aurora on the live pages. */}
        <div
          style={{
            position: 'absolute',
            top: -260,
            left: 320,
            width: 760,
            height: 620,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${ACCENT}66 0%, ${ACCENT}00 70%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -300,
            left: -160,
            width: 620,
            height: 560,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${ACCENT_LIGHT}33 0%, ${ACCENT_LIGHT}00 70%)`,
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={64} height={64} alt="" />
          <span style={{ fontSize: 30, color: '#9ca3af', letterSpacing: -0.5 }}>bon.so</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: title.length > 32 ? 76 : 96,
              fontWeight: 700,
              color: '#f9fafb',
              letterSpacing: -3,
              lineHeight: 1.05,
              display: 'flex',
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                marginTop: 24,
                fontSize: 32,
                color: '#9ca3af',
                lineHeight: 1.35,
                display: 'flex',
                maxWidth: 900,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 72, height: 6, borderRadius: 3, backgroundColor: ACCENT }} />
          <span style={{ fontSize: 26, color: '#6b7280' }}>Marco Vaccari — Developer &amp; Builder</span>
        </div>
      </div>
    ),
    { ...size, ...(fonts ? { fonts } : {}) },
  )
}
