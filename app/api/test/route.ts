import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simple response to verify API is working
    return NextResponse.json({
      status: "ok",
      message: "API is working",
      timestamp: new Date().toISOString(),
      env: {
        hasGroqKey: !!process.env.GROQ_API_KEY,
      },
    })
  } catch (error) {
    console.error("Error in test API:", error)
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
