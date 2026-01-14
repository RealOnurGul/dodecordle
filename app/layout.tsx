import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "@/lib/context/GameContext";
import { Analytics } from "@vercel/analytics/next";

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
      <body className="antialiased">
        <GameProvider>{children}</GameProvider>
        <Analytics />
      </body>
    </html>
  );
}

