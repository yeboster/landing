# api

## Overview

Groups the site's server-side JSON route handlers under `/api`. This directory has no source files of its own. Each child is a single `route.ts` that proxies one third-party API, caches the result with an exported `revalidate` value, and returns `502` with an empty body on upstream failure.

## Subdirectories & Boundaries

- github-stats: [./github-stats/README.md](./github-stats/README.md) - `GET /api/github-stats`. Returns `{ public_repos, followers, stars }` for GitHub user `yeboster` from two unauthenticated `api.github.com` calls. `revalidate = 3600`.
- paris-weather: [./paris-weather/README.md](./paris-weather/README.md) - `GET /api/paris-weather`. Returns `{ temperature, code }` for fixed Paris coordinates from `api.open-meteo.com`. `revalidate = 900`.
