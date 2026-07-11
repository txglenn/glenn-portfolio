"use client";

import { motion } from "framer-motion";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function WebIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-accent">
      <rect x="2" y="5" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 10h24" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="7.5" r="1" fill="currentColor" />
      <circle cx="9.5" cy="7.5" r="1" fill="currentColor" />
      <circle cx="13" cy="7.5" r="1" fill="currentColor" />
      <path d="M8 15l3 3 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AIIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-accent">
      <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 3v4M14 21v4M3 14h4M21 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.22 6.22l2.83 2.83M18.95 18.95l2.83 2.83M6.22 21.78l2.83-2.83M18.95 9.05l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const cards = [
  {
    Icon: WebIcon,
    label: "01",
    title: "A New Website in Days, Not Weeks",
    body: "Custom sites built for local businesses — restaurants, HVAC, contractors, retail. I handle design, development, hosting, and maintenance. You don't touch a thing.",
    detail: "Starting at $300 · Monthly care plans from $99/mo",
    cta: "View My Work",
    target: "portfolio",
    features: ["Mobile-first & fast", "SEO-ready from day one", "Hosted & maintained for you"],
  },
  {
    Icon: AIIcon,
    label: "02",
    title: "Put AI to Work in Your Business",
    body: "One-on-one sessions to map where AI saves you real time and money. From ChatGPT workflows to content automation — I set it up, explain it plainly, and you run it.",
    detail: "Free intro call · Ongoing retainer available",
    cta: "Get in Touch",
    target: "contact",
    features: ["Workflow audit & roadmap", "Tool setup & training", "Content & copy automation"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  return (
    <section id="services" className="px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            What I Do
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Two things, done right.
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="card-glow group flex flex-col rounded-2xl p-8"
            >
              {/* Number + icon row */}
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest text-gray-700">
                  {card.label}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.08]">
                  <card.Icon />
                </div>
              </div>

              <h3 className="mb-4 text-xl font-bold leading-snug text-white">
                {card.title}
              </h3>

              <p className="mb-6 text-[15px] leading-relaxed text-gray-400">
                {card.body}
              </p>

              {/* Feature list */}
              <ul className="mb-8 flex flex-col gap-2">
                {card.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-500">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1 4l2.5 2.5L7 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-end justify-between">
                <p className="text-xs font-medium text-accent">{card.detail}</p>
                <button
                  onClick={() => scrollTo(card.target)}
                  className="text-sm font-semibold text-white/70 transition group-hover:text-accent"
                >
                  {card.cta} →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
