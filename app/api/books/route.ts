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

    // Read the books directory
    const files = fs.readdirSync(booksDir)

    // Filter for PDF files
    const pdfFiles = files.filter((file) => file.endsWith(".pdf"))

    // Create book objects
    const books = pdfFiles.map((file) => {
      // Extract title and year from filename (assuming format like "Title (Year).pdf")
      const match = file.match(/(.+?)(?:\s*$$(\d{4})$$)?.pdf$/i)

      let title = file.replace(".pdf", "")
      let year = "Unknown"

      if (match) {
        title = match[1].trim()
        year = match[2] || "Unknown"
      }

      return {
        id: Buffer.from(file).toString("base64"),
        title,
        year,
        file,
      }
    })

    return NextResponse.json(books)
  } catch (error) {
    console.error("Error reading books:", error)
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 })
  }
}
