"use client";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const navLinks = [
  { label: "Services", id: "services" },
  { label: "Work", id: "portfolio" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-background px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand */}
          <button
            onClick={() => scrollTo("home")}
            className="text-lg font-black tracking-tight text-white transition hover:text-accent"
          >
            GE<span className="text-accent">.</span>
          </button>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm text-gray-500 transition hover:text-gray-300"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Surf site */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-700 transition hover:text-accent"
          >
            River surf lessons →
          </a>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/[0.04] pt-6 text-xs text-gray-700 sm:flex-row">
          <span>© 2026 Glenn Edwards. All rights reserved.</span>
          <span>San Marcos, TX — Texas Hill Country</span>
        </div>
      </div>
    </footer>
  );
}
