import { NextResponse } from "next/server"

export async function POST(request: Request) {
  console.log("Simple generate overview API called")

  try {
    // Parse the request body
    let body
    try {
      body = await request.json()
      console.log("Request body:", body)
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError)
      return NextResponse.json(
        {
          error: "Invalid request body",
          overview: "Failed to parse request body",
        },
        { status: 400 },
      )
    }

    const { title, author, year } = body

    if (!title || !author || !year) {
      console.log("Missing required fields:", { title, author, year })
      return NextResponse.json(
        {
          error: "Missing required fields",
          overview: "Missing title, author, or year",
        },
        { status: 400 },
      )
    }

    // Generate a simple overview without using AI
    const overview = `This is a simple overview for "${title}" by ${author}, published in ${year}. This overview was generated without using AI to test the API functionality.`

    return NextResponse.json({ overview })
  } catch (error) {
    console.error("Error in simple generate-overview API:", error)

    return NextResponse.json(
      {
        error: `Failed to generate simple overview: ${error instanceof Error ? error.message : String(error)}`,
        overview: "No overview available at this time.",
      },
      { status: 500 },
    )
  }
}
