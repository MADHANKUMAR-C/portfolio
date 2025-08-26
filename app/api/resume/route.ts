import { promises as fs } from "fs"
import path from "path"

export async function GET() {
  // resolve to the PDF in the same folder as this route
  const filePath = path.join(process.cwd(), "app", "api", "resume", "MADHANKUMAR.pdf")
  const fileBuffer = await fs.readFile(filePath)

return new Response(new Uint8Array(fileBuffer), {
  status: 200,
  headers: {
    "content-type": "application/pdf",
    "content-disposition": "attachment; filename=MADHANKUMAR.pdf",
    "cache-control": "public, max-age=600",
  },
})
}
