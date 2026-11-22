"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function About() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section id="about" className="px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="card-glow rounded-2xl p-8 md:p-12"
        >
          <div className="flex flex-col gap-10 md:flex-row md:items-start">
            {/* Photo */}
            <div className="flex flex-col items-center gap-3 md:items-start">
              {photoFailed ? (
                <div className="h-32 w-32 shrink-0 rounded-2xl bg-gradient-to-br from-accent/30 via-teal-600/20 to-blue-600/20" />
              ) : (
                <img
                  src="/media/headshots/Glenn.webp"
                  alt="Glenn Edwards"
                  onError={() => setPhotoFailed(true)}
                  className="h-32 w-32 shrink-0 rounded-2xl object-cover"
                />
              )}
              <div className="flex flex-col items-center gap-1 md:items-start">
                <span className="text-sm font-semibold text-white">Glenn Edwards</span>
                <span className="text-xs text-gray-500">San Marcos, TX</span>
              </div>
            </div>

            {/* Copy */}
            <div className="flex-1">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                About
              </p>
              <h2 className="mb-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Built from<br />real experience.
              </h2>
              <div className="space-y-4 text-[15px] leading-relaxed text-gray-400">
                <p>
                  I&apos;m Glenn — a consultant, personal trainer, and watersports instructor
                  based in San Marcos, TX. I served as President of the Texas State Wake Team,
                  where I managed competitions, logistics, and a full roster, and helped host
                  nationally recognized events on the San Marcos River.
                </p>
                <p>
                  Whether it&apos;s fitness programming, leadership, life direction, river surf
                  instruction, or figuring out what&apos;s actually holding you back — I bring
                  a longevity-first mindset to every conversation. Web builds for local
                  businesses are part of what I do too, but the core is people, performance,
                  and practical results.
                </p>
              </div>

              {/* Trust signals */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "San Marcos + Hill Country",
                  "Trainer at THRC San Marcos",
                  "Available for new clients",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => scrollTo("contact")}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accent-light"
              >
                Work with me →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
