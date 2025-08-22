import type { Metadata } from "next"
import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsManual from "@/components/projects-manual"
import GithubProjects from "@/components/github-projects"
import BlogList from "@/components/blog-list"
import JourneyTimeline from "@/components/journey-timeline"
import CertificationsSection from "@/components/certifications-section"
import TechHeatmap from "@/components/tech-heatmap"
import Testimonials from "@/components/testimonials"
import ContactForm from "@/components/contact-form"
import FloatingCTA from "@/components/floating-cta"
import Interactive3DBackground from "@/components/interactive-3d-background"
import Footer from "@/components/footer"
import ClientCursor from "@/components/client-cursor"
import { getAllPosts } from "@/lib/blog"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Madhan Kumar",
  alternateName: "MADHANKUMAR C",
  url: "https://example.com",
  jobTitle: "Web Developer",
  sameAs: [
    "https://github.com/MADHANKUMAR-C",
    "https://www.linkedin.com/in/madhankumar-c-601132273",
    "https://leetcode.com/u/madhankumarc/",
    "https://www.hackerrank.com/profile/madhankumar_c",
  ],
}

export const metadata: Metadata = {
  title: "Madhan Kumar — Portfolio",
  description:
    "Adaptable Web Developer passionate about AI, Blockchain, and Cybersecurity. Portfolio of projects, blog, certifications, and contact.",
  openGraph: {
    title: "Madhan Kumar — Portfolio",
    description: "Adaptable Web Developer passionate about AI, Blockchain, and Cybersecurity.",
    url: "https://example.com",
    siteName: "Madhan Kumar Portfolio",
    images: [
      {
        url: "/madhan-kumar-portfolio-og.png",
        width: 1200,
        height: 630,
        alt: "Portfolio cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default async function Page() {
  const posts = await getAllPosts()

  return (
    <main className="relative min-h-screen">
      <Interactive3DBackground />
      <Navbar />
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <section id="home" className="pt-24 scroll-mt-[64px]">
          <Hero />
        </section>

        <section id="about" className="pt-24 scroll-mt-[64px]">
          <AboutSection />
        </section>

        <section id="skills" className="pt-24 scroll-mt-[64px]">
          <SkillsSection />
        </section>

        <section id="projects" className="pt-24 scroll-mt-[64px]">
          <ProjectsManual />
        </section>

        <section id="github" className="pt-24 scroll-mt-[64px]">
          <GithubProjects />
        </section>

        <section id="blog" className="pt-24 scroll-mt-[64px]">
          <Suspense fallback={<div className="py-12 text-center opacity-70">Loading blog…</div>}>
            <BlogList posts={posts} />
          </Suspense>
        </section>

        <section id="timeline" className="pt-24 scroll-mt-[64px]">
          <JourneyTimeline />
        </section>

        <section id="certifications" className="pt-24 scroll-mt-[64px]">
          <CertificationsSection />
        </section>

        <section id="heatmap" className="pt-24 scroll-mt-[64px]">
          <TechHeatmap />
        </section>

        <section id="testimonials" className="pt-24 scroll-mt-[64px]">
          <Testimonials />
        </section>

        <section id="contact" className="pt-24 pb-28 scroll-mt-[64px]">
          <ContactForm />
        </section>
      </div>

      <Footer />
      <FloatingCTA />
      <ClientCursor />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  )
}
