import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PHASE_GLYPHS } from "@/lib/moon";
import { Cinzel, Inter } from "next/font/google";
import { LogoMark } from "@/components/Logo";
import { Nav } from "@/components/Nav";
const serif = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: "Free tarot readings, horoscopes, astrology and white-witch protection, blessing and cleansing craft, plus handmade amulets and charms.",
  openGraph: { siteName: SITE.name, type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}><body className="min-h-screen font-sans antialiased">
      <header className="sticky top-0 z-30 border-b border-silver/15 bg-night/70 backdrop-blur">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl tracking-wider text-candle glow"><LogoMark /> {SITE.name}</Link>
          <Nav />
        </nav>
      </header>
      <div aria-hidden className="text-center tracking-[1.2em] text-lg opacity-70 py-2 moon-drift">{PHASE_GLYPHS.join("")}</div>
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-10">{children}</main>
      <footer className="border-t border-silver/15 text-sm text-silver/70">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-wrap gap-4">
          <span>© {new Date().getFullYear()} {SITE.name}. For spiritual and entertainment purposes only.</span>
          <Link href="/about">About tarot</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link>
        </div>
      </footer>
    </body></html>
  );
}
