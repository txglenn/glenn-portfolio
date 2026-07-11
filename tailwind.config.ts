import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#0a0a0f",
        surface: "#111118",
        accent: {
          DEFAULT: "#14b8a6",
          dark: "#0d9488",
          light: "#5eead4",
        },
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
