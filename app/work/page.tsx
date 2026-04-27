import { Experience } from "@/components/Experience";

export default function WorkPage() {
  return (
    <div className="flex flex-col gap-4">
      <section className="container-narrow py-12 pb-0">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Work</h1>
        <p className="text-lg text-muted-foreground">
          My work experiences across different companies and roles.
        </p>
      </section>
      <Experience />
    </div>
  );
}
