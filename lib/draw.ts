import { CARDS, Card } from "./cards";
// Unbiased crypto-secure integer in [0, n) via rejection sampling.
function randInt(n: number) {
  const max = Math.floor(0x100000000 / n) * n; const b = new Uint32Array(1);
  do crypto.getRandomValues(b); while (b[0] >= max);
  return b[0] % n;
}
export type Drawn = { card: Card; reversed: boolean };
export function draw(count: number): Drawn[] {
  const deck = [...CARDS];
  for (let i = deck.length - 1; i > 0; i--) { const j = randInt(i + 1); [deck[i], deck[j]] = [deck[j], deck[i]]; }
  return deck.slice(0, count).map((card) => ({ card, reversed: randInt(2) === 1 }));
}
