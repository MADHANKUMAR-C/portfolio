"use client"

import SectionReveal from "@/components/section-reveal"
import { GraduationCap, School, Code } from "lucide-react"

const milestones = [
  {
    year: "2022-2023",
    title: "12th Grade - Computer Science",
    icon: School,
    desc: "Completed Computer Science at TGHSS, Tiruppur.",
  },
  {
    year: "2023-2027",
    title: "Computer Science & Design",
    icon: GraduationCap,
    desc: "Pursuing B.E Computer Science and Design at Kongu Engineering College, Perundurai.",
  },
  {
    year: "2025",
    title: "Oracle APEX Certified",
    icon: Code,
    desc: "Achieved Oracle APEX Cloud Developer Certified Professional certification.",
  },
]

export default function JourneyTimeline() {
  return (
    <div>
      <SectionReveal>
        <h2 className="text-2xl font-semibold mb-6">Journey Timeline</h2>
      </SectionReveal>
      <div className="relative before:absolute before:left-4 sm:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-border">
        {milestones.map((m, i) => (
          <SectionReveal key={m.title} delay={i * 0.06} className="relative grid sm:grid-cols-2 gap-4 py-6">
            <div className="flex items-center gap-3 sm:justify-end sm:pr-8">
              <span className="text-sm text-muted-foreground">{m.year}</span>
              <m.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="pl-14 sm:pl-8">
              <h3 className="font-medium">{m.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  )
}
