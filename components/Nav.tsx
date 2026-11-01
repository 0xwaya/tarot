"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const LINKS = [["/reading", "Readings"], ["/horoscope", "Horoscopes"], ["/shop", "Shop"]];
export function Nav() {
  const [open, setOpen] = useState(false); const path = usePathname();
  return (<>
    <div className="hidden sm:flex gap-6">{LINKS.map(([h, t]) => <Link key={h} href={h} className={`hover:text-candle transition ${path.startsWith(h) ? "text-candle" : ""}`}>{t}</Link>)}</div>
    <button className="sm:hidden p-2 -mr-2" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
      <span className="block w-6 h-0.5 bg-silver mb-1.5" /><span className="block w-6 h-0.5 bg-silver mb-1.5" /><span className="block w-4 h-0.5 bg-candle" /></button>
    {open && <div className="sm:hidden basis-full flex flex-col gap-1 pt-3 fade-up">{LINKS.map(([h, t]) => <Link key={h} href={h} onClick={() => setOpen(false)} className="py-3 border-t border-silver/10 text-lg">{t}</Link>)}</div>}
  </>);
}
