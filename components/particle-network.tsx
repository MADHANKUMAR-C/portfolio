"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

type P = { x: number; y: number; vx: number; vy: number }

export default function ParticleNetwork() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext("2d")!
    let w = (canvas.width = canvas.offsetWidth)
    let h = (canvas.height = Math.max(300, canvas.offsetHeight))
    const count = Math.min(100, Math.floor((w * h) / 12000))
    const particles: P[] = []
    const mouse = { x: -9999, y: -9999 }

    const colorPrimary = theme === "light" ? "rgba(108,160,255,0.9)" : "rgba(99,102,241,0.9)" // soft blue vs purple
    const colorSecondary = theme === "light" ? "rgba(120,130,150,0.6)" : "rgba(34,211,238,0.9)" // gray vs neon cyan

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = Math.max(300, canvas.offsetHeight)
    }
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    window.addEventListener("resize", resize)
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mouseleave", onMouseLeave)

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      })
    }

    let raf = 0
    const step = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        // draw point
        ctx.fillStyle = colorPrimary
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist2 = dx * dx + dy * dy
          if (dist2 < 120 * 120) {
            const alpha = 1 - Math.sqrt(dist2) / 120
            ctx.strokeStyle = colorSecondary.replace("0.9", (0.25 + alpha * 0.35).toFixed(2))
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // mouse attractor
      if (mouse.x > 0) {
        for (const p of particles) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 140 * 140) {
            p.vx += -dx * 0.00002
            p.vy += -dy * 0.00002
          }
        }
      }

      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", onMouseMove)
      canvas.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [theme])

  return <canvas ref={ref} className="w-full h-[320px] sm:h-[380px] md:h-[420px]"></canvas>
}
