import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { partialRatio } from "fast-fuzzy";

// Types
type BookResult = {
  source: string;
  title: string;
  author: string;
  link: string;
};

const BASEURL = "https://www.pdfdrive.com";

// Gutendex search
export async function searchGutendex(query: string, maxResults = 5): Promise<BookResult[]> {
  const url = "https://gutendex.com/books";
  const params = new URLSearchParams({ search: query });
  const response = await fetch(`${url}?${params}`);
  const results: BookResult[] = [];
  if (response.ok) {
    const data = await response.json();
    for (const book of data.results.slice(0, maxResults)) {
      results.push({
        source: "Gutenberg",
        title: book.title,
        author: (book.authors || []).map((a: any) => a.name).join(", "),
        link: book.formats["text/html"] || book.formats["application/epub+zip"] || "",
      });
    }
  }
  return results;
}

// OpenLibrary search
export async function searchOpenLibrary(query: string, maxResults = 5): Promise<BookResult[]> {
  const url = "https://openlibrary.org/search.json";
  const params = new URLSearchParams({ q: query, has_fulltext: "true" });
  const response = await fetch(`${url}?${params}`);
  const results: BookResult[] = [];
  if (response.ok) {
    const data = await response.json();
    for (const doc of (data.docs || []).slice(0, maxResults)) {
      if (doc.edition_key && doc.edition_key.length > 0) {
        results.push({
          source: "OpenLibrary",
          title: doc.title || "",
          author: (doc.author_name || []).join(", "),
          link: `https://openlibrary.org/books/${doc.edition_key[0]}`,
        });
      }
    }
  }
  return results;
}

// Internet Archive search
export async function searchArchive(query: string, maxResults = 5): Promise<BookResult[]> {
  const url = "https://archive.org/advancedsearch.php";
  const params = new URLSearchParams({
    q: `title:("${query}") AND mediatype:texts`,
    rows: maxResults.toString(),
    output: "json",
  });
  params.append("fl[]", "identifier");
  params.append("fl[]", "title");
  params.append("fl[]", "creator");
  const response = await fetch(`${url}?${params}`);
  const results: BookResult[] = [];
  if (response.ok) {
    const data = await response.json();
    for (const doc of data.response.docs) {
      results.push({
        source: "Internet Archive",
        title: doc.title || "Unknown",
        author: doc.creator || "",
        link: `https://archive.org/details/${doc.identifier}`,
      });
    }
  }
  return results;
}

// LibGen search (scraping)
export async function searchLibgen(query: string, maxResults = 5): Promise<BookResult[]> {
  const url = "https://libgen.is/search.php";
  const params = new URLSearchParams({
    req: query,
    open: "0",
    res: maxResults.toString(),
    view: "simple",
    phrase: "1",
    column: "def",
  });
  const resp = await fetch(`${url}?${params}`);
  const results: BookResult[] = [];
  if (resp.ok) {
    const html = await resp.text();
    const $ = cheerio.load(html);
    const table = $("table.c");
    if (table.length) {
      const rows = table.find("tr").slice(1, maxResults + 1); // skip header
    rows.each((index: number, row: cheerio.Element) => {
      const cols: cheerio.Cheerio = $(row).find("td");
      if (cols.length >= 10) {
        const title: string = $(cols[2]).text().trim();
        const author: string = $(cols[1]).text().trim();
        const linkTag: cheerio.Cheerio = $(cols[9]).find("a");
        const link: string = linkTag.length ? linkTag.attr("href") || "" : "";
        results.push({
        source: "LibGen",
        title,
        author,
        link,
        });
      }
    });
    }
  }
  return results;
}

// Z-Library search (scraping)
export async function searchZlibrary(query: string, maxResults = 5): Promise<BookResult[]> {
  const url = "https://singlelogin.re/s";
  const params = new URLSearchParams({ q: query, limit: maxResults.toString() });
  const resp = await fetch(`${url}?${params}`);
  const results: BookResult[] = [];
  if (resp.ok) {
    const html = await resp.text();
    const $ = cheerio.load(html);
    const books = $("div.resItemBox");
    books.slice(0, maxResults).each((index: number, el: cheerio.Element) => {
      const titleTag: cheerio.Cheerio = $(el).find("h3.resItemTitle");
      const authorTag: cheerio.Cheerio = $(el).find("div.authors");
      const linkTag: cheerio.Cheerio = titleTag.find("a");
      const title: string = titleTag.text().trim();
      const author: string = authorTag.text().trim();
      const link: string = linkTag.length && linkTag.attr("href") ? "https://singlelogin.re" + linkTag.attr("href") : "";
      results.push({
        source: "Z-Library",
        title,
        author,
        link,
      });
    });
  }
  return results;
}

// PDFDrive search (scraping, fuzzy match)
export async function searchPdfdrive(query: string): Promise<BookResult[]> {
  const url = `${BASEURL}/search?q=${encodeURIComponent(query)}`;
  const resp = await fetch(url);
  let bestMatch: BookResult | null = null;
  let highestScore = 0;
  if (resp.ok) {
    const html = await resp.text();
    const $ = cheerio.load(html);
    $("div.files-new ul li").each((index: number, li: cheerio.Element) => {
      const fr: cheerio.Cheerio = $(li).find("div.file-right");
      if (!fr.length) return;
      const a: cheerio.Cheerio = fr.find("a.ai-search");
      if (!a.length || !a.attr("href")) return;
      const titleTag: cheerio.Cheerio = a.find("h2");
      if (!titleTag.length) return;
      const title: string = titleTag.text().trim();
      const score: number = partialRatio(query.toLowerCase(), title.toLowerCase());
      if (score > highestScore) {
        highestScore = score;
        bestMatch = {
          source: "PDFDrive",
          title,
          author: "",
          link: BASEURL + a.attr("href"),
        };
      }
    });
  }
  return bestMatch ? [bestMatch] : [];
}

// Search all sources and deduplicate
export async function searchAllSources(query: string): Promise<BookResult[]> {
  const results = (
    await Promise.all([
      searchGutendex(query),
      searchOpenLibrary(query),
      searchArchive(query),
      searchLibgen(query),
      searchZlibrary(query),
      searchPdfdrive(query),
    ])
  ).flat();

  // Deduplicate by (title, author, source)
  const seen = new Set<string>();
  const unique: BookResult[] = [];
  for (const r of results) {
    const key = `${r.title}|${r.author}|${r.source}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(r);
    }
  }
  return unique;
}

// Example usage (for testing, not for production)
// (async () => {
//   const results = await searchAllSources("Python Crash Course – Eric Matthes");
//   console.log(results);
// })();

// Export types for use elsewhere
export type { BookResult };
