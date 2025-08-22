import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Madhan Kumar — Portfolio",
    short_name: "Madhan.dev",
    description: "Portfolio showcasing skills, projects, blog, certifications, and contact for Madhan Kumar.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b12",
    theme_color: "#7C3AED",
    icons: [
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
