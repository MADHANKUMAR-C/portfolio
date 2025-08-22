"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Briefcase, MessageCircle, Send, X } from "lucide-react"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function FloatingCTA() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to get response")
      }

      const responseText = await res.text()

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: responseText || "I'm here to help with portfolio-related questions.",
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch {
      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "I couldn't reach the AI service right now. Please try again shortly.",
      }
      setMessages((prev) => [...prev, assistantMsg])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-[88vw] max-w-md rounded-2xl border border-border/60 bg-background/95 backdrop-blur shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
            <div className="font-semibold">AI Assistant</div>
            <button className="opacity-70 hover:opacity-100" onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-[50vh] overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="text-sm text-muted-foreground">Ask me about my skills, projects, or blog posts!</div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`text-sm ${m.role === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block px-3 py-2 rounded-lg whitespace-pre-line ${
                    m.role === "user" ? "bg-primary/20 border border-primary/30" : "bg-muted/50 border border-border/60"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex items-center gap-2 px-3 pb-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 text-sm px-3 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-60"
              disabled={isLoading}
              data-magnetic
            >
              <Send className="h-4 w-4" />
              Send
            </button>
          </form>
        </div>
      )}

      <div className="flex flex-col gap-3 items-end animate-fade-in-up">
        {/* Chatbot button (top) */}
        <button
          className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90 pointer-events-auto transform transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] animate-bounce-gentle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Open chat"
        >
          <MessageCircle className="h-5 w-5" />
        </button>

        {/* Hire Me button (bottom) */}
        <div className="pointer-events-auto">
          <Button
            asChild
            className="animate-pulse-slow shadow-[0_0_24px_rgba(99,102,241,0.35)] transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            data-magnetic
          >
            <a href="#contact">
              <Briefcase className="h-4 w-4 mr-2" />
              Hire Me
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
