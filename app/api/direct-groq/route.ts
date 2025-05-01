import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Parse the request body
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    const { title, author, year } = body

    if (!title || !author || !year) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if GROQ_API_KEY is available
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        error: "GROQ_API_KEY is not configured",
        overview: `This book titled "${title}" was written by ${author} and published in ${year}. No AI-generated overview is available at this time due to configuration issues.`,
      })
    }

    try {
      // Create the prompt
      const prompt = `Generate a concise overview (about 150 words) for a book titled "${title}" by ${author}, published in ${year}. 
      Focus on what the book might be about based on the title, potential themes, and the author's typical style if they are well-known.
      If the author is not well-known, make reasonable assumptions about the book's content based on the title and publication year.
      Format the response as a well-structured paragraph that would be helpful for library patrons.`

      // Call Groq API directly
      const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      })

      if (!groqResponse.ok) {
        const errorText = await groqResponse.text()
        return NextResponse.json({
          error: `Groq API error: ${groqResponse.status}`,
          details: errorText,
          overview: `This book titled "${title}" was written by ${author} and published in ${year}. No AI-generated overview is available at this time due to an API error.`,
        })
      }

      const groqData = await groqResponse.json()
      const overview = groqData.choices[0]?.message?.content || "No overview generated."

      return NextResponse.json({ overview })
    } catch (apiError) {
      console.error("API error:", apiError)
      return NextResponse.json({
        error: `API error: ${apiError instanceof Error ? apiError.message : String(apiError)}`,
        overview: `This book titled "${title}" was written by ${author} and published in ${year}. No AI-generated overview is available at this time due to an API error.`,
      })
    }
  } catch (error) {
    console.error("Error in direct-groq API:", error)
    return NextResponse.json({
      error: `Server error: ${error instanceof Error ? error.message : String(error)}`,
      overview: "No overview available at this time due to a server error.",
    })
  }
}
