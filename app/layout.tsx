import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { GameProvider } from "@/lib/context/GameContext";
import { Analytics } from "@vercel/analytics/next";
import SideRailAds from "@/components/SideRailAds";

export const metadata: Metadata = {
  title: "Dodecordle - Solve 12 Wordles at Once",
  description: "A word puzzle game where you solve 12 Wordle puzzles simultaneously",
  other: {
    'google-adsense-account': 'ca-pub-3792047273691395',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3792047273691395"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <GameProvider>{children}</GameProvider>
        <SideRailAds />
        <Analytics />
      </body>
    </html>
  );
}

