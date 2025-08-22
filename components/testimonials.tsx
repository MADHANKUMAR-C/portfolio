import SectionReveal from "@/components/section-reveal"

export default function Testimonials() {
  return (
    <div>
      <SectionReveal>
        <h2 className="text-2xl font-semibold mb-6">Testimonials</h2>
      </SectionReveal>
      <SectionReveal delay={0.05} className="rounded-xl border border-border/60 p-6 text-muted-foreground">
        Coming soon — This section will feature feedback from peers, mentors, and clients.
      </SectionReveal>
    </div>
  )
}
