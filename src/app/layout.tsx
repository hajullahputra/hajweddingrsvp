import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wedding Hj Hajullah Putra & Noor Syahirah",
  description: "Dengan penuh rasa syukur, kami menjemput kehadiran anda",
  openGraph: {
    title: "Wedding Hj Hajullah Putra & Noor Syahirah",
    description: "Saturday, 1 August 2025 · Shah Alam",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms">
      <body>{children}</body>
    </html>
  );
}
