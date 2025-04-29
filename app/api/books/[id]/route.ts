import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(
  request: Request,
  context: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  // Support both direct and Promise-based params
  const paramsObj =
    "then" in context.params ? await context.params : context.params;
  try {
    const id = paramsObj.id;
    const filename = Buffer.from(id, "base64").toString()

    const booksDir = path.join(process.cwd(), "books")
    const filePath = path.join(booksDir, filename)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

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
      year,
      file: filename,
    })
  } catch (error) {
    console.error("Error fetching book:", error)
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 })
  }
}
