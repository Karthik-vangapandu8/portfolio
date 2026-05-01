export default function ResumePage() {
  return (
    <div className="container-narrow py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Resume</h1>
      
      <div className="relative group">
        <div className="space-y-12 blur-xl pointer-events-none select-none opacity-40 grayscale transition-all duration-1000">
          <section>
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <p className="text-muted-foreground leading-relaxed">
              Full Stack Software Engineer with expertise in React, Next.js, and Node.js. 
              Passionate about building performant web applications and mentoring developers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Education</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Bachelor of Technology in Computer Science</h3>
                <p className="text-sm text-muted-foreground">University Name · 2021 - 2025</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Framer Motion"].map(skill => (
                <span key={skill} className="px-3 py-1 bg-accent rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <div className="pt-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/20 text-primary-foreground/20 rounded-lg font-medium cursor-not-allowed">
              Download Full Resume (PDF)
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <h2 className="text-2xl font-bold tracking-widest uppercase text-muted-foreground/80 mb-2">Coming Soon</h2>
          <p className="text-sm text-muted-foreground/60">Updating my latest achievements and experiences.</p>
        </div>
      </div>
    </div>
  );
}
