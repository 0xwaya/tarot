import { CARDS } from "./cards";
import { dayKey, rng } from "./seed";
export function dailyCard(d = new Date()) {
  const r = rng(`daily:${dayKey(d)}`);
  return { card: CARDS[Math.floor(r() * CARDS.length)], reversed: r() < 0.25 };
}
