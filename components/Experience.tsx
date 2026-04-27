"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "Good Day",
    role: "Full Stack Engineer",
    period: "Jan 2026 – Present",
    location: "Hyderabad, India",
    description: "Building scalable web applications and optimizing system performance.",
  },
  {
    company: "Promote",
    role: "Founding Frontend Engineer",
    period: "Aug 2025 – Dec 2025",
    location: "Remote (USA)",
    description: "Led the development of the core frontend architecture and UI components.",
  },
  {
    company: "Upsurge Labs",
    role: "Backend Developer Intern",
    period: "Jun 2025 – Jul 2025",
    location: "Bangalore, India",
    description: "Assisted in building API services and database management.",
  },
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
            transition={{ delay: index * 0.1 }}
            className="relative pl-6 border-l"
          >
            <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-primary" />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <div>
                <h3 className="font-semibold">{exp.company}</h3>
                <p className="text-sm text-muted-foreground">{exp.role}</p>
              </div>
              <div className="text-sm text-muted-foreground text-left sm:text-right">
                <p>{exp.period}</p>
                <p>{exp.location}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
