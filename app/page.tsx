import { headers } from "next/headers";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { BlogSnippet } from "@/components/BlogSnippet";

export default async function Home() {
  const headerList = await headers();
  const city = headerList.get("x-user-city") || "the world";

  return (
    <div className="flex flex-col gap-4">
      <Hero location={city} />
      <Experience />
      <BlogSnippet />
      
      <section className="container-narrow py-12">
        <h2 className="section-title">Development</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card-minimal">
            <h3 className="font-semibold mb-1">Gears</h3>
            <p className="text-xs text-muted-foreground">Tools, devices, and software I use to get work done.</p>
          </div>
          <div className="card-minimal">
            <h3 className="font-semibold mb-1">Setup</h3>
            <p className="text-xs text-muted-foreground">VSCode / Cursor configuration and extensions guide.</p>
          </div>
          <div className="card-minimal">
            <h3 className="font-semibold mb-1">Terminal</h3>
            <p className="text-xs text-muted-foreground">Zsh, Starship, Fastfetch, and shell configuration.</p>
          </div>
        </div>
      </section>

      <section className="container-narrow py-12">
        <h2 className="section-title">Personal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card-minimal">
            <h3 className="font-semibold mb-1">Books</h3>
            <p className="text-xs text-muted-foreground">Books that have influenced my thinking and growth.</p>
          </div>
          <div className="card-minimal">
            <h3 className="font-semibold mb-1">Movies</h3>
            <p className="text-xs text-muted-foreground">Films and shows that have inspired and entertained me.</p>
          </div>
        </div>
      </section>
    </div>
  );
}