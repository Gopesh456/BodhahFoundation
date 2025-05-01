"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";

export function UploadButton() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author || !year || !file) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and select a PDF file.",
        variant: "destructive",
      });
      return;
    }

    if (!file.name.endsWith(".pdf")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("year", year);
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      toast({
        title: "Upload successful",
        description: "Your book has been added to the library.",
      });

      setOpen(false);
      setTitle("");
      setAuthor("");
      setYear("");
      setFile(null);

      // Refresh the page to show the new book
      window.location.reload(); // Reload the home page after upload
    } catch (error) {
      console.error("Error uploading book:", error);
      toast({
        title: "Upload failed",
        description:
          "There was an error uploading your book. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button id="upload-trigger" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Book
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Upload a new book</DialogTitle>
            <DialogDescription>
              Add a new book to the library. Please provide the book details and
              upload a PDF file.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Publication Year</Label>
              <Input
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Enter publication year"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">PDF File</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
