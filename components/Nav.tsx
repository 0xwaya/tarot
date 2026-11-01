"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const LINKS = [["/reading", "Readings"], ["/horoscope", "Horoscopes"], ["/shop", "Shop"], ["/about", "About"]];
export function Nav() {
  const [open, setOpen] = useState(false); const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => { if (!open) return; const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, [open]);
  const cur = (h: string) => path.startsWith(h);
  return (<>
    <div className="hidden sm:flex gap-1">{LINKS.map(([h, t]) => <Link key={h} href={h} aria-current={cur(h) ? "page" : undefined} className={`inline-flex items-center min-h-11 px-3 hover:text-candle transition ${cur(h) ? "text-candle" : ""}`}>{t}</Link>)}</div>
    <button className="sm:hidden w-11 h-11 -mr-2 flex flex-col items-center justify-center gap-1.5" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
      <span className={`block w-6 h-0.5 bg-silver transition ${open ? "translate-y-2 rotate-45" : ""}`} /><span className={`block w-6 h-0.5 bg-silver transition ${open ? "opacity-0" : ""}`} /><span className={`block h-0.5 bg-candle transition ${open ? "w-6 -translate-y-2 -rotate-45" : "w-4 self-end mr-2.5"}`} /></button>
    {open && <div id="mnav" className="sm:hidden absolute top-full inset-x-0 bg-night/95 backdrop-blur border-b border-silver/15 safe-x pb-2 fade-up">{LINKS.map(([h, t]) => <Link key={h} href={h} aria-current={cur(h) ? "page" : undefined} className={`flex items-center min-h-12 border-t border-silver/10 text-lg ${cur(h) ? "text-candle" : ""}`}>{t}</Link>)}</div>}
  </>);
}
