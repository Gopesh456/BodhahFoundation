import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Ensure params is properly handled
    const { id } = params
    const filename = Buffer.from(id, "base64").toString()

    const booksDir = path.join(process.cwd(), "books")
    const filePath = path.join(booksDir, filename)
    const metadataDir = path.join(booksDir, "metadata")
    const metadataPath = path.join(metadataDir, id + ".json")

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    // Check if metadata exists
    if (fs.existsSync(metadataPath)) {
      try {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"))
        return NextResponse.json({
          id,
          title: metadata.title,
          author: metadata.author,
          year: metadata.year,
          overview: metadata.overview,
          file: filename,
        })
      } catch (error) {
        console.error(`Error reading metadata for ${filename}:`, error)
      }
    }

    // Fallback if no metadata or error reading it
    // Extract title and year from filename (assuming format like "Title (Year).pdf")
    const match = filename.match(/(.+?)(?:\s*$$(\d{4})$$)?.pdf$/i)

    let title = filename.replace(".pdf", "")
    let year = "Unknown"

    if (match) {
      title = match[1].trim()
      year = match[2] || "Unknown"
    }

    return NextResponse.json({
      id,
      title,
      author: "Unknown",
      year,
      overview: "No overview available for this book.",
      file: filename,
    })
  } catch (error) {
    console.error("Error fetching book:", error)
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 })
  }
}
