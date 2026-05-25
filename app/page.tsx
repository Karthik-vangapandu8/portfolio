import { headers } from "next/headers";
import { Hero } from "@/components/Hero";
import { getPosts } from "@/lib/api";
import Link from "next/link";
import { Calendar, ArrowRight, Clock, Award } from "lucide-react";
import { TechTerminal } from "@/components/TechTerminal";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const headerList = await headers();
  const city = headerList.get("x-user-city") || "the world";
  
  let posts: any[] = [];
  let errorMsg = null;

  try {
    posts = await getPosts();
  } catch (e: any) {
    console.error("Failed to fetch posts:", e);
    errorMsg = e.message || "Could not connect to the database.";
  }

  // Helper to calculate reading time
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const textLength = content ? content.split(/\s+/).length : 0;
    return Math.ceil(textLength / wordsPerMinute) || 1;
  };

  return (
    <div className="flex flex-col gap-6">
      <Hero location={city} />

      {/* Featured Startup Journey Callout */}
      <section className="container-narrow">
        <Link href="/startup-journey" className="block group">
          <div className="p-6 rounded-3xl border bg-gradient-to-r from-border/40 via-muted/30 to-border/40 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="p-3.5 bg-primary/5 rounded-2xl border border-primary/10 text-primary shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Featured Backstory</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                  <span className="text-[10px] text-muted-foreground">Ministry of Education Award</span>
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  13 Backlogs to World IP Day Innovation Award Winner 🏆
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  How ZOVX Labs overcame academic detentions, lack of support, and failed expectations to be recognized as Andhra Pradesh's Best Innovative Startup.
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold pt-2 group-hover:underline">
                  Read the story <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Interactive Tech Terminal */}
      <TechTerminal />

      <section className="container-narrow py-6">
        <div className="flex items-center justify-between border-b pb-4 mb-8">
          <h2 className="text-xl font-bold tracking-tight text-foreground/80">
            Engineering Logs
          </h2>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {posts.length} Article{posts.length !== 1 ? 's' : ''}
          </span>
        </div>

        {errorMsg ? (
          <div className="p-6 rounded-2xl border bg-destructive/5 text-destructive/90 border-destructive/20 text-center">
            <h3 className="font-semibold mb-2">Failed to load articles</h3>
            <p className="text-sm opacity-80 mb-4">{errorMsg}</p>
            <p className="text-xs text-muted-foreground">Ensure your local backend server is running and Ngrok is active.</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {posts.map((post, index) => {
              const readingTime = getReadingTime(post.content);
              return (
                <div key={post.slug} className="contents">
                  <article className="group relative rounded-2xl border border-transparent hover:border-border hover:bg-muted/30 p-4 sm:p-6 -mx-4 sm:-mx-6 transition-all duration-300">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="flex flex-col gap-2">
                        <header className="flex items-center gap-4 text-xs text-muted-foreground mb-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            }) : 'Draft'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {readingTime} min read
                          </span>
                        </header>
                        
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors flex items-center justify-between gap-4">
                          <span>{post.title}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </h3>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  </article>


                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed rounded-2xl">
            <p className="text-muted-foreground text-sm">No articles published yet. Check back soon!</p>
          </div>
        )}
      </section>
      
      {/* Footer / Connect Trigger */}
      <footer className="container-narrow py-12 border-t mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Want to discuss a system architecture or a project?
        </p>
        <p className="text-sm font-semibold mt-1">
          Press <kbd className="px-1.5 py-0.5 rounded bg-muted border text-xs font-mono">⌘K</kbd> to unlock contact info and work history.
        </p>
      </footer>
    </div>
  );
}