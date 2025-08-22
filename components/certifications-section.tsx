"use client"

import Tilt from "react-parallax-tilt"
import SectionReveal from "@/components/section-reveal"
import { Award, ShieldCheck } from "lucide-react"

const certs = [
  {
    title: "Oracle APEX Cloud Developer Certified Professional",
    org: "Oracle University",
    id: "101647060APEX24CDOCP",
    date: "May 15, 2025",
  },
]

export default function CertificationsSection() {
  return (
    <div>
      <SectionReveal>
        <h2 className="text-2xl font-semibold mb-6">Certifications & Achievements</h2>
      </SectionReveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative isolate overflow-hidden">
        {certs.map((c, i) => (
          <SectionReveal key={c.title} delay={i * 0.06}>
            <Tilt glareEnable glareMaxOpacity={0.2} className="h-full">
              <div className="h-full rounded-xl border border-border/60 p-5 bg-card/70 hover:bg-card/90 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Oracle Certified</span>
                </div>
                <h3 className="font-medium text-sm leading-tight mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.org}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.date}</p>
                <div className="text-xs mt-3 inline-flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>ID: {c.id}</span>
                </div>
              </div>
            </Tilt>
          </SectionReveal>
        ))}
      </div>
    </div>
  )
}
