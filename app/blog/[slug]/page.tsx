import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github, Calendar } from "lucide-react";
import { getPostBySlug } from "@/lib/api";
import { BlogArticle } from "@/components/BlogArticle";
import { PromotedAd } from "@/components/PromotedAd";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Karthik",
    };
  }

  return {
    title: `${post.title} | Karthik`,
    description: post.meta_description || post.excerpt || `Read ${post.title} by Karthik`,
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt,
      type: "article",
      publishedTime: post.published_at,
      authors: ["Karthik"],
      images: post.featured_image ? [post.featured_image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.meta_description || post.excerpt,
      images: post.featured_image ? [post.featured_image] : [],
    },
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

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
    <div className="flex flex-col gap-8 pb-20">
      <article className="container-narrow py-12">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Back to blog
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time>
                {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Draft'}
              </time>
            </div>
            {post.github_url && (
              <a 
                href={post.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                View Source
              </a>
            )}
          </div>
        </header>

        {post.featured_image && (
          <div className="mb-12 rounded-2xl overflow-hidden border bg-muted aspect-video relative">
            <img 
              src={post.featured_image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <BlogArticle content={post.content} />
      </article>

      <div className="container-narrow">
        <div className="p-1 bg-gradient-to-r from-border via-primary/20 to-border rounded-3xl">
          <PromotedAd />
        </div>
      </div>
    </div>
  );
}
