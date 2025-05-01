import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const year = formData.get("year") as string
    const file = formData.get("file") as File

    if (!title || !author || !year || !file) {
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

    // Create metadata directory if it doesn't exist
    const metadataDir = path.join(process.cwd(), "books", "metadata")
    if (!existsSync(metadataDir)) {
      await mkdir(metadataDir, { recursive: true })
    }

    // Create filename with title and year
    const filename = `${title} (${year}).pdf`
    const filePath = path.join(booksDir, filename)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    await writeFile(filePath, buffer)

    // Generate book overview
    let overview = ""
    try {
      console.log("Requesting book overview generation...")

      // Get the origin from the request or use a default
      const origin = request.headers.get("origin") || request.headers.get("host") || ""
      const protocol = origin.startsWith("localhost") ? "http://" : "https://"
      const baseUrl = origin.startsWith("http") ? origin : `${protocol}${origin}`

      const overviewResponse = await fetch(`${baseUrl}/api/generate-overview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author, year }),
      })

      console.log("Overview API response status:", overviewResponse.status)

      if (overviewResponse.ok) {
        const data = await overviewResponse.json()
        overview = data.overview
        console.log("Overview generated:", overview.substring(0, 50) + "...")
      } else {
        const errorData = await overviewResponse.json()
        console.error("Overview generation failed:", errorData)
        overview = `This book titled "${title}" was written by ${author} and published in ${year}. No AI-generated overview is available at this time.`
      }
    } catch (error) {
      console.error("Error generating overview:", error)
      overview = `This book titled "${title}" was written by ${author} and published in ${year}. No AI-generated overview is available at this time.`
    }

    // Save metadata
    const metadataFilename = Buffer.from(filename).toString("base64") + ".json"
    const metadataPath = path.join(metadataDir, metadataFilename)

    await writeFile(
      metadataPath,
      JSON.stringify({
        title,
        author,
        year,
        filename,
        overview,
        uploadDate: new Date().toISOString(),
      }),
    )

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
