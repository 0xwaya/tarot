import "./globals.css";
import Link from "next/link";
import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/site";
import { PHASE_GLYPHS } from "@/lib/moon";
import { Cinzel, Inter } from "next/font/google";
import { LogoMark } from "@/components/Logo";
import { Nav } from "@/components/Nav";
const serif = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: "Free tarot readings, horoscopes, astrology and white-witch protection, blessing and cleansing craft, plus handmade amulets and charms.",
  openGraph: { siteName: SITE.name, type: "website" },
  appleWebApp: { capable: true, title: SITE.name, statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
};
export const viewport: Viewport = {
  width: "device-width", initialScale: 1, viewportFit: "cover", colorScheme: "dark",
  themeColor: [{ color: "#120a1f" }],
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}><body className="min-h-screen font-sans antialiased overflow-x-clip">
      <header className="sticky top-0 z-30 border-b border-silver/15 bg-night/85 backdrop-blur safe-top">
        <nav className="relative max-w-6xl mx-auto safe-x h-14 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 min-h-11 font-serif text-lg sm:text-xl tracking-wider text-candle glow"><LogoMark /> {SITE.name}</Link>
          <Nav />
        </nav>
      </header>
      <div aria-hidden className="text-center tracking-[.6em] sm:tracking-[1.2em] text-base sm:text-lg opacity-70 py-2 moon-drift overflow-hidden whitespace-nowrap">{PHASE_GLYPHS.join("")}</div>
      <main className="max-w-6xl mx-auto safe-x py-6 sm:py-10">{children}</main>
      <footer className="border-t border-silver/15 text-sm text-silver/70 safe-bottom">
        <div className="max-w-6xl mx-auto safe-x py-4 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="basis-full sm:basis-auto py-2">© {new Date().getFullYear()} {SITE.name}. For spiritual and entertainment purposes only.</span>
          {[["/about", "About tarot"], ["/privacy", "Privacy"], ["/terms", "Terms"]].map(([h, t]) => <Link key={h} href={h} className="inline-flex items-center min-h-11 px-2 -mx-0 hover:text-candle">{t}</Link>)}
        </div>
      </footer>
    </body></html>
  );
}
