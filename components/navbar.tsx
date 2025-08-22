"use client"

import type React from "react"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Github, Mail, Linkedin } from "lucide-react"
import { motion } from "framer-motion"

const links = [
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

const HEADER_HEIGHT = 64 // h-16

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<string>("#home")
  const [underline, setUnderline] = useState<{ width: number; left: number } | null>(null)
  const isProgrammatic = useRef(false)

  // Smooth scroll on click
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()

    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - 8

    // Guard scroll updates, set active immediately for correct underline
    isProgrammatic.current = true
    setActive(href)
    updateUnderline(href)

    window.history.replaceState(null, "", href)
    window.scrollTo({ top, behavior: "smooth" })

    // Release guard after scroll finishes (fallback timeout for browsers without 'scrollend')
    const release = () => {
      isProgrammatic.current = false
      window.removeEventListener("scrollend", release as any)
    }
    // 'scrollend' is supported in modern Chromium. Keep a timeout fallback.
    window.addEventListener("scrollend", release as any, { once: true } as any)
    setTimeout(release, 700)
  }

  // Determine active section using a target line just below the header
  const computeActive = () => {
    const targetY = HEADER_HEIGHT + 12
    for (const l of links) {
      if (!l.href.startsWith("#")) continue
      const el = document.getElementById(l.href.slice(1))
      if (!el) continue
      const rect = el.getBoundingClientRect()
      const top = rect.top
      const bottom = rect.bottom
      if (top - 1 <= targetY && bottom + 1 >= targetY) {
        return l.href
      }
    }
    // Fallback to first section if none matched (e.g., very top or bottom)
    if (window.scrollY <= 2) return "#home"
    return links[links.length - 1].href
  }

  const updateUnderline = (href: string) => {
    const nav = containerRef.current
    if (!nav) return
    const linkEl = nav.querySelector<HTMLAnchorElement>(`a[href="${href}"]`)
    if (!linkEl) return
    const rect = linkEl.getBoundingClientRect()
    const parentRect = nav.getBoundingClientRect()
    setUnderline({ width: rect.width, left: rect.left - parentRect.left })
  }

  useEffect(() => {
    const onScroll = () => {
      if (isProgrammatic.current) return
      const current = computeActive()
      if (current !== active) {
        setActive(current)
        updateUnderline(current)
      }
    }
    const onResize = () => updateUnderline(active)
    const onHash = () => {
      const current = computeActive()
      setActive(current)
      updateUnderline(current)
    }

    const onAppNavigate = (e: Event) => {
      const detail = (e as CustomEvent).detail as { href?: string } | undefined
      if (!detail?.href) return
      isProgrammatic.current = true
      setActive(detail.href)
      updateUnderline(detail.href)
      setTimeout(() => {
        isProgrammatic.current = false
      }, 700)
    }

    // init
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    window.addEventListener("hashchange", onHash)
    window.addEventListener("app:navigate-section", onAppNavigate as EventListener)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("hashchange", onHash)
      window.removeEventListener("app:navigate-section", onAppNavigate as EventListener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Ensure underline is positioned on first paint
    const id = requestAnimationFrame(() => updateUnderline(active))
    return () => cancelAnimationFrame(id)
  }, [active])

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur bg-background/70 border-b border-border/50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="#home" className="font-semibold tracking-tight">
            <span className="text-[15px] sm:text-base">
              {"<"}Madhan<span className="text-primary">.dev</span>
              {"/>"}
            </span>
          </Link>

          <div ref={containerRef} className="relative hidden md:flex items-center gap-6 text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "relative transition-colors hover:text-primary",
                  active === l.href ? "text-primary" : "text-foreground/80",
                )}
                onClick={(e) => handleLinkClick(e, l.href)}
                data-magnetic
              >
                {l.label}
              </a>
            ))}
            <motion.span
              className="absolute -bottom-1 h-[2px] rounded-full bg-primary/90 shadow-[0_0_16px_theme(colors.primary/60)]"
              animate={{ width: underline?.width ?? 0, x: underline?.left ?? 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/MADHANKUMAR-C"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="opacity-80 hover:opacity-100 transition-opacity"
              data-magnetic
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/madhankumar-c-601132273"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="opacity-80 hover:opacity-100 transition-opacity"
              data-magnetic
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:madhankumar8825487841@gmail.com"
              aria-label="Email"
              className="opacity-80 hover:opacity-100 transition-opacity"
              data-magnetic
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
