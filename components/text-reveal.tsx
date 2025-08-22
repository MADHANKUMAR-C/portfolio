"use client"

import { useEffect, useRef } from "react"

export default function TextReveal({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.animate([{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }], {
      duration: 800,
      easing: "cubic-bezier(.22,.61,.36,1)",
    })
  }, [])
  return (
    <span ref={ref} className="inline-block">
      {text}
    </span>
  )
}
