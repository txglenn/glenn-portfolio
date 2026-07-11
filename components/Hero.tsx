"use client";

import { motion } from "framer-motion";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16 sm:px-10"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-dot-grid bg-[size:32px_32px] opacity-[0.4]" />
      <div className="pointer-events-none absolute left-1/2 top-[30%] h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[130px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.07] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-[-5%] h-[300px] w-[300px] rounded-full bg-accent/[0.06] blur-[80px]" />

      {/* Geometric accent lines */}
      <svg
        className="pointer-events-none absolute right-12 top-1/3 hidden opacity-[0.07] lg:block"
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="80" stroke="#14b8a6" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="55" stroke="#14b8a6" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="30" stroke="#14b8a6" strokeWidth="0.5" />
        <line x1="100" y1="0" x2="100" y2="200" stroke="#14b8a6" strokeWidth="0.5" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="#14b8a6" strokeWidth="0.5" />
      </svg>

      <svg
        className="pointer-events-none absolute left-12 top-1/2 hidden opacity-[0.05] lg:block"
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
      >
        <rect x="10" y="10" width="100" height="100" stroke="#14b8a6" strokeWidth="0.5" />
        <rect x="25" y="25" width="70" height="70" stroke="#14b8a6" strokeWidth="0.5" />
        <rect x="40" y="40" width="40" height="40" stroke="#14b8a6" strokeWidth="0.5" />
      </svg>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        {/* Overline */}
        <motion.div variants={fadeUp} className="mb-7 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent/60" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Developer · Consultant · Creator
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-accent/60" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl font-black leading-[1.04] tracking-tight text-white sm:text-6xl md:text-[76px]"
        >
          Technology built
          <br />
          <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
            for the real world.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-gray-400"
        >
          I&apos;m Glenn — a San&nbsp;Marcos-based developer and consultant.
          I build modern websites and help businesses across the Hill Country
          adopt AI tools that actually stick.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            onClick={() => scrollTo("portfolio")}
            className="group relative w-full overflow-hidden rounded-xl bg-accent px-8 py-3.5 font-semibold text-background transition hover:bg-accent-light sm:w-auto"
          >
            See My Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="w-full rounded-xl border border-white/12 px-8 py-3.5 font-semibold text-white/90 transition hover:border-accent/40 hover:bg-white/[0.04] hover:text-white sm:w-auto"
          >
            Start a Project →
          </button>
        </motion.div>

        {/* Meta line */}
        <motion.div
          variants={fadeUp}
          className="mt-14 flex items-center justify-center gap-6 text-xs text-gray-600"
        >
          <span>San Marcos, TX</span>
          <span className="h-px w-5 bg-gray-700" />
          <span>Hill Country</span>
          <span className="h-px w-5 bg-gray-700" />
          <span className="text-accent/70">Available Now</span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-widest text-gray-700">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-gray-700 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
