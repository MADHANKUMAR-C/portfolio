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
    notify: "Oracle certified",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=400E1E5C17FB08A550680039C0F5509DBB047318847800EB751364B110F975D2",
  },
  {
    title: "Hackerrank Python",
    org: "Hackerrank",
    id: "EDE54B57546D",
    date: "Aug 23, 2025",
    notify: "Hackerrank",
    link: "https://www.hackerrank.com/certificates/ede54b57546d",
  },
]

export default function CertificationsSection() {
  return (
    <div>
      <SectionReveal>
        <h2 className="text-2xl font-semibold mb-6">Certifications & Achievements</h2>
      </SectionReveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative isolate overflow-visible">
        {certs.map((c, i) => (
          <SectionReveal key={c.title} delay={i * 0.06}>
            <Tilt glareEnable glareMaxOpacity={0.2} className="h-full">
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="h-full rounded-xl border border-border/60 p-5 bg-card/70 hover:bg-card/90 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{c.notify}</span>
                  </div>
                  <h3 className="font-medium text-sm leading-tight mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.org}</p>
                  <p className="text-xs text-muted-foreground mt-1">{c.date}</p>
                  <div className="text-xs mt-3 inline-flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span>ID: {c.id}</span>
                  </div>
                </div>
              </a>
            </Tilt>
          </SectionReveal>
        ))}
      </div>
    </div>
  )
}
