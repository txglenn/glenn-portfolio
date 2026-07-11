import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Glenn Edwards | Web Developer & AI Consultant — San Marcos, TX",
  description:
    "Custom websites and AI consultation for small businesses in San Marcos, Wimberley, and the Texas Hill Country. Fast turnaround, modern results, fair pricing.",
  keywords: [
    "web developer San Marcos TX",
    "website design Hill Country",
    "AI consultant small business Texas",
    "Wimberley web design",
    "San Marcos website developer",
    "local business website Texas Hill Country",
  ],
  openGraph: {
    title: "Glenn Edwards | Web Developer & AI Consultant",
    description:
      "Modern websites and AI tools for local businesses across the Texas Hill Country.",
    url: "https://glennedwards.dev",
    siteName: "Glenn Edwards",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-background text-gray-200 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
