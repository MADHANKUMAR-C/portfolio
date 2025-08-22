"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView, type Variants } from "framer-motion"

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
}

export default function SectionReveal({ children, className = "", delay = 0, duration = 0.6, y = 16 }: Props) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement | null>(null)

  // Observe element visibility with proper ref object
  const inView = useInView(ref, {
    // Reveal when 25% of the element is in view; reset when it leaves
    amount: 0.25,
    margin: "-10% 0px -10% 0px",
  })

  const variants: Variants = {
    hidden: { opacity: 0, y, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  }

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      // Reset to hidden so it animates again when re-entering
      controls.set("hidden")
    }
  }, [inView, controls])

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={controls}
      transition={{ duration, ease: "easeOut", delay }}
      style={{ transformOrigin: "center bottom" }}
    >
      {children}
    </motion.div>
  )
}
