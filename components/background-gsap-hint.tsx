"use client"

// This optional component illustrates GSAP usage; we keep it minimal to avoid heavy bundles.
// You can expand GSAP animations as needed.
import { useEffect } from "react"
import gsap from "gsap"

export default function BackgroundGsapHint() {
  useEffect(() => {
    gsap.fromTo(
      "h1, h2",
      { opacity: 0, y: 8, clipPath: "inset(0 100% 0 0)" },
      { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 0.8, stagger: 0.05, ease: "power3.out" },
    )
  }, [])
  return null
}
