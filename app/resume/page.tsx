export default function ResumePage() {
  return (
    <div className="container-narrow py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Resume</h1>
      
      <div className="space-y-12">
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
          <a 
            href="/resume.pdf" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            download
          >
            Download Full Resume (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}
