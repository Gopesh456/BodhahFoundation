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

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    // Read the file
    const fileBuffer = fs.readFileSync(filePath)

    // Return the PDF file for download
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Error downloading book:", error)
    return NextResponse.json({ error: "Failed to download book" }, { status: 500 })
  }
}
