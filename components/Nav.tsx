"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Services", id: "services" },
  { label: "Work", id: "portfolio" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/[0.06] shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="text-lg font-black tracking-tight text-white transition hover:text-accent"
        >
          GE<span className="text-accent">.</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-sm font-medium text-gray-400 transition hover:text-white"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="ml-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-accent-light"
          >
            Start a Project
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-5 bg-white transition-all duration-300 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-white transition-all duration-300 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/[0.06] bg-background/95 px-6 py-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-5">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    scrollTo(l.id);
                    setMenuOpen(false);
                  }}
                  className="text-left text-base font-medium text-gray-300 transition hover:text-white"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => {
                  scrollTo("contact");
                  setMenuOpen(false);
                }}
                className="mt-2 w-full rounded-lg bg-accent py-3 text-sm font-semibold text-background transition hover:bg-accent-light"
              >
                Start a Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
