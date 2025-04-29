"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50 py-24 md:py-32">
      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover a World of <span className="text-primary">Knowledge</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our vast collection of books, articles, and resources. Read online or download for later.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" asChild>
              <a href="#book-list">Browse Collection</a>
            </Button>
            <Button size="lg" variant="outline">
              <a href="#upload">Upload Book</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated background elements */}
      <motion.div
        className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
        animate={{
          x: [0, 10, 0],
          y: [0, 15, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 8,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"
        animate={{
          x: [0, -10, 0],
          y: [0, -15, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 10,
          ease: "easeInOut",
        }}
      />
    </section>
  )
}
