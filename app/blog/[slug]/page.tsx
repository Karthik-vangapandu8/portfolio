import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Code, Calendar } from "lucide-react";
import { getPostBySlug } from "@/lib/api";
import { BlogArticle } from "@/components/BlogArticle";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const post = await getPostBySlug(slug);
    if (!post) {
      return { title: "Post Not Found | Karthik" };
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
  } catch (e) {
    console.error("Metadata Fetch Error:", e);
    return {
      title: "API Error | Karthik",
      description: "Could not fetch post metadata."
    };
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  
  let post = null;
  let errorMsg = null;

  try {
    post = await getPostBySlug(slug);
  } catch (e: any) {
    console.error("Fetch Error:", e);
    errorMsg = e.message || "Unknown error occurred while fetching the post.";
  }

  if (errorMsg) {
    return (
      <div className="container-narrow py-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-500">API Connection Error</h1>
        <p className="text-muted-foreground mb-8">
          The frontend couldn't talk to your backend. <br />
          <code className="bg-muted px-2 py-1 rounded mt-2 block text-xs">{errorMsg}</code>
        </p>
        <Link href="/" className="text-primary hover:underline">
          Back to logs
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-narrow py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link href="/" className="text-primary hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to logs
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-20">
      <article className="container-narrow py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Back to logs
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
                <Code className="w-4 h-4" />
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


    </div>
  );
}
