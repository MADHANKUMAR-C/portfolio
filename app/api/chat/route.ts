import type { NextRequest } from "next/server"
import { getAllPosts } from "@/lib/blog"
import { siteData } from "@/lib/site-data"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ""

    // Get portfolio data
    const posts = await getAllPosts()

    let response = ""

    // Rule-based responses for common questions
    if (lastMessage.includes("name") || lastMessage.includes("who")) {
      response = `Hi! I'm ${siteData.name}. ${siteData.bio}`
    } else if (
      lastMessage.includes("contact") ||
      lastMessage.includes("reach") ||
      lastMessage.includes("email") ||
      lastMessage.includes("phone")
    ) {
      response = `You can contact ${siteData.name} through:\n• Email: madhankumar.c@outlook.com\n• Phone: 8825487841\n• LinkedIn: ${siteData.linkedin}\n• Or use the contact form at the bottom of this portfolio!`
    } else if (lastMessage.includes("skill") || lastMessage.includes("technology") || lastMessage.includes("tech")) {
      response = `${siteData.name} has expertise in: ${siteData.skills.join(", ")}. Check out the Skills & Tech Stack section for detailed proficiency levels!`
    } else if (lastMessage.includes("project") || lastMessage.includes("work") || lastMessage.includes("portfolio")) {
      const projectList = siteData.projects.map((p) => `• ${p.title}: ${p.desc}`).join("\n")
      response = `Here are some of ${siteData.name}'s key projects:\n${projectList}\n\nScroll to the Projects section to see more details!`
    } else if (lastMessage.includes("blog") || lastMessage.includes("article") || lastMessage.includes("post")) {
      const blogList = posts
        .slice(0, 3)
        .map((p) => `• ${p.frontmatter.title}`)
        .join("\n")
      response = `${siteData.name} has written several blog posts:\n${blogList}\n\nCheck out the Blog section to read them!`
    } else if (lastMessage.includes("education") || lastMessage.includes("college") || lastMessage.includes("study")) {
      response = `${siteData.name} is currently pursuing Computer Science and Design at Kongu Engineering College, Perundurai (2023-2027). Previously completed 12th grade in Computer Science from TGHSS, Tiruppur (2022-2023).`
    } else if (
      lastMessage.includes("experience") ||
      lastMessage.includes("internship") ||
      lastMessage.includes("job")
    ) {
      response = `${siteData.name} is a passionate web developer with experience in full-stack development, AI/ML, and ethical hacking. Check out the Journey Timeline section to see the complete career progression!`
    } else if (lastMessage.includes("certification") || lastMessage.includes("certificate")) {
      response = `${siteData.name} is an Oracle APEX Cloud Developer Certified Professional. You can view the certification details in the Certifications section!`
    } else if (lastMessage.includes("github") || lastMessage.includes("code") || lastMessage.includes("repository")) {
      response = `You can find ${siteData.name}'s code and projects on GitHub: ${siteData.github}. Also check out the LeetCode profile: https://leetcode.com/u/madhankumarc/`
    } else if (lastMessage.includes("hello") || lastMessage.includes("hi") || lastMessage.includes("hey")) {
      response = `Hello! I'm ${siteData.name}'s AI assistant. I can help you learn about ${siteData.name}'s skills, projects, experience, and contact information. What would you like to know?`
    } else if (lastMessage.includes("help") || lastMessage.includes("what can you do")) {
      response = `I can help you with information about:\n• ${siteData.name}'s background and bio\n• Skills and technologies\n• Projects and work\n• Education and certifications\n• Contact information\n• Blog posts and articles\n\nJust ask me anything about the portfolio!`
    } else {
      response = `I'm ${siteData.name}'s portfolio assistant! I can help you learn about skills, projects, experience, education, or contact information. You can also explore different sections of this portfolio like Projects, Blog, Skills, and Journey Timeline. What specific information are you looking for?`
    }

    // Return response in the expected format
    return new Response(response, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
  } catch (error) {
    console.error("Chat error:", error)
    return new Response("Sorry, I encountered an error. Please try again.", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    })
  }
}
