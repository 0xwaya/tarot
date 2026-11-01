import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PHASE_GLYPHS } from "@/lib/moon";
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: "Free tarot readings, horoscopes, astrology and white-witch protection, blessing and cleansing craft, plus handmade amulets and charms.",
  openGraph: { siteName: SITE.name, type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body className="min-h-screen font-sans">
      <header className="border-b border-silver/15">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap gap-x-6 gap-y-2 items-center">
          <Link href="/" className="font-serif text-xl text-candle glow mr-auto">🌘🌕🌒 {SITE.name}</Link>
          <Link href="/reading">Readings</Link><Link href="/horoscope">Horoscopes</Link><Link href="/shop">Shop</Link>
        </nav>
      </header>
      <div aria-hidden className="text-center tracking-[1.2em] text-lg opacity-70 py-2">{PHASE_GLYPHS.join("")}</div>
      <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
      <footer className="border-t border-silver/15 text-sm text-silver/70">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-wrap gap-4">
          <span>© {new Date().getFullYear()} {SITE.name}. For entertainment and spiritual reflection only.</span>
          <Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link>
        </div>
      </footer>
    </body></html>
  );
}
