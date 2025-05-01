import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

// Define the book result type
interface BookResult {
  source: string;
  title: string;
  author: string;
  link: string;
  coverUrl?: string;
  id?: string;
}

// Search Gutenberg
async function searchGutendex(
  query: string,
  maxResults: number = 5
): Promise<BookResult[]> {
  console.log(`Searching Gutendex for: ${query}`);
  const url = "https://gutendex.com/books";
  const params = new URLSearchParams({ search: query });

  try {
    const response = await fetch(`${url}?${params.toString()}`);
    if (!response.ok) return [];

    const data = await response.json();
    return data.results.slice(0, maxResults).map((book: any) => ({
      source: "Gutenberg",
      title: book.title,
      author: book.authors.map((a: any) => a.name).join(", "),
      link:
        book.formats["text/html"] ||
        book.formats["application/epub+zip"] ||
        book.formats["application/pdf"],
      coverUrl: book.formats["image/jpeg"],
    }));
  } catch (error) {
    console.error(`Error searching Gutendex:`, error);
    return [];
  }
}

// Search OpenLibrary
async function searchOpenLibrary(
  query: string,
  maxResults: number = 5
): Promise<BookResult[]> {
  console.log(`Searching OpenLibrary for: ${query}`);
  const url = "https://openlibrary.org/search.json";
  const params = new URLSearchParams({ q: query, has_fulltext: "true" });

  try {
    const response = await fetch(`${url}?${params.toString()}`);
    if (!response.ok) return [];

    const data = await response.json();
    const docs = data.docs.slice(0, maxResults);

    return docs
      .filter((doc: any) => doc.edition_key && doc.edition_key.length > 0)
      .map((doc: any) => ({
        source: "OpenLibrary",
        title: doc.title || "Unknown",
        author: (doc.author_name || []).join(", "),
        link: `https://openlibrary.org/books/${doc.edition_key[0]}`,
        coverUrl: doc.cover_i
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
          : undefined,
      }));
  } catch (error) {
    console.error(`Error searching OpenLibrary:`, error);
    return [];
  }
}

// Search Internet Archive
async function searchArchive(
  query: string,
  maxResults: number = 5
): Promise<BookResult[]> {
  console.log(`Searching Internet Archive for: ${query}`);
  const url = "https://archive.org/advancedsearch.php";
  const params = new URLSearchParams({
    q: `title:("${query}") AND mediatype:texts`,
    fl: "identifier,title,creator",
    rows: maxResults.toString(),
    output: "json",
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`);
    if (!response.ok) return [];

    const data = await response.json();
    const docs = data.response.docs;

    return docs.map((doc: any) => ({
      source: "Internet Archive",
      title: doc.title || "Unknown",
      author: doc.creator || "",
      link: `https://archive.org/details/${doc.identifier}`,
      coverUrl: `https://archive.org/services/img/${doc.identifier}`,
    }));
  } catch (error) {
    console.error(`Error searching Internet Archive:`, error);
    return [];
  }
}

// Main API endpoint handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Search query is required" },
      { status: 400 }
    );
  }

  try {
    // First check local library
    const localResults = await searchLocalLibrary(query);

    // Then check online sources
    const onlineResults = await searchOnlineSources(query);

    // Combine results
    return NextResponse.json({
      local: localResults,
      online: onlineResults,
      query,
    });
  } catch (error) {
    console.error("Error searching for books:", error);
    return NextResponse.json(
      { error: "Failed to search for books" },
      { status: 500 }
    );
  }
}

async function searchLocalLibrary(query: string): Promise<BookResult[]> {
  const booksDir = path.join(process.cwd(), "books");

  // If books directory doesn't exist, return empty array
  if (!fs.existsSync(booksDir)) {
    return [];
  }

  const files = fs
    .readdirSync(booksDir)
    .filter(
      (file) =>
        file !== "metadata" &&
        file.endsWith(".pdf") &&
        file.toLowerCase().includes(query.toLowerCase())
    );

  const results: BookResult[] = files.map((file) => {
    const id = Buffer.from(file).toString("base64");
    const metadataDir = path.join(booksDir, "metadata");
    const metadataPath = path.join(metadataDir, id + ".json");

    let title = file.replace(".pdf", "");
    let author = "Unknown";

    if (fs.existsSync(metadataPath)) {
      try {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
        title = metadata.title;
        author = metadata.author;
      } catch (error) {
        console.error(`Error reading metadata for ${file}:`, error);
      }
    }

    return {
      source: "Local Library",
      title,
      author,
      link: `/books/${id}`,
      id,
    };
  });

  return results;
}

async function searchOnlineSources(query: string): Promise<BookResult[]> {
  // This is a mock implementation - in a real app, you would call actual APIs
  return [
    {
      source: "OpenLibrary",
      title: `${query}: A Comprehensive Guide`,
      author: "Various Authors",
      link: `https://openlibrary.org/search?q=${encodeURIComponent(query)}`,
      coverUrl: "https://covers.openlibrary.org/b/id/12740110-L.jpg",
    },
    {
      source: "Internet Archive",
      title: `The Complete ${query}`,
      author: "Internet Archive Collection",
      link: `https://archive.org/search?query=${encodeURIComponent(query)}`,
      coverUrl: "https://archive.org/services/img/bookreviews",
    },
    {
      source: "Gutenberg",
      title: `${query} - Classic Edition`,
      author: "Project Gutenberg",
      link: `https://www.gutenberg.org/ebooks/search/?query=${encodeURIComponent(
        query
      )}`,
      coverUrl: "",
    },
  ];
}
