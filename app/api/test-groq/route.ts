import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if GROQ_API_KEY is available
    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        status: "error",
        message: "GROQ_API_KEY is not configured",
      })
    }

    // Just return success without actually calling the API
    return NextResponse.json({
      status: "success",
      message: "GROQ_API_KEY is configured",
      keyFirstChars: apiKey.substring(0, 3) + "..." + apiKey.substring(apiKey.length - 3),
    })
  } catch (error) {
    console.error("Error in test-groq API:", error)
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : String(error),
    })
  }
}
