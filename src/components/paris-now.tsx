'use client'

import { useEffect, useState } from 'react'

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
  timeZone: 'Europe/Paris',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

/**
 * Compact live chip: pulsing dot + Paris local time (ticking every second)
 * + current weather from open-meteo. Weather/time fetch failures degrade
 * silently — never renders an error state, same philosophy as GithubStats.
 */
export function ParisNow() {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState('')
  const [weather, setWeather] = useState<Weather | null>(null)

  useEffect(() => {
    setMounted(true)
    setTime(timeFormatter.format(new Date()))
    const interval = setInterval(() => setTime(timeFormatter.format(new Date())), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let active = true
    fetch('https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current=temperature_2m,weather_code')
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data) => {
        if (!active) return
        const code = data?.current?.weather_code
        const temp = data?.current?.temperature_2m
        if (typeof code !== 'number' || typeof temp !== 'number') return
        const { emoji, label } = weatherFromCode(code)
        setWeather({ emoji, label, temp: Math.round(temp) })
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  return (
    <div className="flex h-9 items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9f4f9d] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#9f4f9d]" />
      </span>
      <span className="font-medium text-gray-700 dark:text-gray-200">Paris</span>
      <span className="font-mono tabular-nums">{mounted ? time : '--:--:--'}</span>
      {weather && (
        <span className="flex items-center gap-1">
          <span aria-hidden="true">{weather.emoji}</span>
          {weather.temp}°C
          <span className="text-gray-400 dark:text-gray-500">{weather.label}</span>
        </span>
      )}
    </div>
  )
}
