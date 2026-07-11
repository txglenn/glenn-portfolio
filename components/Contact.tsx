"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const body = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      project_type: fd.get("project_type"),
      message: fd.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Please try again.");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-accent/60 focus:bg-white/[0.06]";

  return (
    <section id="contact" className="px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              Contact
            </p>
            <h2 className="mb-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Let&apos;s talk<br />about your project.
            </h2>
            <p className="mb-8 text-[15px] leading-relaxed text-gray-400">
              Tell me what you&apos;re working on. I&apos;ll reply within 24
              hours and we&apos;ll set up a time to talk through the details.
            </p>

            <div className="space-y-4">
              {[
                { label: "Email", value: "txglenn04@gmail.com", href: "mailto:txglenn04@gmail.com" },
                { label: "Location", value: "San Marcos, TX — Hill Country" },
                { label: "Response time", value: "Within 24 hours" },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline gap-3">
                  <span className="w-28 shrink-0 text-xs font-medium uppercase tracking-wider text-gray-700">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-gray-300 transition hover:text-accent"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-300">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {status === "success" ? (
              <div className="card-glow flex flex-col items-center rounded-2xl p-10 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 10l5 5L17 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Request sent.</h3>
                <p className="text-sm text-gray-400">
                  I&apos;ll reach out within 24 hours to set up a time to talk
                  through your project.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="card-glow flex flex-col gap-4 rounded-2xl p-8"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Name *
                    </label>
                    <input name="name" type="text" required className={inputCls} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Email *
                    </label>
                    <input name="email" type="email" required className={inputCls} placeholder="you@example.com" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Phone
                  </label>
                  <input name="phone" type="tel" className={inputCls} placeholder="(512) 555-0000" />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    What do you need?
                  </label>
                  <select name="project_type" defaultValue="" className={inputCls + " cursor-pointer"}>
                    <option value="" disabled>Select one</option>
                    <option value="website">A new website</option>
                    <option value="ai_consultation">AI consultation</option>
                    <option value="both">Both</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className={inputCls + " resize-none"}
                    placeholder="Tell me about your business and what you're looking for..."
                  />
                </div>

                {status === "error" && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3 text-sm text-red-400">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-1 w-full rounded-xl bg-accent py-3.5 text-sm font-semibold text-background transition hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : "Send Request"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
