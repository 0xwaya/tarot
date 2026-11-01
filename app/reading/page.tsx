import Reader from "@/components/Reader";
import { SPREADS, SpreadKey } from "@/lib/spreads";
export const metadata = { title: "Tarot Readings", description: "Free daily card, 3-card, Celtic Cross and protection tarot spreads with reversals." };
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const sp = await searchParams; const s = (sp.spread in SPREADS ? sp.spread : "three") as SpreadKey;
  return (<>
    <h1 className="font-serif text-3xl sm:text-4xl text-center glow mb-2">Tarot Readings</h1>
    <p className="text-center text-silver mb-8">Breathe, hold your question in mind, then draw. Every shuffle uses cryptographically secure randomness.</p>
    <Reader key={s} initial={s} auto={sp.auto === "1"} />
  </>);
}
