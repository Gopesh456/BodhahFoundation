import { NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export const maxDuration = 30 // Allow up to 30 seconds for AI generation

export async function POST(request: Request) {
  console.log("Generate overview API called")

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

    console.log(`Generating overview for: ${title} by ${author} (${year})`)

    // Check if GROQ_API_KEY is available
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not set")
      return NextResponse.json(
        {
          error: "GROQ_API_KEY is not configured",
          overview: `This book titled "${title}" was written by ${author} and published in ${year}. No AI-generated overview is available at this time due to configuration issues.`,
        },
        { status: 500 },
      )
    }

    try {
      console.log("Calling Groq API...")

      const prompt = `Generate a concise overview (about 150 words) for a book titled "${title}" by ${author}, published in ${year}. 
      Focus on what the book might be about based on the title, potential themes, and the author's typical style if they are well-known.
      If the author is not well-known, make reasonable assumptions about the book's content based on the title and publication year.
      Format the response as a well-structured paragraph that would be helpful for library patrons.`

      const { text } = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        prompt,
        temperature: 0.7,
        maxTokens: 300,
      })

      console.log("Overview generated successfully:", text.substring(0, 50) + "...")

      return NextResponse.json({ overview: text })
    } catch (aiError) {
      console.error("AI generation error:", aiError)

      return NextResponse.json({
        error: `AI generation failed: ${aiError instanceof Error ? aiError.message : String(aiError)}`,
        overview: `This book titled "${title}" was written by ${author} and published in ${year}. No AI-generated overview is available at this time.`,
      })
    }
  } catch (error) {
    console.error("Error in generate-overview API:", error)

    return NextResponse.json(
      {
        error: `Failed to generate book overview: ${error instanceof Error ? error.message : String(error)}`,
        overview: "No overview available at this time.",
      },
      { status: 500 },
    )
  }
}
