"use client";

import { motion } from "framer-motion";

type Project = {
  name: string;
  tag: string;
  description: string;
  detail: string;
  href: string;
  gradient: string;
  label: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: "Spring Fed Surf Co.",
    tag: "Live Site",
    description:
      "Full-stack lesson booking site for a San Marcos river surfing company. Custom booking form, Supabase backend, Resend email notifications, and animated hero.",
    detail: "Next.js · Tailwind CSS · Supabase · Resend",
    href: "https://spring-fed-surf-co.vercel.app",
    gradient: "from-teal-500/25 via-cyan-600/15 to-background",
    label: "River Surfing · San Marcos, TX",
    featured: true,
  },
  {
    name: "Coming Soon",
    tag: "In Progress",
    description:
      "A Hill Country restaurant client site — menu, hours, and a reservations flow. Launching soon.",
    detail: "Next.js · Tailwind CSS",
    href: "#",
    gradient: "from-blue-600/20 via-indigo-600/10 to-background",
    label: "Restaurant · Hill Country, TX",
  },
  {
    name: "Coming Soon",
    tag: "In Progress",
    description:
      "Service business lead-gen site with a contact form and Google Maps integration for a local contractor.",
    detail: "Next.js · Tailwind CSS",
    href: "#",
    gradient: "from-violet-600/20 via-purple-600/10 to-background",
    label: "Contractor · San Marcos, TX",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline">
      <path d="M5 2H2a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M8 1h5v5M13 1L7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            My Work
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            What I&apos;ve built.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.name + i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className={`card-glow group flex flex-col overflow-hidden rounded-2xl ${
                project.featured ? "md:col-span-2" : ""
              }`}
            >
              {/* Visual */}
              <div
                className={`relative flex h-48 items-end bg-gradient-to-br ${project.gradient} p-6`}
              >
                <div className="absolute inset-0 bg-dot-grid bg-[size:24px_24px] opacity-20" />
                <div className="relative z-10 flex w-full items-end justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    {project.label}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                      project.tag === "Live Site"
                        ? "bg-accent/20 text-accent"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {project.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold text-white">{project.name}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-400">
                  {project.description}
                </p>
                <p className="mb-5 text-xs text-gray-600">{project.detail}</p>
                <a
                  href={project.href}
                  target={project.href !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition ${
                    project.href !== "#"
                      ? "text-accent hover:text-accent-light"
                      : "cursor-default text-gray-700"
                  }`}
                >
                  {project.href !== "#" ? (
                    <>
                      View Site <ExternalIcon />
                    </>
                  ) : (
                    "Coming soon"
                  )}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
