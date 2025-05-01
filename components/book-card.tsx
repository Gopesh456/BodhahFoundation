"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText } from "lucide-react"
import { motion } from "framer-motion"

interface Book {
  id: string
  title: string
  author: string
  year: string
  file: string
}

interface BookCardProps {
  book: Book
  index: number
}

export function BookCard({ book, index }: BookCardProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div variants={item} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Link href={`/books/${book.id}`}>
        <Card className="overflow-hidden h-full transition-colors hover:bg-muted/50">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="rounded-lg bg-primary/10 p-4 mb-4">
              <FileText className="h-12 w-12 text-primary" />
            </div>
            <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
            <p className="text-xs text-muted-foreground mt-1">{book.year}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0 justify-center">
            <span className="text-xs text-muted-foreground">Click to view</span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

BookCard.Skeleton = function BookCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <Skeleton className="h-20 w-20 rounded-lg mb-4" />
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 justify-center">
        <Skeleton className="h-3 w-20" />
      </CardFooter>
    </Card>
  )
}
