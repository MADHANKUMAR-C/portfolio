import type { NextRequest } from "next/server"

// Hard lock to your profile unless overridden by env
const DEFAULT_USER = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "MADHANKUMAR-C"

export async function GET(_req: NextRequest) {
  const username = DEFAULT_USER

  const url = `https://api.github.com/users/${encodeURIComponent(
    username,
  )}/repos?per_page=100&sort=updated&direction=desc`

  const headers: Record<string, string> = {
    "User-Agent": "madhan-portfolio",
    Accept: "application/vnd.github+json",
  }

  // Optional server-only token for higher rate limits
  const token = process.env.GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(url, { headers, cache: "no-store" })
  if (!res.ok) {
    return new Response(JSON.stringify({ repos: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  }

  const repos = (await res.json()) as any[]
  const top = repos
    .filter((r) => !r.fork)
    .sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
    .slice(0, 6)
    .map((r) => ({
      id: r.id,
      name: r.name,
      html_url: r.html_url,
      stargazers_count: r.stargazers_count,
      language: r.language,
      description: r.description,
      updated_at: r.updated_at,
    }))

  return new Response(JSON.stringify({ repos: top }), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}
