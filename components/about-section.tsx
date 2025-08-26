"use client"

import Image from "next/image"
import SectionReveal from "@/components/section-reveal"

export default function AboutSection() {
  return (
    <div className="grid md:grid-cols-3 gap-8 items-center">
      <SectionReveal className="md:col-span-2" delay={0.05}>
        <h2 className="text-2xl font-semibold mb-3">About Me</h2>
        <p className="text-muted-foreground leading-relaxed">
          Detail-oriented Computer Science and Design student with expertise in web and full-stack app development
          and cloud computing. Strong logical thinking skills with a focus on continuous learning and
          innovation.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href="https://github.com/MADHANKUMAR-C"
            target="_blank"
            rel="noreferrer"
            className="glow-button inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border/60 hover:bg-card/70 transition-all duration-300"
            data-magnetic
          >
            <Image src="/brands/github.png" alt="GitHub" width={18} height={18} />
            <span className="text-sm">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/madhankumar-c/"
            target="_blank"
            rel="noreferrer"
            className="glow-button inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border/60 hover:bg-card/70 transition-all duration-300"
            data-magnetic
          >
            <Image src="/brands/linkedin.png" alt="LinkedIn" width={18} height={18} />
            <span className="text-sm">LinkedIn</span>
          </a>
          <a
            href="https://leetcode.com/u/madhankumarc/"
            target="_blank"
            rel="noreferrer"
            className="glow-button inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border/60 hover:bg-card/70 transition-all duration-300"
            data-magnetic
          >
            <Image src="/brands/leetcode.png" alt="LeetCode" width={18} height={18} />
            <span className="text-sm">LeetCode</span>
          </a>
          <a
            href="https://www.hackerrank.com/profile/madhankumar_c"
            target="_blank"
            rel="noreferrer"
            className="glow-button inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border/60 hover:bg-card/70 transition-all duration-300"
            data-magnetic
          >
            <Image src="/brands/hackerrank.png" alt="HackerRank" width={18} height={18} />
            <span className="text-sm">HackerRank</span>
          </a>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.1} className="justify-self-center">
        <Image
          src="/madhan.jpg"
          alt="Profile photo of Madhan Kumar"
          width={320}
          height={320}
          className="rounded-xl ring-1 ring-border/60 shadow-lg object-cover"
          loading="lazy"
        />
      </SectionReveal>
    </div>
  )
}
