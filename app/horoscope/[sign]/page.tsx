import { notFound } from "next/navigation";
import { SIGNS } from "@/lib/signs";
import { ZODIAC, getHoroscope } from "@/lib/horoscope";
import { moonPhase } from "@/lib/moon";
export const revalidate = 3600;
export const generateStaticParams = () => SIGNS.map((s) => ({ sign: s.slug }));
export async function generateMetadata({ params }: { params: Promise<{ sign: string }> }) {
  const { sign } = await params; const s = SIGNS.find((x) => x.slug === sign); return { title: s ? `${s.name} Horoscope Today` : "Horoscope" };
}
export default async function Page({ params }: { params: Promise<{ sign: string }> }) {
  const { sign } = await params; const s = SIGNS.find((x) => x.slug === sign); if (!s) notFound();
  const z = ZODIAC.find((x) => x.sign === s.name)!; const h = await getHoroscope(z); const moon = moonPhase();
  return (<article className="max-w-2xl mx-auto fade-up">
    <div className="text-6xl text-candle text-center">{s.glyph}</div>
    <h1 className="font-serif text-3xl sm:text-4xl text-center glow mb-1">{s.name}</h1>
    <p className="text-center text-silver/70 mb-2">{z.dates} · {z.element} · {z.modality} · ruled by {z.ruler}</p>
    <p className="text-center text-sm text-candle mb-6">{h.date} · {moon.glyph} {moon.name}</p>
    <p className="text-silver leading-relaxed text-base sm:text-lg mb-6">{h.text}</p>
    <div className="grid sm:grid-cols-3 gap-3 text-sm">
      {[["Love", h.love], ["Work", h.work], ["Wellness", h.wellness]].map(([k, v]) => (
        <div key={k} className="p-4 rounded-xl bg-plum/60 border border-silver/15"><p className="text-candle font-serif mb-1">{k}</p><p className="text-silver">{v}</p></div>))}
    </div>
    <p className="mt-6 text-sm text-silver/80">Today&apos;s ally stone: <b className="text-candle">{h.stone}</b> · herb: <b className="text-candle">{h.herb}</b></p>
  </article>);
}
