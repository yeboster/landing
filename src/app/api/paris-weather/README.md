# api/paris-weather

## Overview

A route handler at `GET /api/paris-weather`. On the server, it fetches the current Paris temperature and weather code from Open-Meteo and returns them as JSON. The result is revalidated every 15 minutes.

## Interface

- `[route.ts:GET]` - `async GET()`. On success it returns `Response.json({ temperature, code })`, mapped from `current.temperature_2m` and `current.weather_code`.
- `[route.ts:revalidate]` - `export const revalidate = 900`.

## Invariants

- `[route.ts:GET]` - returns `502` with an empty body when the upstream response is not `ok`, when `data.current` is missing, or when anything throws.
- `[route.ts:OPEN_METEO]` - the coordinates are fixed at `latitude=48.8566&longitude=2.3522`, and the requested fields are `current=temperature_2m,weather_code`.

## Side Effects

- `[route.ts:GET]` - one outbound HTTP `fetch` to the `OPEN_METEO` URL (`https://api.open-meteo.com/v1/forecast?...`) with `{ next: { revalidate } }`.

## Verification

- Run: `pnpm verify`
