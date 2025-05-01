"use client"

import { useEffect, useState } from "react"
import { BookCard } from "@/components/book-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { motion } from "framer-motion"

interface Book {
  id: string
  title: string
  author: string
  year: string
  file: string
}

export function BookList() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books")
        const data = await response.json()
        setBooks(data)
        setFilteredBooks(data)
      } catch (error) {
        console.error("Error fetching books:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBooks(books)
    } else {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.year.includes(searchQuery),
      )
      setFilteredBooks(filtered)
    }
  }, [searchQuery, books])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div id="book-list">
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search books by title or year..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <BookCard.Skeleton key={i} />
          ))}
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="text-xl font-semibold mb-2">No books found</h3>
          <p className="text-muted-foreground mb-6">
            {books.length === 0
              ? "The library is currently empty. Be the first to upload a book!"
              : "No books match your search criteria. Try a different search term."}
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredBooks.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </motion.div>
      )}
    </div>
  )
}
