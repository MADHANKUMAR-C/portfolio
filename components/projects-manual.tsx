"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import SectionReveal from "@/components/section-reveal"

const projects = [
  {
    title: "Resume-Job Matcher Web App",
    desc: "AI-powered platform that analyzes resumes against job descriptions and provides detailed skill-match percentage with career guidance chatbot.",
    image: "/ai-resume-job-matching-dashboard.png",
    link: "https://github.com/MADHANKUMAR-C/resume-matcher",
    stack: ["Next.js", "Node.js", "Ollama API", "Gemma 2 LLM", "Gemini 1.5 Flash"],
  },
  {
    title: "Hostel Management System",
    desc: "Web-based application for managing hostel operations including room allocation, student records, fee management, and complaint tracking.",
    image: "/hostel-management-dashboard.png",
    link: "https://github.com/MADHANKUMAR-C/Hostel-Management-System",
    stack: ["Python", "MySQL", "HTML", "CSS"],
  },
  {
    title: "Internship & Course Finder App",
    desc: "Mobile app connecting unemployed students and engineers with internships, jobs, and skill-based courses with job matching algorithms.",
    image: "/mobile-job-finder-app.png",
    link: "https://github.com/MADHANKUMAR-C/pathXplore",
    stack: ["Flutter", "Firebase"],
  },
]

export default function ProjectsManual() {
  return (
    <div>
      <SectionReveal>
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>
      </SectionReveal>
      <div className="grid gap-8 md:grid-cols-3">
        {projects.map((p, i) => (
          <SectionReveal
            key={p.title}
            delay={i * 0.06}
            className="group rounded-2xl overflow-hidden border border-border/60 bg-card hover:bg-card/90 transition-colors"
          >
            <a href={p.link} target="_blank" rel="noreferrer" data-magnetic>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={p.image || "/placeholder.svg"}
                  alt={`${p.title} preview`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="100vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.stack.map((s) => (
                    <span key={s} className="text-xs px-2 py-1 rounded-full border border-border bg-background/60">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </SectionReveal>
        ))}
      </div>
    </div>
  )
}
