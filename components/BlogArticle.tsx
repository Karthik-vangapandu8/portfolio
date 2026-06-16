"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogArticleProps {
  content: string;
  title: string;
  excerpt: string;
  featuredImage?: string | null;
  publishedAt?: string | null;
}

export function BlogArticle({ content, title, excerpt, featuredImage, publishedAt }: BlogArticleProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  // Split by horizontal rules (markdown --- parses to <hr> or <hr />)
  const bookPages = content.split(/<hr\s*\/?>/i);
  const totalPages = bookPages.length + 1; // +1 for the cover page

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Keyboard navigation for book mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextPage();
      } else if (e.key === "ArrowLeft") {
        prevPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages]);

  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 150 : -150,
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Book Horizontal Layout */}
      <div className="relative border rounded-3xl bg-muted/20 backdrop-blur-md p-6 sm:p-10 min-h-[520px] flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Page Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-border/40">
          <div
            className="h-full bg-violet-500 transition-all duration-300"
            style={{ width: `${(currentPage / (totalPages - 1)) * 100}%` }}
          />
        </div>

        {/* Content Area */}
        <div className="my-auto py-4">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 260, damping: 26 },
                opacity: { duration: 0.15 },
              }}
              className="w-full"
            >
              {currentPage === 0 ? (
                /* Cover Page Design */
                <div className="flex flex-col items-center text-center gap-6 max-w-lg mx-auto py-4">
                  {featuredImage && (
                    <div className="w-full max-w-sm rounded-2xl overflow-hidden border bg-muted shadow-lg aspect-video mb-1">
                      <img src={featuredImage} alt={title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-violet-500/80 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                      Dossier Cover
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                      {title}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {excerpt}
                  </p>
                  <button
                    onClick={nextPage}
                    className="mt-2 px-6 py-2.5 bg-violet-500 hover:bg-violet-600 text-white rounded-full font-semibold text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-600/30 flex items-center gap-2 group transition-all cursor-pointer"
                  >
                    Open Blueprint
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ) : (
                /* Regular Book Page Content */
                <div
                  className="prose-custom min-h-[350px]"
                  dangerouslySetInnerHTML={{ __html: bookPages[currentPage - 1] }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between border-t pt-4 mt-6 text-sm text-muted-foreground">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="flex items-center gap-1 hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

          <span className="text-xs font-mono">
            {currentPage === 0 ? "COVER" : `PAGE ${currentPage} / ${totalPages - 1}`}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="flex items-center gap-1 hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
