export const revalidate = 3600; // daily card + moon recompute hourly; cron also revalidates
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { moonPhase } from "@/lib/moon";
import { CARDS } from "@/lib/cards";
import { CardFace } from "@/components/CardFace";
import { dailyCard } from "@/lib/daily";
import { dayKey } from "@/lib/seed";
const topics = [
  ["Tarot", "Full 78-card deck, four spreads, reversals.", "/reading"],
  ["Astrology & Horoscopes", "Guidance for all twelve signs.", "/horoscope"],
  ["Protection", "White-witch shields against ill intent.", "/reading?spread=protection"],
  ["Blessings", "Oils and rites for abundance and love.", "/shop"],
  ["Cleansing", "White sage, moonwater and salt rituals.", "/shop"],
  ["Moon Magic", "Work with each phase: set, grow, release, rest.", "/horoscope"],
];
export default function Home() {
  const featured = ["the-star", "the-high-priestess", "the-moon"].map((id) => CARDS.find((c) => c.id === id)!);
  const moon = moonPhase();
  const today = dailyCard();
  return (<>
    <section className="fade-up relative isolate grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center mb-12 md:mb-16 rounded-3xl overflow-hidden p-5 sm:p-6 md:p-10">
      <Image src="/img/hero.webp" alt="" fill priority sizes="100vw" className="object-cover -z-10 opacity-70" />
      <div className="min-w-0">
        <p className="uppercase tracking-[.2em] sm:tracking-[.3em] text-xs text-candle mb-3">Tarot · Astrology · White-witch craft</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl glow mb-4 break-words">{SITE.name}</h1>
        <p className="text-base sm:text-lg text-silver mb-6 sm:mb-8 max-w-prose">{SITE.tagline}. Draw your cards, read your stars, and protect and bless your home.</p>
        <p className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-2xl sm:rounded-full text-sm sm:text-base max-w-full border border-silver/30 bg-plum/50"><span className="text-3xl">{moon.glyph}</span><span>Tonight: <b className="text-candle">{moon.name}</b> · day {moon.age} of the lunar cycle</span></p>
        <div className="flex flex-wrap gap-3">
          <Link href="/reading?spread=daily&auto=1" className="inline-flex items-center min-h-12 px-6 rounded-full bg-candle text-night font-semibold">Draw today&apos;s card</Link>
          <Link href="/shop" className="inline-flex items-center min-h-12 px-6 rounded-full border border-silver/40">Visit the shop</Link>
        </div>
      </div>
      <div className="flex justify-center gap-3">
        {featured.map((c, i) => <div key={c.id} className={`w-[28%] max-w-40 ${i === 1 ? "-translate-y-4" : (i ? "rotate-6" : "-rotate-6")}`}><CardFace card={c} sizes="(max-width:768px) 30vw, 160px" /></div>)}
      </div>
    </section>
    <section className="fade-up grid md:grid-cols-[220px_1fr] gap-8 items-center mb-12 md:mb-16 p-5 sm:p-6 rounded-3xl bg-plum/50 border border-candle/25">
      <div className="w-40 md:w-full mx-auto float"><CardFace card={today.card} reversed={today.reversed} sizes="(max-width:768px) 160px, 220px" /></div>
      <div className="min-w-0">
        <p className="uppercase tracking-[.2em] sm:tracking-[.3em] text-xs text-candle mb-2">Card of the day · {dayKey()}</p>
        <h2 className="font-serif text-2xl sm:text-3xl mb-2">{today.card.name}{today.reversed && <span className="text-candle text-xl"> (reversed)</span>}</h2>
        <p className="text-silver/70 text-sm mb-3">{today.card.keywords.join(" · ")}</p>
        <p className="text-silver leading-relaxed mb-4 max-w-prose">{today.reversed ? today.card.reversed : today.card.upright}</p>
        {today.card.spirit && <p className="text-silver/80 text-sm mb-4">{today.card.spirit}</p>}
        <Link href="/reading?spread=three&auto=1" className="inline-flex items-center min-h-11 px-5 rounded-full border border-candle text-candle hover:bg-candle hover:text-night transition">Go deeper with a 3-card reading</Link>
      </div>
    </section>
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {topics.map(([t, d, h]) => (
        <Link key={t} href={h} className="p-5 sm:p-6 rounded-2xl bg-plum/60 border border-silver/15 hover:border-candle transition">
          <h2 className="font-serif text-xl text-candle mb-1">{t}</h2><p className="text-silver">{d}</p></Link>
      ))}
    </section>
  </>);
}
