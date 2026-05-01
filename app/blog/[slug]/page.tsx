"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { getPostBySlug } from "@/lib/api";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getPostBySlug(slug as string)
        .then(data => {
          setPost(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container-narrow py-20 text-center animate-pulse">
        <div className="h-8 w-64 bg-accent/30 mx-auto rounded mb-4" />
        <div className="h-4 w-full bg-accent/30 mx-auto rounded mb-2" />
        <div className="h-4 w-3/4 bg-accent/30 mx-auto rounded" />
      </div>
    );
  }

  if (!post) {

    return (
      <div className="container-narrow py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link href="/blog" className="text-primary hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="container-narrow py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to blog
        </Link>
        
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
          <time className="text-sm text-muted-foreground">
            {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}
          </time>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">{post.content}</p>
        </div>
      </motion.div>
    </article>
  );
}
