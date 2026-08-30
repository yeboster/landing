const OPEN_METEO =
  'https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current=temperature_2m,weather_code'

/**
 * Server-side Paris weather, revalidated every 15 minutes.
 * One upstream call per window instead of one per visitor, and the client
 * skips a third-party DNS + TLS handshake on every page load.
 */
export const revalidate = 900

type Forecast = { current?: { temperature_2m: number; weather_code: number } }

export async function GET() {
  try {
    const res = await fetch(OPEN_METEO, { next: { revalidate } })
    if (!res.ok) return new Response(null, { status: 502 })

    const data = (await res.json()) as Forecast
    if (!data.current) return new Response(null, { status: 502 })

    return Response.json({
      temperature: data.current.temperature_2m,
      code: data.current.weather_code,
    })
  } catch {
    return new Response(null, { status: 502 })
  }
}
