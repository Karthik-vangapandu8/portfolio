"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Award, Calendar, ShieldAlert, Sparkles, Info } from "lucide-react";
import Link from "next/link";

export default function StartupJourney() {
  return (
    <div className="container-narrow py-12 pb-24">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-12 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to logs
      </Link>

      {/* Hero Header Section */}
      <header className="mb-8 md:mb-16 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
          <Award className="w-3.5 h-3.5" />
          Best Innovative Tech Startup
        </div>

        {/* ZOVX Journey Archival Note */}
        <div className="mb-8 p-4 rounded-2xl border border-muted/50 bg-muted/20 backdrop-blur-md text-left max-w-2xl mx-auto sm:mx-0 flex items-start gap-3">
          <Info className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-foreground font-semibold text-xs sm:text-sm tracking-wide uppercase">The ZOVX Journey Archive</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              This space will serve as a log of the ZOVX Labs story—sharing our original architectural vision, the severe administrative hurdles we faced, and why we ultimately had to make the decision to shut down.
            </p>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent leading-tight">
          13 Backlogs to World IP Day Innovation Award
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl font-light">
          How ZOVX Labs overcame academic detentions and administrative rejection to be recognized by the Ministry of Education (MoE).
        </p>
      </header>

      {/* Responsive Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
        {/* Award Image container */}
        <div className="md:col-span-5 md:sticky md:top-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden border bg-muted/40 shadow-xl group aspect-auto md:aspect-[3/4] w-full"
          >
            <img
              src="/blog/images/day-2-award.jpg"
              alt="Karthik holding the World IP Day Innovation Award"
              className="w-full h-auto md:h-full md:w-full md:object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
          
          <div className="mt-6 p-4 rounded-2xl border bg-muted/20 backdrop-blur-md text-xs text-muted-foreground flex items-center gap-3">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <span>Awarded on World IP Day (April 24th, 2025) across Andhra Pradesh by the Ministry of Education & APSCHE.</span>
          </div>
        </div>

        {/* Narrative text block */}
        <div className="md:col-span-7 space-y-8 text-muted-foreground leading-relaxed text-base">
          {/* Glass Card 1 */}
          <div className="p-4 sm:p-6 rounded-2xl border bg-muted/10 backdrop-blur-md">
            <h3 className="text-foreground font-semibold flex items-center gap-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-destructive" /> The Starting Point
            </h3>
            <p>
              They told me I wasn’t made for this. With 13 backlogs, a detention on my academic record, and zero formal permissions or support, I was the complete opposite of the "ideal candidate." I didn't come from the right engineering branch, I didn't have a high CGPA, and I didn't carry the conventional "startup look."
            </p>
          </div>

          <div>
            <h3 className="text-foreground font-semibold text-lg mb-3">Studying the Shadows</h3>
            <p>
              In November 2024, while the tech industry was fascinated by high-level AI wrapping tools and superficial wrappers, I made a conscious choice to study the shadows. I spent endless nights diving deep into system architectures, database infrastructures, math foundations, and robust backend pipes. 
            </p>
            <p className="mt-4">
              It was a grueling phase filled with thankless days and constant self-doubt. But I was driven by a single conviction: 
              <span className="italic block border-l-2 pl-4 my-4 border-primary text-foreground/80 bg-muted/10 py-2">
                "They measured intelligence through a broken academic system. I'll show them what architectural vision really looks like."
              </span>
            </p>
          </div>

          {/* Glass Card 2 */}
          <div className="p-4 sm:p-6 rounded-2xl border bg-muted/10 backdrop-blur-md">
            <h3 className="text-foreground font-semibold flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-yellow-500" /> Rewriting Expectations
            </h3>
            <p>
              Fast forward 6 months. The idea that was once dismissed by administrators and peers became the startup that rewrote expectations for ANITS. ZOVX Labs was recognized as the **Best Innovative Tech Startup** across Andhra Pradesh by the Ministry of Education (MoE) and APSCHE.
            </p>
          </div>

          <div className="pt-6 border-t">
            <p className="text-sm font-semibold text-foreground mb-4">
              To everyone who feels boxed in by grades or systems:
            </p>
            <blockquote className="text-lg font-light text-foreground italic border-l-4 pl-4 border-primary">
              "Believe so boldly that even the universe has no choice but to align."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
