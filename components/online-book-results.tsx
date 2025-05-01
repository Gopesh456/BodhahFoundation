"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ExternalLink,
  BookOpen,
  AlertCircle,
  Search,
  LibraryBig,
  Globe,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface BookResult {
  source: string;
  title: string;
  author: string;
  link: string;
  coverUrl?: string;
  id?: string;
}

interface SearchResults {
  local: BookResult[];
  online: BookResult[];
  query: string;
}

export function OnlineBookResults({ query }: { query: string }) {
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/book-search?q=${encodeURIComponent(query)}`
        );
        if (!response.ok) {
          throw new Error("Failed to search for books");
        }

        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error searching for books:", error);
        setError("Failed to search for books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Source-specific badge styling
  const getSourceColor = (source: string) => {
    switch (source) {
      case "Local Library":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
      case "Gutenberg":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "OpenLibrary":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Internet Archive":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "LibGen":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "Z-Library":
        return "bg-rose-100 text-rose-800 hover:bg-rose-200";
      case "PDFDrive":
        return "bg-cyan-100 text-cyan-800 hover:bg-cyan-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="mt-8">
        <Card className="mb-8 border-blue-100 bg-blue-50 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 bg-blue-100 p-3 rounded-full animate-pulse">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-800 mb-1 flex items-center">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Searching Online Resources
                </h3>
                <p className="text-blue-600 text-sm">
                  Checking libraries and online sources for "{query}"...
                </p>
              </div>
            </div>
          </CardContent>
          <div className="h-1 w-full bg-blue-100">
            <div className="h-1 bg-blue-500 animate-search-progress"></div>
          </div>
        </Card>

        <h2 className="text-2xl font-bold mb-6">Search Results</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden border border-gray-200">
              <div className="aspect-[3/2] relative bg-gray-100 animate-pulse">
                <div className="h-full w-full flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-gray-200" />
                </div>
              </div>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-5/6 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-10 w-1/3" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mt-8 border-orange-200 bg-orange-50">
        <CardContent className="p-6 flex items-center gap-4">
          <AlertCircle className="text-orange-500 h-6 w-6 flex-shrink-0" />
          <p className="text-orange-700">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!results || (results.local.length === 0 && results.online.length === 0)) {
    return (
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-gray-200 bg-gray-50">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center py-12">
            <LibraryBig className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Book Not Found</h3>
            <p className="text-gray-500 max-w-md">
              We couldn't find "{query}" in our local library or online sources.
              Please check the spelling or try a different title.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {results.local.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-6">Found in Your Library</h2>
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {results.local.map((book, index) => (
              <motion.div key={`local-${book.id}-${index}`} variants={item}>
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="aspect-[3/2] relative bg-gray-100">
                    <div className="h-full w-full flex items-center justify-center bg-gray-50">
                      <BookOpen className="h-12 w-12 text-gray-300" />
                    </div>
                    <Badge
                      className={`absolute top-2 right-2 ${getSourceColor(
                        "Local Library"
                      )}`}
                    >
                      Local Library
                    </Badge>
                  </div>

                  <CardContent className="p-5 flex-grow">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {book.author || "Unknown Author"}
                    </p>
                  </CardContent>

                  <CardFooter className="p-5 pt-0">
                    <Button className="w-full gap-2" variant="default" asChild>
                      <Link href={book.link}>View Book</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}

      {results.online.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-6">Found Online</h2>
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {results.online.map((book, index) => (
              <motion.div
                key={`online-${book.source}-${index}`}
                variants={item}
              >
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="aspect-[3/2] relative bg-gray-100">
                    {book.coverUrl ? (
                      <Image
                        src={book.coverUrl}
                        alt={`Cover for ${book.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-book-cover.svg";
                        }}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-50">
                        <BookOpen className="h-12 w-12 text-gray-300" />
                      </div>
                    )}
                    <Badge
                      className={`absolute top-2 right-2 ${getSourceColor(
                        book.source
                      )}`}
                    >
                      {book.source}
                    </Badge>
                  </div>

                  <CardContent className="p-5 flex-grow">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {book.author || "Unknown Author"}
                    </p>
                  </CardContent>

                  <CardFooter className="p-5 pt-0">
                    <Button className="w-full gap-2" variant="outline" asChild>
                      <a
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Book
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}

      {results.local.length === 0 && results.online.length > 0 && (
        <Card className="mb-8 border-blue-100 bg-blue-50">
          <CardContent className="p-4 text-blue-700">
            <p>
              The book you were looking for is not in your local library, but we
              found some matching results online.
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
