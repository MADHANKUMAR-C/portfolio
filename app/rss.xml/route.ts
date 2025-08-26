import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/blog"

export async function GET() {
  const site = "https://madhankumarc.vercel.com"
  const posts = await getAllPosts()

  const items = posts
    .map((p) => {
      const url = `${site}/blog/${p.slug}`
      return `
<item>
  <title>${escapeXml(p.frontmatter.title)}</title>
  <link>${url}</link>
  <guid>${url}</guid>
  <pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
  <description>${escapeXml(p.frontmatter.description || "")}</description>
</item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Madhan Kumar — Blog</title>
  <link>${site}</link>
  <description>Updates and articles by Madhan Kumar</description>
  ${items}
</channel>
</rss>`

  return new NextResponse(xml, {
    status: 200,
    headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=600" },
  })
}

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
