"use client";

import { motion } from "framer-motion";

const cards = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
    label: "Leadership",
    title: "Wake Team President",
    body: "Texas State University — organized sanctioned competitions, managed team budget, coordinated athletes, venues, and sponsors. Led a competitive collegiate wake sports program.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 14s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2S3 3 3 3v11z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M3 20v-6M17 20v-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    label: "Athletics",
    title: "Aspiring Multi-Sport Athlete",
    body: "River surfing · Wakesurfing · Wakeboarding · Snowboarding · Strength training. High-level knowledge of fitness programming, movement mechanics, and training modalities.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    label: "Education",
    title: "BBA · Computer Information Systems",
    body: "Texas State University, graduating May 2027. Coursework spanning systems analysis, database design, business strategy, and applied technology — grounding my dev work in real business context.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Background() {
  return (
    <section className="px-6 pb-28 sm:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-700">
            Beyond the Code
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="card-glow rounded-xl p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/15 bg-accent/[0.07] text-accent">
                  {card.icon}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-600">
                  {card.label}
                </span>
              </div>
              <h3 className="mb-2.5 text-sm font-bold text-white">{card.title}</h3>
              <p className="text-xs leading-relaxed text-gray-500">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
