import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dodecordle - Solve 12 Wordles at Once",
  description: "A word puzzle game where you solve 12 Wordle puzzles simultaneously",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

