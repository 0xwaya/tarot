import { notFound } from "next/navigation";
import { SIGNS } from "@/lib/signs";
export const generateStaticParams = () => SIGNS.map((s) => ({ sign: s.slug }));
export async function generateMetadata({ params }: { params: Promise<{ sign: string }> }) {
  const { sign } = await params; const s = SIGNS.find((x) => x.slug === sign); return { title: s ? `${s.name} Horoscope` : "Horoscope" };
}
export default async function Page({ params }: { params: Promise<{ sign: string }> }) {
  const { sign } = await params; const s = SIGNS.find((x) => x.slug === sign); if (!s) notFound();
  return (<article className="max-w-2xl mx-auto">
    <div className="text-6xl text-candle text-center">{s.glyph}</div>
    <h1 className="font-serif text-4xl text-center glow mb-1">{s.name}</h1>
    <p className="text-center text-silver/70 mb-6">{s.dates} · {s.element} · ruled by {s.ruler}</p>
    <p className="mb-4 p-3 rounded-lg border border-candle/50 text-candle text-sm">Placeholder text — real daily/weekly horoscopes will be generated automatically in a later phase.</p>
    <p className="text-silver leading-relaxed">As a {s.element.toLowerCase()} sign guided by {s.ruler}, {s.name} is invited this week to slow down and listen. Light a candle, set one clear intention, and notice which doors open. A small cleansing ritual will help release what no longer serves you.</p>
  </article>);
}
