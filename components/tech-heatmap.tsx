"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import SectionReveal from "@/components/section-reveal"

const allTechnologies = [
  { label: "React.js", level: 88 },
  { label: "Tailwind CSS", level: 90 },
  { label: "Node.js", level: 80 },
  { label: "MongoDB", level: 75 },
  { label: "Firebase", level: 72 },
  { label: "MERN Stack", level: 80 },
  { label: "REST API Development", level: 85 },
  { label: "Algorithms & Data Structures", level: 78 },
  { label: "Debugging & Optimization", level: 85 },
  { label: "Git & GitHub Workflow", level: 88 },
  { label: "Python & ML Libraries", level: 70 },
  { label: "TensorFlow", level: 65 },
  { label: "AI API Integration", level: 85 },
  { label: "AI Prompt Crafting & Optimization", level: 90 },
  { label: "Vercel", level: 95 },
  { label: "Netlify", level: 92 },
  { label: "Figma", level: 88 },
]

export default function TechHeatmap() {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px", amount: 0.25 })

  useEffect(() => {
    if (inView) {
      controls.start((i: number) => ({
        width: `${i}%`,
        transition: { delay: Math.random() * 0.5, type: "spring", stiffness: 120, damping: 20 },
      }))
    } else {
      controls.set({ width: "0%" })
    }
  }, [inView, controls])

  return (
    <div ref={ref}>
      <SectionReveal>
        <h2 className="text-2xl font-semibold mb-6">Tech Stack Heatmap</h2>
      </SectionReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {allTechnologies.map((tech, index) => (
          <motion.div
            key={tech.label}
            className="p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm cursor-pointer"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              borderColor: "rgba(139, 92, 246, 0.3)",
              boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-sm font-medium">{tech.label}</span>
              <span className="text-muted-foreground text-xs">{tech.level}%</span>
            </div>
            <div className="h-2 w-full rounded bg-muted overflow-hidden">
              <motion.div
                className="h-2 rounded bg-gradient-to-r from-blue-500 to-cyan-400"
                custom={tech.level}
                initial={{ width: "0%" }}
                animate={controls}
                whileHover={{
                  boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
