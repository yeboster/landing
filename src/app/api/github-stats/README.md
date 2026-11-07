# api/github-stats

## Overview

A route handler at `GET /api/github-stats`. On the server, it combines the public GitHub profile and repository data for user `yeboster` and returns three counters as JSON. The result is revalidated hourly.

## Interface

- `[route.ts:GET]` - `async GET()`. On success it returns `Response.json({ public_repos, followers, stars })`, where `stars` is the sum of `stargazers_count` across the fetched repos.
- `[route.ts:revalidate]` - `export const revalidate = 3600`.

## Invariants

- `[route.ts:GET]` - returns `502` with an empty body when the profile request is not `ok`, and also when anything throws (`catch`).
- `[route.ts:GET]` - if the repos request is not `ok`, `repos` falls back to `[]`, so `stars` is `0` and the response is still `200`.
- `[route.ts:GET]` - repos are fetched with `per_page=100` in a single request, with no pagination, so `stars` covers at most the first 100 repos returned.
- `[route.ts:GITHUB_USER]` - the username is hard-coded as `'yeboster'`.

## Side Effects

- `[route.ts:GET]` - two outbound HTTP `fetch` calls, run in parallel, to `https://api.github.com/users/yeboster` and `https://api.github.com/users/yeboster/repos?per_page=100`. Both pass `{ next: { revalidate } }`. No auth headers are sent.

## Verification

- Run: `pnpm verify`
