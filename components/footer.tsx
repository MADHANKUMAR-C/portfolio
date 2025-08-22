"use client"

import type { MouseEvent } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Rss, Mail, ArrowUpRight } from "lucide-react"
import { siteData } from "@/lib/site-data"

const HEADER_HEIGHT = 64 // keep in sync with Navbar

function handleLinkClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) return
  e.preventDefault()

  const id = href.slice(1)
  const el = document.getElementById(id)
  if (!el) return

  // Match Navbar's target line at HEADER_HEIGHT + 12
  const targetOffset = HEADER_HEIGHT + 12
  const top = el.getBoundingClientRect().top + window.scrollY - targetOffset

  window.scrollTo({ top, behavior: "smooth" })
  window.history.replaceState(null, "", href)

  // Notify Navbar to immediately set active/underline and guard during smooth scroll
  window.dispatchEvent(new CustomEvent("app:navigate-section", { detail: { href } }))
}

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#blog", label: "Blog" },
  { href: "#timeline", label: "Journey" },
  { href: "#certifications", label: "Certs" },
  { href: "#heatmap", label: "Tech" },
  { href: "#contact", label: "Contact" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-24">
      {/* Glow background */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl opacity-30 bg-[radial-gradient(closest-side,_rgba(124,58,237,0.35),_transparent)]" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full blur-3xl opacity-30 bg-[radial-gradient(closest-side,_rgba(34,211,238,0.25),_transparent)]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur">
          <div className="grid gap-10 p-6 sm:p-8 md:grid-cols-5">
            {/* Brand + resume */}
            <div className="md:col-span-2">
              <div className="text-[15px] sm:text-base font-semibold tracking-tight">
                {"<"}Madhan<span className="text-primary">.dev</span>
                {"/>"}
              </div>
              <p className="mt-3 text-sm text-muted-foreground max-w-prose">{siteData.tagline}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button asChild className="glow-button shadow-[0_0_16px_rgba(124,58,237,0.25)]" data-magnetic>
                  <a href="/api/resume" download>
                    Download Resume
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="glow-button bg-transparent" data-magnetic>
                  <a href="#contact">
                    Get in touch
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick links */}
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium">Quick links</h3>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => handleLinkClick(e, l.href)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-magnetic
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div className="md:col-span-1">
              <h3 className="text-sm font-medium">Elsewhere</h3>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href={siteData.github || "https://github.com/"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="glow-button inline-flex items-center justify-center h-10 w-10 rounded-full border border-border/60 hover:bg-card/70 transition-all duration-300"
                  data-magnetic
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={siteData.linkedin || "https://www.linkedin.com/"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="glow-button inline-flex items-center justify-center h-10 w-10 rounded-full border border-border/60 hover:bg-card/70 transition-all duration-300"
                  data-magnetic
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="/rss.xml"
                  aria-label="RSS feed"
                  className="glow-button inline-flex items-center justify-center h-10 w-10 rounded-full border border-border/60 hover:bg-card/70 transition-all duration-300"
                  data-magnetic
                >
                  <Rss className="h-5 w-5" />
                </a>
                <a
                  href="#contact"
                  aria-label="Email"
                  className="glow-button inline-flex items-center justify-center h-10 w-10 rounded-full border border-border/60 hover:bg-card/70 transition-all duration-300"
                  data-magnetic
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Bottom bar */}
          <div className="flex flex-col gap-3 sm:flex-row items-center justify-between px-6 py-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>
                © {year} {siteData.name}. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#home"
                onClick={(e) => handleLinkClick(e, "#home")}
                className="hover:text-primary transition-colors"
                data-magnetic
              >
                Back to top
              </a>
              <a href="/rss.xml" className="hover:text-primary transition-colors" data-magnetic>
                RSS
              </a>
              <span className="opacity-70">Built with Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
