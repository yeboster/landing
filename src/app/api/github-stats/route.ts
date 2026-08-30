const GITHUB_USER = 'yeboster'

/**
 * Server-side GitHub aggregate, revalidated hourly.
 * Keeps the ~100-repo JSON payload (hundreds of kB) off the client and
 * shares one upstream call across all visitors, so the unauthenticated
 * 60 req/h rate limit is never hit by traffic.
 */
export const revalidate = 3600

type Profile = { public_repos: number; followers: number }
type Repo = { stargazers_count: number }

export async function GET() {
  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, { next: { revalidate } }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`, { next: { revalidate } }),
    ])
    if (!profileRes.ok) return new Response(null, { status: 502 })

    const profile = (await profileRes.json()) as Profile
    const repos = reposRes.ok ? ((await reposRes.json()) as Repo[]) : []

    return Response.json({
      public_repos: profile.public_repos,
      followers: profile.followers,
      stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    })
  } catch {
    return new Response(null, { status: 502 })
  }
}
