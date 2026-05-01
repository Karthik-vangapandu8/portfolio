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
      <div className="relative group">
        <div className="blur-md pointer-events-none select-none opacity-50 grayscale transition-all duration-500 group-hover:blur-sm">
          <Experience />
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="px-4 py-2 bg-background/80 backdrop-blur-md border rounded-full text-xs font-semibold tracking-widest uppercase text-muted-foreground shadow-sm">
            Coming Soon
          </div>
        </div>
      </div>
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