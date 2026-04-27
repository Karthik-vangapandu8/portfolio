"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    title: "How I Automated Everything Using AI!",
    excerpt: "My journey of automating daily tasks with AI & Hermes Agent setup.",
    date: "April 23, 2026",
    slug: "how-i-automated-everything-using-ai",
  },
  {
    title: "Setting up own mongodb honeypot to lure attackers",
    excerpt: "Set up your own MongoDB honeypot on AWS using T-Pot.",
    date: "April 4, 2026",
    slug: "setting-up-own-mongodb-honeypot-to-lure-attackers",
  },
];

export const BlogSnippet = () => {
  return (
    <section className="container-narrow py-12">
      <h2 className="section-title">Blog</h2>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              href={`/blog/${post.slug}`}
              className="group block p-4 -mx-4 rounded-xl hover:bg-accent transition-colors"
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                  {post.date}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Read more <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-8">
        <Link 
          href="/blog"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Show all blogs →
        </Link>
      </div>
    </section>
  );
};
