"use client"

import { useEffect, useState } from "react"
import { Code2, ExternalLink } from "lucide-react"
import SectionReveal from "@/components/section-reveal"

type Repo = {
  id: number
  name: string
  html_url: string
  stargazers_count: number
  language: string | null
  description: string | null
  updated_at: string
}

const DEFAULT_USER = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "MADHANKUMAR-C"

export default function GithubProjects() {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchRepos()
  }, [])

  async function fetchRepos() {
    setLoading(true)
    try {
      // No username param — API is locked to Madhan's account
      const res = await fetch("/api/github")
      const data = await res.json()
      setRepos(data.repos)
    } catch {
      setRepos([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <SectionReveal>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Latest GitHub Projects</h2>
            <p className="text-sm text-muted-foreground mt-1">@{DEFAULT_USER}</p>
          </div>
          {/* Controls removed on purpose to prevent switching accounts */}
        </div>
      </SectionReveal>

      {loading && <div className="py-6 opacity-70">Loading latest repositories…</div>}

      {!loading && repos && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {repos.map((r, i) => (
            <SectionReveal
              key={r.id}
              delay={i * 0.06}
              className="rounded-xl border border-border/60 p-5 hover:bg-card/70 transition-colors group"
            >
              <a href={r.html_url} target="_blank" rel="noreferrer" data-magnetic>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{r.name}</h3>
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100" />
                </div>
                <div className="flex items-center gap-3 mt-3 text-sm">
                  {/* Removed star count display */}
                  {r.language && (
                    <span className="inline-flex items-center gap-1">
                      <Code2 className="h-4 w-4 text-primary" /> {r.language}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Updated {new Date(r.updated_at).toLocaleDateString()}
                </div>
              </a>
            </SectionReveal>
          ))}
        </div>
      )}
    </div>
  )
}
