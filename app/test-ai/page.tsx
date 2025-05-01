"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function TestAI() {
  const [title, setTitle] = useState("Test Book")
  const [author, setAuthor] = useState("Test Author")
  const [year, setYear] = useState("2023")
  const [loading, setLoading] = useState(false)
  const [directGroqLoading, setDirectGroqLoading] = useState(false)
  const [error, setError] = useState("")
  const [directGroqError, setDirectGroqError] = useState("")
  const [result, setResult] = useState("")
  const [overview, setOverview] = useState("")
  const [debugInfo, setDebugInfo] = useState("")
  const [directGroqDebugInfo, setDirectGroqDebugInfo] = useState("")
  const [helloApiStatus, setHelloApiStatus] = useState<"loading" | "success" | "error">("loading")
  const [helloApiResponse, setHelloApiResponse] = useState("")
  const [groqApiStatus, setGroqApiStatus] = useState<"loading" | "success" | "error">("loading")
  const [groqApiResponse, setGroqApiResponse] = useState("")

  // Test the hello API on component mount
  useEffect(() => {
    const testHelloApi = async () => {
      try {
        const response = await fetch("/api/hello")
        const text = await response.text()
        setHelloApiResponse(text)

        try {
          JSON.parse(text)
          setHelloApiStatus("success")
        } catch (e) {
          setHelloApiStatus("error")
        }
      } catch (error) {
        setHelloApiStatus("error")
        setHelloApiResponse(String(error))
      }
    }

    testHelloApi()
  }, [])

  // Test the Groq API on component mount
  useEffect(() => {
    const testGroqApi = async () => {
      try {
        const response = await fetch("/api/test-groq")
        const text = await response.text()
        setGroqApiResponse(text)

        try {
          JSON.parse(text)
          setGroqApiStatus("success")
        } catch (e) {
          setGroqApiStatus("error")
        }
      } catch (error) {
        setGroqApiStatus("error")
        setGroqApiResponse(String(error))
      }
    }

    testGroqApi()
  }, [])

  const testSimpleApi = async () => {
    setLoading(true)
    setError("")
    setResult("")
    setDebugInfo("")

    try {
      const requestBody = { title, author, year }
      setDebugInfo(`Sending request to simple API: ${JSON.stringify(requestBody)}\n`)

      const response = await fetch("/api/simple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      setDebugInfo((prev) => prev + `Response status: ${response.status}\n`)

      const responseText = await response.text()
      setDebugInfo((prev) => prev + `Raw response: ${responseText}\n`)

      if (!responseText) {
        throw new Error("Empty response from server")
      }

      try {
        const data = JSON.parse(responseText)
        setResult(JSON.stringify(data, null, 2))
      } catch (jsonError) {
        throw new Error(`Invalid JSON response: ${responseText}`)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(`Error: ${errorMessage}`)
      setDebugInfo((prev) => prev + `Error: ${errorMessage}\n`)
    } finally {
      setLoading(false)
    }
  }

  const testDirectGroqApi = async () => {
    setDirectGroqLoading(true)
    setDirectGroqError("")
    setOverview("")
    setDirectGroqDebugInfo("")

    try {
      const requestBody = { title, author, year }
      setDirectGroqDebugInfo(`Sending request to direct Groq API: ${JSON.stringify(requestBody)}\n`)

      const response = await fetch("/api/direct-groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      setDirectGroqDebugInfo((prev) => prev + `Response status: ${response.status}\n`)

      const responseText = await response.text()
      setDirectGroqDebugInfo((prev) => prev + `Raw response: ${responseText.substring(0, 200)}...\n`)

      if (!responseText) {
        throw new Error("Empty response from server")
      }

      try {
        const data = JSON.parse(responseText)
        if (data.overview) {
          setOverview(data.overview)
        } else if (data.error) {
          throw new Error(data.error)
        } else {
          throw new Error("No overview or error in response")
        }
      } catch (jsonError) {
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setDirectGroqError(`Error: ${errorMessage}`)
      setDirectGroqDebugInfo((prev) => prev + `Error: ${errorMessage}\n`)
    } finally {
      setDirectGroqLoading(false)
    }
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">API Testing Page</h1>

      {/* Hello API Status */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Basic API Status</CardTitle>
          <CardDescription>Testing the most basic API endpoint</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              {helloApiStatus === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <div
                  className={`h-3 w-3 rounded-full mr-2 ${helloApiStatus === "success" ? "bg-green-500" : "bg-red-500"}`}
                ></div>
              )}
              <span>Status: {helloApiStatus}</span>
            </div>
            {helloApiResponse && (
              <div className="p-4 bg-muted rounded-md mt-2">
                <pre className="text-xs whitespace-pre-wrap">{helloApiResponse}</pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Groq API Status */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Groq API Status</CardTitle>
          <CardDescription>Testing the Groq API configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              {groqApiStatus === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <div
                  className={`h-3 w-3 rounded-full mr-2 ${groqApiStatus === "success" ? "bg-green-500" : "bg-red-500"}`}
                ></div>
              )}
              <span>Status: {groqApiStatus}</span>
            </div>
            {groqApiResponse && (
              <div className="p-4 bg-muted rounded-md mt-2">
                <pre className="text-xs whitespace-pre-wrap">{groqApiResponse}</pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Simple API Test */}
        <Card>
          <CardHeader>
            <CardTitle>Simple API Test</CardTitle>
            <CardDescription>Test a basic POST API endpoint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="title">Book Title</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} />
                </div>
              </div>

              <Button onClick={testSimpleApi} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  "Test Simple API"
                )}
              </Button>

              {error && <div className="p-4 bg-destructive/10 text-destructive rounded-md">{error}</div>}

              {result && (
                <div className="p-4 bg-muted rounded-md">
                  <h3 className="font-semibold mb-2">Response:</h3>
                  <pre className="text-xs whitespace-pre-wrap">{result}</pre>
                </div>
              )}

              {debugInfo && (
                <div className="p-4 bg-muted rounded-md">
                  <h3 className="font-semibold mb-2">Debug Info:</h3>
                  <pre className="text-xs whitespace-pre-wrap">{debugInfo}</pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Direct Groq API Test */}
        <Card>
          <CardHeader>
            <CardTitle>Direct Groq API Test</CardTitle>
            <CardDescription>Test the direct Groq API implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={testDirectGroqApi} disabled={directGroqLoading}>
                {directGroqLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Overview with Direct Groq API"
                )}
              </Button>

              {directGroqError && (
                <div className="p-4 bg-destructive/10 text-destructive rounded-md">{directGroqError}</div>
              )}

              {overview && (
                <div className="p-4 bg-muted rounded-md">
                  <h3 className="font-semibold mb-2">Overview:</h3>
                  <p className="text-sm">{overview}</p>
                </div>
              )}

              {directGroqDebugInfo && (
                <div className="p-4 bg-muted rounded-md">
                  <h3 className="font-semibold mb-2">Debug Info:</h3>
                  <pre className="text-xs whitespace-pre-wrap">{directGroqDebugInfo}</pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-8">
        <p className="text-muted-foreground">
          If the basic API tests work, you can proceed to test the AI functionality.
        </p>
        <Button className="mt-4" asChild>
          <a href="/">Return to Library</a>
        </Button>
      </div>
    </div>
  )
}
