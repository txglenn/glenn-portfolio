"use client";

import { motion } from "framer-motion";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function ConsultIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-accent">
      <circle cx="14" cy="10" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 24c0-4.418 4.03-8 9-8s9 3.582 9 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 13l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrainIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-accent">
      <path d="M4 14h4M20 14h4M8 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="6" y="11" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="18" y="11" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="10" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function WaterIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-accent">
      <path d="M4 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 16V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 11l4-6 4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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

const cards = [
  {
    Icon: ConsultIcon,
    label: "01",
    title: "Consulting & Life Strategy",
    body: "Leadership, life direction, goal-setting, fulfillment — I work with people who want real answers, not generic advice. Rooted in hands-on experience leading a competitive university team and building from the ground up in the Hill Country.",
    detail: "Free intro call · No obligation",
    cta: "Get in Touch",
    target: "contact",
    features: ["Leadership & personal development", "Goal clarity and accountability", "Longevity-first decision making"],
  },
  {
    Icon: TrainIcon,
    label: "02",
    title: "Personal Training",
    body: "In-person at THRC San Marcos or fully online. Programming built around strength, longevity, and sport performance — powerlifting background with a focus on movement quality and recovery that holds up long-term.",
    detail: "Free first session · In-person or remote",
    cta: "Get in Touch",
    target: "contact",
    features: ["Powerlifting & functional strength", "Sports performance & recovery", "Nutrition and lifestyle guidance"],
  },
  {
    Icon: WaterIcon,
    label: "03",
    title: "River Surf & Watersports Instruction",
    body: "River surfing on the San Marcos River through Spring Fed Surf Co. Wakeboarding and wakesurfing on the lake. As a former Texas State Wake Team president who's competed at the national level, I know how to build real water confidence — fast.",
    detail: "Book through Spring Fed Surf Co.",
    cta: "Spring Fed Surf Co.",
    target: "https://spring-fed-surf-co.vercel.app",
    features: ["River surf lessons (all levels)", "Wakeboarding & wakesurfing", "Competed nationally, taught locally"],
    external: true,
  },
  {
    Icon: WebIcon,
    label: "04",
    title: "Web Builds for Local Businesses",
    body: "Clean, fast websites for Hill Country small businesses. I handle everything — design, development, and hosting. Not my only skill, but a practical one I offer to businesses that need a professional presence without a big agency price tag.",
    detail: "Starting at $300 · Care plans from $30/mo",
    cta: "View My Work",
    target: "portfolio",
    features: ["Mobile-first & SEO-ready", "Full design to deployment", "Ongoing maintenance available"],
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
            What I actually do.
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
                {"external" in card && card.external ? (
                  <a
                    href={card.target}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white/70 transition group-hover:text-accent"
                  >
                    {card.cta} →
                  </a>
                ) : (
                  <button
                    onClick={() => scrollTo(card.target)}
                    className="text-sm font-semibold text-white/70 transition group-hover:text-accent"
                  >
                    {card.cta} →
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
