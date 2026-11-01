import Link from "next/link";
import { SIGNS } from "@/lib/signs";
export const metadata = { title: "Horoscopes", description: "Horoscopes for all twelve zodiac signs." };
export default function Page() {
  return (<>
    <h1 className="font-serif text-3xl sm:text-4xl text-center glow mb-8">Horoscopes</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {SIGNS.map((s) => <Link key={s.slug} href={`/horoscope/${s.slug}`} className="p-4 sm:p-5 rounded-2xl bg-plum/60 border border-silver/15 hover:border-candle text-center">
        <div className="text-4xl text-candle">{s.glyph}</div><div className="font-serif text-lg">{s.name}</div><div className="text-xs text-silver/70">{s.dates}</div></Link>)}
    </div>
  </>);
}
