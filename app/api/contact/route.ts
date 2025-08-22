import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const data = await req.json()

    if (!data || !data.name || !data.email || !data.message) {
      return new Response("Missing required fields", { status: 400 })
    }

    const emailResult = await resend.emails.send({
      from: "onboarding@resend.dev", // Resend's sandbox domain - no verification needed
      to: "madhankumar8825487841@gmail.com", // Your email address
      subject: `Contact Form: ${data.subject || "New Message"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject || "No subject"}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
      `,
      replyTo: data.email, // Allows you to reply directly to the sender
    })

    if (emailResult.error) {
      console.error("Email sending failed:", emailResult.error)
      return new Response("Failed to send email", { status: 500 })
    }

    console.log("Email sent successfully:", emailResult.data?.id)

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
