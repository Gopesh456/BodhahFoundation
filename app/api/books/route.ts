import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Check if books directory exists, if not create it
    const booksDir = path.join(process.cwd(), "books")
    if (!fs.existsSync(booksDir)) {
      fs.mkdirSync(booksDir, { recursive: true })
      return NextResponse.json([])
    }

    // Create metadata directory if it doesn't exist
    const metadataDir = path.join(booksDir, "metadata")
    if (!fs.existsSync(metadataDir)) {
      fs.mkdirSync(metadataDir, { recursive: true })
    }

    // Read the books directory
    const files = fs.readdirSync(booksDir).filter((file) => file !== "metadata" && file.endsWith(".pdf"))

    // Create book objects
    const books = files.map((file) => {
      const id = Buffer.from(file).toString("base64")
      const metadataPath = path.join(metadataDir, id + ".json")

      // Check if metadata exists
      if (fs.existsSync(metadataPath)) {
        try {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"))
          return {
            id,
            title: metadata.title,
            author: metadata.author,
            year: metadata.year,
            overview: metadata.overview,
            file,
          }
        } catch (error) {
          console.error(`Error reading metadata for ${file}:`, error)
        }
      }

      // Fallback if no metadata or error reading it
      // Extract title and year from filename (assuming format like "Title (Year).pdf")
      const match = file.match(/(.+?)(?:\s*$$(\d{4})$$)?.pdf$/i)

      let title = file.replace(".pdf", "")
      let year = "Unknown"

      if (match) {
        title = match[1].trim()
        year = match[2] || "Unknown"
      }

      return {
        id,
        title,
        author: "Unknown",
        year,
        overview: "",
        file,
      }
    })

    return NextResponse.json(books)
  } catch (error) {
    console.error("Error reading books:", error)
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 })
  }
}
