"use client"

import SectionReveal from "@/components/section-reveal"
import { Code2, Server, Brain, Clock, Cpu, Rocket, Palette, Zap } from "lucide-react"

const skills = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Modern frontend technologies and responsive design principles",
  },
  {
    icon: Server,
    title: "Full Stack",
    desc: "End-to-end application development with modern frameworks",
  },
  {
    icon: Brain,
    title: "Logical Thinking",
    desc: "Problem-solving and algorithmic thinking approaches",
  },
  { icon: Clock, title: "Time Management", desc: "Project planning and efficient workflow management" },
  {
    icon: Cpu,
    title: "Artificial Intelligence & Machine Learning",
    desc: "AI integration and machine learning fundamentals",
  },
  { icon: Rocket, title: "Deployment", desc: "Cloud platforms and modern deployment strategies" },
  { icon: Zap, title: "Prompt Engineering", desc: "AI prompt optimization and chatbot integration" },
  { icon: Palette, title: "UI/UX Design", desc: "User interface design and user experience principles" },
]

export default function SkillsSection() {
  return (
    <div>
      <SectionReveal>
        <h2 className="text-2xl font-semibold mb-6">Skills & Tech Stack</h2>
      </SectionReveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((s, i) => (
          <SectionReveal
            key={s.title}
            delay={i * 0.06}
            className="rounded-2xl p-6 bg-background/40 backdrop-blur border border-white/10 dark:border-white/10 shadow-lg relative overflow-hidden group"
          >
            <div className="absolute inset-px rounded-2xl bg-gradient-to-br from-[#7c3aed1a] to-[#06b6d41a] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="flex items-center gap-3">
              <s.icon className="h-6 w-6 text-primary" />
              <h3 className="font-medium">{s.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute -inset-20 bg-[radial-gradient(closest-side,_rgba(124,58,237,0.35),_transparent)] blur-3xl" />
              <div className="absolute -inset-24 bg-[radial-gradient(closest-side,_rgba(6,182,212,0.25),_transparent)] blur-3xl" />
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  )
}
