import type { Metadata } from "next";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Jost,
  Dancing_Script,
} from "next/font/google";
import "./globals.css";

// Fonts loaded at build time — zero extra network requests at runtime
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-jost",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Walimatulurus Hj Hajullah Putra & Noor Syahirah",
  description: "With gratitude, we invite you to celebrate our special day.",
  openGraph: {
    title: "Walimatulurus Hj Hajullah Putra & Noor Syahirah",
    description: "Saturday, 1 August 2026 · Shah Alam",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${jost.variable} ${dancing.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
