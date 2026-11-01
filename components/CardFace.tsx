import Image from "next/image";
import { hasArt } from "@/lib/art";
import type { Card } from "@/lib/cards";
const SYM: Record<string, string> = { Wands: "🜂", Cups: "🜄", Swords: "🜁", Pentacles: "⛤" };
const ROMAN = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI"];
export function CardFace({ card, reversed, sizes = "(max-width:640px) 45vw, 220px", label = true }: { card: Card; reversed?: boolean; sizes?: string; label?: boolean }) {
  if (hasArt(card.id)) return (
    <div className="relative w-full aspect-[200/340] rounded-[14px] overflow-hidden border border-silver/40 shadow-lg" style={{ transform: reversed ? "rotate(180deg)" : undefined }}>
      <Image src={`/cards/${card.id}.webp`} alt={card.name} fill sizes={sizes} quality={70} className="object-cover" />
      {label && <span className="absolute bottom-0 inset-x-0 text-center text-xs font-serif text-candle bg-night/70 py-1">{card.name}</span>}
    </div>);
  return <SvgFace card={card} reversed={reversed} />;
}
function SvgFace({ card, reversed }: { card: Card; reversed?: boolean }) {
  const hue = { Fire: "#d9773f", Water: "#4a8fd6", Air: "#c9cbd6", Earth: "#6fae6a" }[card.element] ?? "#9b6bd6";
  const top = card.arcana === "major" ? ROMAN[card.number] : card.name.split(" ")[0];
  const glyph = card.arcana === "major" ? "✶" : SYM[card.suit!];
  return (
    <svg viewBox="0 0 200 340" className="w-full h-full" style={{ transform: reversed ? "rotate(180deg)" : undefined }} role="img" aria-label={card.name}>
      <defs><radialGradient id={`g-${card.id}`} cx="50%" cy="40%"><stop offset="0" stopColor={hue} stopOpacity=".55" /><stop offset="1" stopColor="#1a0f2e" /></radialGradient></defs>
      <rect x="2" y="2" width="196" height="336" rx="14" fill={`url(#g-${card.id})`} stroke="#c9cbd6" strokeWidth="2" />
      <rect x="12" y="12" width="176" height="316" rx="10" fill="none" stroke="#f3c26b" strokeOpacity=".6" />
      <text x="100" y="42" textAnchor="middle" fill="#f3c26b" fontSize="20" fontFamily="Georgia">{top}</text>
      <circle cx="100" cy="165" r="58" fill="none" stroke="#c9cbd6" strokeOpacity=".5" />
      <circle cx="100" cy="165" r="44" fill="none" stroke="#f3c26b" strokeOpacity=".35" strokeDasharray="3 5" />
      <text x="100" y="185" textAnchor="middle" fill="#fff" fontSize="54">{glyph}</text>
      <text x="100" y="268" textAnchor="middle" fill="#e9e4f4" fontSize="15" fontFamily="Georgia">{card.name}</text>
      <text x="100" y="292" textAnchor="middle" fill="#c9cbd6" fontSize="10" fontFamily="Georgia">{card.element} · {card.astrology.split(",")[0]}</text>
    </svg>
  );
}
export function CardBack({ sizes = "(max-width:640px) 45vw, 220px" }: { sizes?: string }) {
  return (<div className="relative w-full aspect-[200/340] rounded-[14px] overflow-hidden border border-silver/40"><Image src="/cards/back.webp" alt="" fill sizes={sizes} quality={70} className="object-cover" /></div>);
}
export function SvgCardBack() {
  return (
    <svg viewBox="0 0 200 340" className="w-full h-full" aria-hidden>
      <rect x="2" y="2" width="196" height="336" rx="14" fill="#2a1745" stroke="#c9cbd6" strokeWidth="2" />
      <rect x="14" y="14" width="172" height="312" rx="10" fill="none" stroke="#9b6bd6" />
      <text x="100" y="190" textAnchor="middle" fill="#f3c26b" fontSize="60">🌕</text>
      <text x="100" y="80" textAnchor="middle" fill="#c9cbd6" fontSize="18">🌒 🌓 🌔</text>
      <text x="100" y="280" textAnchor="middle" fill="#c9cbd6" fontSize="18">🌖 🌗 🌘</text>
    </svg>
  );
}
