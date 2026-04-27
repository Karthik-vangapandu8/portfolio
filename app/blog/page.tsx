import { BlogSnippet } from "@/components/BlogSnippet";

export default function BlogPage() {
  return (
    <div className="flex flex-col gap-4">
      <section className="container-narrow py-12 pb-0">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Thoughts, tutorials, and insights on engineering and programming.
        </p>
      </section>
      <BlogSnippet />
    </div>
  );
}
