"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"

export default function BackgroundGradient() {
  const { scrollYProgress } = useScroll()
  const { theme } = useTheme()

  const darkGradients = [
    "radial-gradient(60% 40% at 20% 10%, rgba(99,102,241,0.35), transparent), radial-gradient(40% 40% at 80% 20%, rgba(6,182,212,0.30), transparent)",
    "radial-gradient(60% 40% at 80% 10%, rgba(6,182,212,0.35), transparent), radial-gradient(40% 40% at 20% 60%, rgba(147,51,234,0.30), transparent)",
    "radial-gradient(60% 40% at 50% 80%, rgba(147,51,234,0.35), transparent), radial-gradient(40% 40% at 50% 20%, rgba(6,182,212,0.30), transparent)",
  ]
  const lightGradients = [
    "radial-gradient(60% 40% at 20% 10%, rgba(108,160,255,0.25), transparent), radial-gradient(40% 40% at 80% 20%, rgba(150,160,180,0.20), transparent)",
    "radial-gradient(60% 40% at 80% 10%, rgba(150,160,180,0.25), transparent), radial-gradient(40% 40% at 20% 60%, rgba(108,160,255,0.20), transparent)",
    "radial-gradient(60% 40% at 50% 80%, rgba(108,160,255,0.25), transparent), radial-gradient(40% 40% at 50% 20%, rgba(150,160,180,0.20), transparent)",
  ]

  const bg = useTransform(scrollYProgress, [0, 0.5, 1], theme === "light" ? lightGradients : darkGradients)

  return <motion.div aria-hidden className="fixed inset-0 -z-10 bg-background" style={{ backgroundImage: bg as any }} />
}
