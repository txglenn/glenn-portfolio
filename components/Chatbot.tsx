"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "bot" | "user"; text: string };

type Intent =
  | "web"
  | "ai"
  | "surf"
  | "training"
  | "general"
  | null;

function detectIntent(text: string): Intent {
  const t = text.toLowerCase();
  if (/web|site|website|design|build|page|landing|portfolio|business site/.test(t)) return "web";
  if (/ai|artificial|automat|consult|chatgpt|machine|llm|workflow|tech|advice|strategy/.test(t)) return "ai";
  if (/surf|river|wave|lesson|water|san marcos|aqua/.test(t)) return "surf";
  if (/train|workout|fitness|gym|coach|personal train|strength|exercise/.test(t)) return "training";
  return "general";
}

const intentResponses: Record<NonNullable<Intent>, { text: string; link: string; label: string; section: string }> = {
  web: {
    text: "Website design is my primary service — I build fast, modern sites for local businesses. Check out my work and pricing below.",
    link: "#services",
    label: "See Web Services →",
    section: "services",
  },
  ai: {
    text: "I consult on business strategy, AI adoption, and tech decisions — book a free intro call to see if it's a fit.",
    link: "#contact",
    label: "Book a Free Call →",
    section: "contact",
  },
  surf: {
    text: "River surf lessons on the San Marcos River — I run a separate site for that.",
    link: "https://spring-fed-surf-co.vercel.app",
    label: "Spring Fed Surf Co. →",
    section: "external",
  },
  training: {
    text: "I'm a personal trainer at THRC San Marcos. Book a free call and we'll build a longevity-focused plan around your goals — powerlifting, sports recovery, functional training — online or in person at THRC.",
    link: "#contact",
    label: "Get in Touch →",
    section: "contact",
  },
  general: {
    text: "Here's a quick map of what I offer — click anything that sounds right.",
    link: "#services",
    label: "Browse Services →",
    section: "services",
  },
};

const GREETING = "Hey — what brings you here today? Consulting, surf lessons, personal training, or something else?";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [intent, setIntent] = useState<Intent>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const detected = detectIntent(trimmed);
    const response = intentResponses[detected ?? "general"];

    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "bot", text: response.text },
    ]);
    setIntent(detected);
    setInput("");
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSend();
  }

  function handleQuickNav(section: string, link: string) {
    if (section === "external") {
      window.open(link, "_blank", "noopener");
    } else {
      setOpen(false);
      setTimeout(() => scrollTo(section), 300);
    }
  }

  const currentResponse = intent ? intentResponses[intent] : null;

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open assistant"
        className="fixed bottom-6 right-6 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/30 transition hover:bg-accent-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        style={{ width: 52, height: 52 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              xmlns="http://www.w3.org/2000/svg"
              width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              className="text-background"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              xmlns="http://www.w3.org/2000/svg"
              width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              className="text-background"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 flex w-[340px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-surface shadow-2xl shadow-black/60 sm:w-[380px]"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white">Ask Glenn</p>
                <p className="text-[11px] text-gray-500">Find what you're looking for</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ maxHeight: 320 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-xl px-3.5 py-2 text-[13px] leading-relaxed ${
                      msg.role === "bot"
                        ? "bg-white/[0.05] text-gray-200"
                        : "bg-accent text-background font-medium"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Quick-link button after intent is detected */}
              {currentResponse && (
                <div className="flex justify-start">
                  <button
                    onClick={() => handleQuickNav(currentResponse.section, currentResponse.link)}
                    className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-2 text-[13px] font-semibold text-accent transition hover:bg-accent/20"
                  >
                    {currentResponse.label}
                  </button>
                </div>
              )}

              {/* Quick pick buttons on first greeting */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {(["Consulting", "Surf Lessons", "Personal Training"] as const).map((label) => (
                    <button
                      key={label}
                      onClick={() => {
                        const fakeInput = label === "Consulting" ? "consult" : label.toLowerCase();
                        const detected = detectIntent(fakeInput);
                        const response = intentResponses[detected ?? "general"];
                        setMessages((prev) => [
                          ...prev,
                          { role: "user", text: label },
                          { role: "bot", text: response.text },
                        ]);
                        setIntent(detected);
                      }}
                      className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[12px] text-gray-300 transition hover:border-accent/30 hover:text-white"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/[0.07] px-3 py-3">
              <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Type your question..."
                  className="flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-gray-600"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-background transition disabled:opacity-30 hover:bg-accent-light"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
