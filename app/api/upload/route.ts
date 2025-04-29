import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const title = formData.get("title") as string
    const year = formData.get("year") as string
    const file = formData.get("file") as File

    if (!title || !year || !file) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate file type
    if (!file.name.endsWith(".pdf")) {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
    }

    // Create books directory if it doesn't exist
    const booksDir = path.join(process.cwd(), "books")
    if (!existsSync(booksDir)) {
      await mkdir(booksDir, { recursive: true })
    }

    // Create filename with title and year
    const filename = `${title} (${year}).pdf`
    const filePath = path.join(booksDir, filename)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    await writeFile(filePath, buffer)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
