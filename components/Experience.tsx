"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  bullets?: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Self-Employed",
    role: "Backend Engineer | AI Agent Systems",
    period: "Feb 2026 – Present",
    location: "Remote",
    description: "Working on backend engineering and AI agent systems with a strong focus on core fundamentals and robust system design.",
    bullets: [
      "Designing backend services, APIs, and high-performance data flows.",
      "Building autonomous AI agents using tool-calling, planning, memory, and orchestration patterns.",
      "Exploring distributed systems concepts such as queues, pub/sub, and async communication protocols.",
      "Studying service communication paradigms (HTTP, events, message brokers).",
      "Building backend-first agent architectures rather than conventional UI-driven apps."
    ]
  },
  {
    company: "GirlScript Summer of Code",
    role: "Contributor",
    period: "May 2024 – Present",
    location: "Part-time",
    description: "Contributing to various open source software repositories, participating in code reviews, and writing functional features."
  },
  {
    company: "ZOVX LABS",
    role: "Founder",
    period: "Apr 2024 – Present",
    location: "Vishakhapatnam, India · On-site",
    description: "Leading software operations, architecting high-end web applications, and handling client projects."
  },
  {
    company: "Coding Ninjas (ANITS)",
    role: "Technical Lead",
    period: "Mar 2024 – Present",
    location: "ANITS · On-site",
    description: "Guiding the Coding Ninjas team at ANITS, mentoring members in algorithm designs and preparing for programming contests.",
    bullets: [
      "Organized workshops on competitive coding and open-source contributions in partnership with Google DSC.",
      "Mentored peers in technical leadership, programming, and software engineering methodologies."
    ]
  },
  {
    company: "Chegg India",
    role: "Managed Network Expert",
    period: "Jun 2024 – Sep 2025",
    location: "Remote (Freelance)",
    description: "Provided fast, verified, and detailed solutions for both Computer Science and Electrical Engineering concepts."
  },
  {
    company: "Smart India Hackathon",
    role: "Team Leader (Sole Junior Selected)",
    period: "Jan 2023",
    location: "Vishakhapatnam, India · On-site",
    description: "Selected as the sole junior team leader among entries across all branches to design systems for real-world issues.",
    bullets: [
      "Led team coordination and system architecture design during ANITS Internal Hackathon.",
      "Presented final prototype to jury members and received official team lead recognition from SIH."
    ]
  }
];

export const Experience = () => {
  return (
    <section className="container-narrow py-12">
      <h2 className="section-title">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative pl-6 border-l"
          >
            <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-primary" />
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <div>
                <h3 className="font-semibold text-base">{exp.company}</h3>
                <p className="text-sm text-muted-foreground font-medium">{exp.role}</p>
              </div>
              <div className="text-xs text-muted-foreground text-left sm:text-right mt-1 sm:mt-0">
                <p className="font-medium">{exp.period}</p>
                <p>{exp.location}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground/90 leading-relaxed">
              {exp.description}
            </p>

            {exp.bullets && (
              <ul className="mt-3 list-disc pl-5 space-y-1 text-xs text-muted-foreground/80">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
