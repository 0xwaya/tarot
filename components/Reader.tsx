"use client";
import { useEffect, useState } from "react";
import { draw, Drawn } from "@/lib/draw";
import { SPREADS, SpreadKey } from "@/lib/spreads";
import { CardFace, CardBack } from "./CardFace";
import Image from "next/image";
import Link from "next/link";
import { narrative, relatedProducts } from "@/lib/narrative";

export default function Reader({ initial, auto }: { initial: SpreadKey; auto: boolean }) {
  const [spread, setSpread] = useState<SpreadKey>(initial);
  const [cards, setCards] = useState<Drawn[]>([]);
  const [shown, setShown] = useState(0);
  const doDraw = (k = spread) => { setCards(draw(SPREADS[k].positions.length)); setShown(0); };
  useEffect(() => { if (auto) doDraw(initial); }, []); // eslint-disable-line
  useEffect(() => { if (shown < cards.length) { const t = setTimeout(() => setShown((s) => s + 1), 450); return () => clearTimeout(t); } }, [shown, cards]);
  const pos = SPREADS[spread].positions;
  const done = cards.length > 0 && shown >= cards.length;
  const story = done ? narrative(cards, pos) : null;
  const recs = done ? relatedProducts(cards) : [];
  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {(Object.keys(SPREADS) as SpreadKey[]).map((k) => (
          <button key={k} onClick={() => { setSpread(k); setCards([]); }}
            aria-pressed={k === spread} className={`min-h-11 px-4 rounded-full border text-sm ${k === spread ? "bg-amethyst text-night border-amethyst" : "border-silver/40 hover:border-candle"}`}>{SPREADS[k].name}</button>
        ))}
      </div>
      <div className="text-center mb-8">
        <button onClick={() => doDraw()} className="min-h-12 px-6 rounded-full bg-candle text-night font-semibold shadow-[0_0_24px_rgba(243,194,107,.5)]">
          {cards.length ? "Shuffle & draw again" : "Shuffle & draw"}</button>
      </div>
      {cards.length > 0 && spread === "celtic" && (<>
        <CelticLayout cards={cards} shown={shown} pos={pos} />
        <ol className="mt-8 max-w-2xl mx-auto space-y-4">
          {cards.map((d, i) => i < shown && (
            <li key={d.card.id} id={`pos-${i}`} className="fade-up rounded-xl border border-silver/15 bg-plum/40 p-4">
              <p className="text-xs uppercase tracking-widest text-candle mb-1">{i + 1}. {pos[i]}</p>
              <Detail d={d} />
            </li>))}
        </ol>
      </>)}
      {cards.length > 0 && spread !== "celtic" && (
        <div className={`grid gap-x-4 gap-y-8 sm:gap-6 justify-items-center ${cards.length === 1 ? "grid-cols-1" : cards.length === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"}`}>
          {cards.map((d, i) => (
            <div key={d.card.id} className={`w-full min-w-0 ${cards.length === 1 ? "max-w-[240px]" : "max-w-[200px]"} ${cards.length === 3 && i === 2 ? "col-span-2 sm:col-span-1 max-w-[calc(50%-0.5rem)] sm:max-w-[200px]" : ""}`}>
              <p className="text-xs uppercase tracking-widest text-candle text-center mb-2 min-h-8">{i + 1}. {pos[i]}</p>
              <Flip d={d} on={i < shown} sizes={cards.length === 1 ? "240px" : "(max-width:640px) 45vw, 200px"} />
              {i < shown && <div className="mt-3 text-sm fade-up"><Detail d={d} /></div>}
            </div>
          ))}
        </div>
      )}
      {story && (
        <section className="fade-up mt-12 max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl text-candle mb-3 text-center">Your reading</h2>
          <div className="space-y-2 text-silver leading-relaxed">{story.lines.map((l, i) => <p key={i}>{l}</p>)}</div>
          <p className="mt-4 p-4 rounded-xl border border-candle/40 bg-plum/50 text-silver">{story.summary}</p>
          <h3 className="font-serif text-xl text-candle mt-10 mb-4 text-center">Allies for this reading</h3>
          <div className="grid grid-cols-3 gap-3">
            {recs.map((p) => (
              <Link key={p.id} href="/shop" className="rounded-xl overflow-hidden bg-plum/60 border border-silver/15 hover:border-candle transition">
                <div className="relative aspect-square"><Image src={p.image} alt={p.name} fill sizes="200px" className="object-cover" /></div>
                <p className="p-2 text-xs sm:text-sm font-serif">{p.name} <span className="text-candle">${p.price}</span></p>
              </Link>))}
          </div>
        </section>
      )}
    </div>
  );
}

function Flip({ d, on, sizes }: { d: Drawn; on: boolean; sizes: string }) {
  return (<div className={`flip ${on ? "on" : ""}`}>
    <div className="flip-inner aspect-[200/340]">
      <div className="face"><CardBack sizes={sizes} /></div>
      <div className="face front"><CardFace card={d.card} reversed={d.reversed} sizes={sizes} label={sizes !== CELTIC} /></div>
    </div>
  </div>);
}
function Detail({ d }: { d: Drawn }) {
  return (<>
    <p className="font-serif text-base">{d.card.name}{d.reversed && <span className="text-candle"> (reversed)</span>}</p>
    <p className="text-silver/70 text-xs mb-1">{d.card.keywords.join(" · ")}</p>
    <p className="text-silver text-sm leading-relaxed">{d.reversed ? d.card.reversed : d.card.upright}</p>
  </>);
}
const CELTIC = "(max-width:640px) 22vw, 120px";
// Traditional Celtic Cross: cross (1 present, 2 challenge across it, 3 below, 4 left, 5 above, 6 right) + staff (7 bottom → 10 top).
const CROSS: Record<number, string> = { 4: "col-start-2 row-start-1", 3: "col-start-1 row-start-2", 0: "col-start-2 row-start-2", 5: "col-start-3 row-start-2", 2: "col-start-2 row-start-3" };
function CelticLayout({ cards, shown, pos }: { cards: Drawn[]; shown: number; pos: readonly string[] }) {
  const cell = (i: number, extra = "") => (
    <a key={i} href={`#pos-${i}`} aria-label={`${i + 1}. ${pos[i]}${i < shown ? `: ${cards[i].card.name}` : ""}`} className={`relative block w-full ${extra}`}>
      <Flip d={cards[i]} on={i < shown} sizes={CELTIC} />
      <span className="absolute -top-2 -left-1 z-10 w-6 h-6 rounded-full bg-night border border-candle text-candle text-xs grid place-items-center">{i + 1}</span>
    </a>);
  return (
    <div className="mx-auto w-full max-w-[560px] flex items-center gap-2 sm:gap-4" aria-label="Celtic Cross layout">
      <div className="grid grid-cols-3 grid-rows-3 gap-2 sm:gap-4 flex-[3] min-w-0">
        {[4, 3, 0, 5, 2].map((i) => <div key={i} className={`relative ${CROSS[i]}`}>{cell(i)}{i === 0 && <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none"><div className="w-[68%] rotate-90 pointer-events-auto">{cell(1)}</div></div>}</div>)}
      </div>
      <div className="flex flex-col-reverse gap-2 sm:gap-4 flex-1 min-w-0">{[6, 7, 8, 9].map((i) => cell(i))}</div>
    </div>);
}
