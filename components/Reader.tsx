"use client";
import { useEffect, useState } from "react";
import { draw, Drawn } from "@/lib/draw";
import { SPREADS, SpreadKey } from "@/lib/spreads";
import { CardFace, CardBack } from "./CardFace";

export default function Reader({ initial, auto }: { initial: SpreadKey; auto: boolean }) {
  const [spread, setSpread] = useState<SpreadKey>(initial);
  const [cards, setCards] = useState<Drawn[]>([]);
  const [shown, setShown] = useState(0);
  const doDraw = (k = spread) => { setCards(draw(SPREADS[k].positions.length)); setShown(0); };
  useEffect(() => { if (auto) doDraw(initial); }, []); // eslint-disable-line
  useEffect(() => { if (shown < cards.length) { const t = setTimeout(() => setShown((s) => s + 1), 450); return () => clearTimeout(t); } }, [shown, cards]);
  const pos = SPREADS[spread].positions;
  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {(Object.keys(SPREADS) as SpreadKey[]).map((k) => (
          <button key={k} onClick={() => { setSpread(k); setCards([]); }}
            className={`px-4 py-2 rounded-full border text-sm ${k === spread ? "bg-amethyst text-night border-amethyst" : "border-silver/40 hover:border-candle"}`}>{SPREADS[k].name}</button>
        ))}
      </div>
      <div className="text-center mb-8">
        <button onClick={() => doDraw()} className="px-6 py-3 rounded-full bg-candle text-night font-semibold shadow-[0_0_24px_rgba(243,194,107,.5)]">
          {cards.length ? "Shuffle & draw again" : "Shuffle & draw"}</button>
      </div>
      {cards.length > 0 && (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center">
          {cards.map((d, i) => (
            <div key={d.card.id} className="w-full max-w-[200px]">
              <p className="text-xs uppercase tracking-widest text-candle text-center mb-2">{i + 1}. {pos[i]}</p>
              <div className={`flip ${i < shown ? "on" : ""}`}>
                <div className="flip-inner aspect-[200/340]">
                  <div className="face"><CardBack /></div>
                  <div className="face front"><CardFace card={d.card} reversed={d.reversed} /></div>
                </div>
              </div>
              {i < shown && (
                <div className="mt-3 text-sm">
                  <p className="font-serif text-base">{d.card.name}{d.reversed && <span className="text-candle"> (reversed)</span>}</p>
                  <p className="text-silver/70 text-xs mb-1">{d.card.keywords.join(" · ")}</p>
                  <p className="text-silver">{d.reversed ? d.card.reversed : d.card.upright}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
