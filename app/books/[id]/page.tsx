"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Download, FileText } from "lucide-react"
import { motion } from "framer-motion"

interface Book {
  id: string
  title: string
  year: string
  file: string
}

export default function BookPage() {
  const params = useParams()
  const router = useRouter()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${params.id}`)
        if (!response.ok) throw new Error("Book not found")
        const data = await response.json()
        setBook(data)
      } catch (error) {
        console.error("Error fetching book:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchBook()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="container max-w-4xl px-4 py-12">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-8 w-48 ml-2" />
        </div>
        <Card>
          <CardContent className="p-0">
            <Skeleton className="h-[800px] w-full rounded-md" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="container max-w-4xl px-4 py-12">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold ml-2">Book not found</h1>
        </div>
        <Card className="flex flex-col items-center justify-center p-12 text-center">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Book Not Found</h2>
          <p className="text-muted-foreground mb-4">The book you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/")}>Return to Library</Button>
        </Card>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container max-w-4xl px-4 py-12"
    >
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold ml-2">
          {book.title} ({book.year})
        </h1>
        <Button variant="outline" size="icon" className="ml-auto" asChild>
          <a href={`/api/download/${book.id}`} download>
            <Download className="h-4 w-4" />
          </a>
        </Button>
      </div>
      <Card className="overflow-hidden">
        <CardContent className="p-0 h-[800px]">
          <iframe src={`/api/view/${book.id}`} className="w-full h-full border-0" title={book.title} />
        </CardContent>
      </Card>
    </motion.div>
  )
}
