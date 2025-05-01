import { BookList } from "@/components/book-list"
import { Hero } from "@/components/hero"
import { UploadButton } from "@/components/upload-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="container px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Library Collection</h2>
            <p className="text-muted-foreground mt-2">
              Browse our collection of books available for reading and download.
            </p>
          </div>
          <UploadButton />
        </div>
        <BookList />
      </div>
    </main>
  )
}
