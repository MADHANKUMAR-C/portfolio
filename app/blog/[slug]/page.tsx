import { notFound } from "next/navigation"
import { getPostBySlug } from "@/lib/blog"
import { remark } from "remark"
import html from "remark-html"

export async function generateStaticParams() {
  const { getAllPosts } = await import("@/lib/blog")
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()

  const processed = await remark().use(html).process(post.content)
  const contentHtml = processed.toString()

  return (
    <article className="container mx-auto px-4 max-w-3xl py-24">
      <h1 className="text-3xl font-bold">{post.frontmatter.title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{new Date(post.frontmatter.date).toLocaleDateString()}</p>
      <div
        className="prose prose-neutral dark:prose-invert mt-6 max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  )
}
