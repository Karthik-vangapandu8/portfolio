"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { useEffect, useState } from "react";
import { getPosts } from "@/lib/api";

export const BlogSnippet = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(data => {
        setPosts(data.slice(0, 3)); // Show only top 3
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="container-narrow py-12">
      <h2 className="section-title">Blog</h2>
      <div className="space-y-6">
        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2].map(i => (
              <div key={i} className="h-20 bg-accent/30 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 p-4 -mx-4 rounded-xl hover:bg-accent/50 transition-colors">
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{post.excerpt}</p>
                  </div>
                  <time className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}
                  </time>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground py-4">No articles published yet. Check back soon!</p>
        )}
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
