"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface BlogPost {
  slug: string
  frontmatter: {
    title: string
    description: string
  }
  content: string
}

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Blog</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <button
            key={p.slug}
            onClick={() => setSelectedPost(p)}
            className="rounded-xl border border-border/60 p-5 hover:bg-card/70 transition-colors text-left w-full"
          >
            <h3 className="font-semibold">{p.frontmatter.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{p.frontmatter.description}</p>
            <span className="text-primary text-sm mt-3 inline-block">Read more →</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/5 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background/40 border border-border/30 rounded-xl max-w-4xl max-h-[80vh] overflow-hidden shadow-2xl backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-border/30">
                <div>
                  <h2 className="text-xl font-semibold">{selectedPost.frontmatter.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  {selectedPost.content.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
