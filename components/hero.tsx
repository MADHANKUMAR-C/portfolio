"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Download } from "lucide-react"

const TAGLINE = "Adaptable Web Developer passionate about AI, Blockchain, and Cybersecurity"
const NAME = "MADHANKUMAR C"

function useTypingEffect(text: string, speed = 40) {
  const [display, setDisplay] = useState("")
  useEffect(() => {
    let i = 0
    let cancelled = false
    const tick = () => {
      if (cancelled) return
      if (i < text.length) {
        setDisplay((prev) => prev + text.charAt(i))
        i += 1
        setTimeout(tick, speed)
      } else {
        setDisplay(text)
      }
    }
    setDisplay("")
    tick()
    return () => {
      cancelled = true
    }
  }, [text, speed])
  return display
}

export default function Hero() {
  const name = useTypingEffect(NAME, 70)
  const tagline = useTypingEffect(TAGLINE, 12)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-background/40 to-background/80 backdrop-blur-sm">
      <div className="relative px-6 py-20 sm:px-10 sm:py-28 md:py-36">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.1 }}
        >
          {name}
          <span className="sr-only">{NAME}</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-lg sm:text-xl max-w-3xl text-muted-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.3 }}
        >
          {tagline}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.5 }}
        >
          <Button asChild size="lg" className="glow-button" data-magnetic>
            <a href="/api/resume" download>
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
          <Button variant="outline" asChild size="lg" data-magnetic>
            <a href="#contact">Contact Me</a>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
