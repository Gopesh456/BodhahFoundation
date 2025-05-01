"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { OnlineBookResults } from "@/components/online-book-results";

interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
  overview: string;
  file: string;
}

export default function BookPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  // Extract book ID from URL for potential search
  const bookId = params.id
    ? Buffer.from(params.id as string, "base64").toString()
    : "";
  // Extract potential search term from filename (remove .pdf and other details)
  const searchTerm = bookId.replace(/\.pdf$/, "").replace(/\s*\(\d{4}\)/, "");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${params.id}`);
        if (!response.ok) throw new Error("Book not found");
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBook();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container max-w-4xl px-4 py-12">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-8 w-48 ml-2" />
        </div>
        <Card className="mb-6">
          <CardContent className="p-6">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-0">
            <Skeleton className="h-[800px] w-full rounded-md" />
          </CardContent>
        </Card>
      </div>
    );
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
        <Card className="flex flex-col items-center justify-center p-12 text-center mb-6">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Book Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The book you're looking for doesn't exist in our library.
          </p>
          <Button onClick={() => router.push("/")}>Return to Library</Button>
        </Card>

        {/* Add online search results */}
        {searchTerm && <OnlineBookResults query={searchTerm} />}
      </div>
    );
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
        <div className="ml-2">
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-muted-foreground">
            by {book.author} • {book.year}
          </p>
        </div>
        <Button variant="outline" size="icon" className="ml-auto" asChild>
          <a href={`/api/download/${book.id}`} download>
            <Download className="h-4 w-4" />
          </a>
        </Button>
      </div>

      {book.overview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {book.overview}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Card className="overflow-hidden">
        <CardContent className="p-0 h-[800px]">
          <iframe
            src={`/api/view/${book.id}`}
            className="w-full h-full border-0"
            title={book.title}
          />
        </CardContent>
      </Card>

      {/* Make sure this line is present and not commented out */}
      {searchTerm && <OnlineBookResults query={searchTerm} />}
    </motion.div>
  );
}
