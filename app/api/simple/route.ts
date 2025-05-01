import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Try to parse the request body
    const text = await request.text()
    console.log("Request body (raw):", text)

    let body
    try {
      body = JSON.parse(text)
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError)
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    // Return a simple response
    return NextResponse.json({
      received: body,
      message: "Simple API working correctly",
    })
  } catch (error) {
    console.error("Error in simple API:", error)
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
