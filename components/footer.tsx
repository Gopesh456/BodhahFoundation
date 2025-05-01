import Link from "next/link"
import { Book } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Modern Library. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:underline">
            Terms
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
