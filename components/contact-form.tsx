"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import SectionReveal from "@/components/section-reveal"

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: { "content-type": "application/json" },
      })
      if (!res.ok) throw new Error("Failed")
      setStatus("sent")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="max-w-2xl">
      <SectionReveal>
        <h2 className="text-2xl font-semibold mb-6">Contact</h2>
      </SectionReveal>
      <SectionReveal delay={0.05}>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input name="name" placeholder="Your name" required data-magnetic />
            <Input name="email" placeholder="Email address" type="email" required data-magnetic />
          </div>
          <Input name="subject" placeholder="Subject" required data-magnetic />
          <Textarea name="message" placeholder="Your message" rows={5} required data-magnetic />
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={status === "sending"} className="glow-button" data-magnetic>
              <Send className="h-4 w-4 mr-2" />
              {status === "sending" ? "Sending..." : "Send Message"}
            </Button>
            {status === "sent" && <span className="text-green-600 dark:text-green-400">Sent! I will reply soon.</span>}
            {status === "error" && <span className="text-red-600 dark:text-red-400">Something went wrong.</span>}
          </div>
        </form>
      </SectionReveal>
    </div>
  )
}
