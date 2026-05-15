"use client";

import { motion } from "framer-motion";

interface BlogArticleProps {
  content: string;
}

export function BlogArticle({ content }: BlogArticleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
