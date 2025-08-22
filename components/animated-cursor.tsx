"use client"

import { useEffect, useRef, useState } from "react"

export default function AnimatedCursor() {
  const dot = useRef<HTMLDivElement | null>(null)
  const ring = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 })
  const lastSpark = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      // Particle trail (throttled)
      const now = performance.now()
      if (now - lastSpark.current > 50) {
        spawnSpark(e.clientX, e.clientY)
        lastSpark.current = now
      }
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useEffect(() => {
    let raf = 0
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b
    const loop = () => {
      setRingPos((p) => ({ x: lerp(p.x, pos.x, 0.15), y: lerp(p.y, pos.y, 0.15) }))
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [pos.x, pos.y])

  useEffect(() => {
    // Magnetic effect
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"))
    const enter = (el: HTMLElement) => {
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const relX = e.clientX - (rect.left + rect.width / 2)
        const relY = e.clientY - (rect.top + rect.height / 2)
        el.style.transform = `translate(${relX * 0.1}px, ${relY * 0.1}px)`
      }
      const leave = () => {
        el.style.transform = "translate(0, 0)"
        el.removeEventListener("mousemove", onMove)
        el.removeEventListener("mouseleave", leave)
      }
      el.addEventListener("mousemove", onMove)
      el.addEventListener("mouseleave", leave)
    }
    els.forEach((el) => {
      el.addEventListener("mouseenter", () => enter(el))
    })
    return () => {
      els.forEach((el) => el.replaceWith(el.cloneNode(true)))
    }
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const ripple = document.createElement("span")
      ripple.className =
        "pointer-events-none fixed rounded-full border border-primary/50 opacity-70 -translate-x-1/2 -translate-y-1/2"
      const size = 20
      ripple.style.left = `${e.clientX}px`
      ripple.style.top = `${e.clientY}px`
      ripple.style.width = `${size}px`
      ripple.style.height = `${size}px`
      ripple.animate(
        [
          { transform: "translate(-50%, -50%) scale(0.5)", opacity: 0.7 },
          { transform: "translate(-50%, -50%) scale(8)", opacity: 0 },
        ],
        { duration: 600, easing: "cubic-bezier(.22,.61,.36,1)" },
      )
      document.body.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    }
    window.addEventListener("click", onClick)
    return () => window.removeEventListener("click", onClick)
  }, [])

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed z-[60] hidden sm:block"
        style={{
          transform: `translate(${ringPos.x - 15}px, ${ringPos.y - 15}px)`,
        }}
      >
        <div className="h-8 w-8 rounded-full border border-primary/40 shadow-[0_0_24px_rgba(99,102,241,0.45)]" />
      </div>
      <div
        ref={dot}
        className="pointer-events-none fixed z-[60] hidden sm:block"
        style={{
          transform: `translate(${pos.x - 3}px, ${pos.y - 3}px)`,
        }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_16px_rgba(6,182,212,0.6)]" />
      </div>
    </>
  )
}

function spawnSpark(x: number, y: number) {
  const spark = document.createElement("span")
  spark.className = "pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full"
  spark.style.left = `${x}px`
  spark.style.top = `${y}px`
  const size = 3 + Math.random() * 4
  spark.style.width = `${size}px`
  spark.style.height = `${size}px`
  spark.style.background = Math.random() > 0.5 ? "rgba(99,102,241,0.8)" : "rgba(34,211,238,0.8)"
  spark.style.filter = "blur(0.5px)"
  document.body.appendChild(spark)
  spark.animate(
    [
      { transform: "translate(-50%,-50%) scale(1)", opacity: 0.9 },
      { transform: `translate(-50%,-70%) scale(${1 + Math.random() * 0.6})`, opacity: 0 },
    ],
    { duration: 500 + Math.random() * 300, easing: "cubic-bezier(.22,.61,.36,1)" },
  )
  setTimeout(() => spark.remove(), 900)
}
