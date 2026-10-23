'use client'

import { useEffect, useState } from 'react'

import { site } from '@/lib/site'

type Weather = { emoji: string; label: string; temp: number }

const WEATHER_MAP: Record<number, { emoji: string; label: string }> = {
  0: { emoji: '☀️', label: 'clear' },
  1: { emoji: '🌤️', label: 'mostly clear' },
  2: { emoji: '⛅', label: 'partly cloudy' },
  3: { emoji: '☁️', label: 'overcast' },
  45: { emoji: '🌫️', label: 'foggy' },
  48: { emoji: '🌫️', label: 'foggy' },
  51: { emoji: '🌦️', label: 'drizzle' },
  53: { emoji: '🌦️', label: 'drizzle' },
  55: { emoji: '🌦️', label: 'drizzle' },
  61: { emoji: '🌧️', label: 'rain' },
  63: { emoji: '🌧️', label: 'rain' },
  65: { emoji: '🌧️', label: 'heavy rain' },
  71: { emoji: '🌨️', label: 'snow' },
  73: { emoji: '🌨️', label: 'snow' },
  75: { emoji: '🌨️', label: 'heavy snow' },
  80: { emoji: '🌦️', label: 'showers' },
  81: { emoji: '🌦️', label: 'showers' },
  82: { emoji: '⛈️', label: 'violent showers' },
  95: { emoji: '⛈️', label: 'thunderstorm' },
}

function weatherFromCode(code: number) {
  return WEATHER_MAP[code] ?? { emoji: '🌡️', label: 'unknown' }
}

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: site.timezone,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

/**
 * Live pill: pulsing dot + Paris local time (ticking every second) + current
 * weather from /api/paris-weather. Fetch failures degrade silently and never
 * render an error state, same philosophy as GithubStats. The dot's ping is a
 * CSS animation, so the global reduced-motion rule stills it.
 */
export function ParisNow() {
  const [time, setTime] = useState<string | null>(null)
  const [weather, setWeather] = useState<Weather | null>(null)

  useEffect(() => {
    const tick = () => setTime(timeFormatter.format(new Date()))
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let active = true
    fetch('/api/paris-weather')
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data) => {
        if (!active) return
        const { code, temperature } = data as { code?: number; temperature?: number }
        if (typeof code !== 'number' || typeof temperature !== 'number') return
        const { emoji, label } = weatherFromCode(code)
        setWeather({ emoji, label, temp: Math.round(temperature) })
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="inline-flex h-9 items-center gap-3 rounded-full border border-border bg-card/70 px-4 text-sm text-muted-foreground shadow-sm backdrop-blur">
      <span className="relative flex size-2" aria-hidden>
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-brand" />
      </span>
      <span className="font-medium text-foreground">Paris</span>
      {/* Server and first client render show a placeholder so hydration matches. */}
      <span className="font-mono tabular-nums">{time ?? '--:--:--'}</span>
      {weather && (
        <span className="flex items-center gap-1.5">
          <span aria-hidden>{weather.emoji}</span>
          <span className="font-mono tabular-nums text-foreground">{weather.temp}°C</span>
          <span className="hidden sm:inline">{weather.label}</span>
        </span>
      )}
    </div>
  )
}
