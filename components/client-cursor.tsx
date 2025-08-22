"use client"

import dynamic from "next/dynamic"

const AnimatedCursor = dynamic(() => import("@/components/animated-cursor"), {
  ssr: false,
})

export default function ClientCursor() {
  return <AnimatedCursor />
}
