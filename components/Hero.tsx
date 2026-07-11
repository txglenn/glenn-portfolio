"use client";

import { useState } from "react";
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

function Headshot() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative mx-auto w-fit lg:mx-0">
      {/* Outer glow ring */}
      <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-accent/20 via-indigo-500/10 to-transparent blur-xl" />
      {/* Subtle rotating dashes ring */}
      <svg
        className="absolute -inset-4 h-[calc(100%+32px)] w-[calc(100%+32px)] animate-[spin_30s_linear_infinite] opacity-20"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle
          cx="100" cy="100" r="96"
          stroke="#14b8a6"
          strokeWidth="1"
          strokeDasharray="6 8"
        />
      </svg>
      {/* Photo */}
      {failed ? (
        <div className="relative h-56 w-56 rounded-full bg-gradient-to-br from-indigo-600/30 via-accent/20 to-background sm:h-64 sm:w-64 lg:h-72 lg:w-72" />
      ) : (
        <img
          src="/media/headshots/headshot.jpg"
          alt="Glenn Edwards"
          onError={() => setFailed(true)}
          className="relative h-56 w-56 rounded-full object-cover object-top ring-1 ring-white/10 sm:h-64 sm:w-64 lg:h-72 lg:w-72"
        />
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-16 sm:px-10"
    >
      {/* Background — indigo/violet tint instead of teal to differentiate from Spring Fed Surf */}
      <div className="absolute inset-0 bg-dot-grid bg-[size:32px_32px] opacity-[0.35]" />
      <div className="pointer-events-none absolute left-[20%] top-[25%] h-[550px] w-[650px] -translate-y-1/2 rounded-full bg-indigo-600/[0.09] blur-[130px]" />
      <div className="pointer-events-none absolute right-[-5%] top-[15%] h-[400px] w-[400px] rounded-full bg-violet-600/[0.07] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-[20%] h-[250px] w-[250px] rounded-full bg-accent/[0.06] blur-[80px]" />

      {/* Geometric accent — top-left corner only, subtle */}
      <svg
        className="pointer-events-none absolute left-0 top-16 hidden opacity-[0.06] lg:block"
        width="160" height="160" viewBox="0 0 160 160" fill="none"
      >
        <rect x="8" y="8" width="144" height="144" stroke="#14b8a6" strokeWidth="0.6" />
        <rect x="24" y="24" width="112" height="112" stroke="#14b8a6" strokeWidth="0.6" />
        <rect x="40" y="40" width="80" height="80" stroke="#14b8a6" strokeWidth="0.6" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16"
        >
          {/* ── Text column ── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Overline */}
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/60 lg:block" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                Developer · Consultant · Creator
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl font-black leading-[1.04] tracking-tight text-white sm:text-6xl md:text-[68px]"
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
              className="mt-6 max-w-lg text-[17px] leading-relaxed text-gray-400"
            >
              I&apos;m Glenn — a San&nbsp;Marcos-based developer and consultant.
              I build modern websites and help businesses across the Hill Country
              adopt AI tools that actually stick.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
            >
              <button
                onClick={() => scrollTo("portfolio")}
                className="w-full rounded-xl bg-accent px-8 py-3.5 font-semibold text-background transition hover:bg-accent-light sm:w-auto"
              >
                See My Work
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="w-full rounded-xl border border-white/[0.12] px-8 py-3.5 font-semibold text-white/90 transition hover:border-accent/40 hover:bg-white/[0.04] hover:text-white sm:w-auto"
              >
                Start a Project →
              </button>
            </motion.div>

            {/* Meta */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-center gap-5 text-xs text-gray-600"
            >
              <span>San Marcos, TX</span>
              <span className="h-px w-4 bg-gray-700" />
              <span>Hill Country</span>
              <span className="h-px w-4 bg-gray-700" />
              <span className="text-accent/60">Available Now</span>
            </motion.div>
          </div>

          {/* ── Headshot column ── */}
          <motion.div
            variants={fadeUp}
            className="shrink-0"
          >
            <Headshot />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator — line only, no text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="h-12 w-px bg-gradient-to-b from-gray-700/80 to-transparent" />
      </motion.div>
    </section>
  );
}
