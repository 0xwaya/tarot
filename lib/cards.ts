import raw from "./data/cards.json";
export type Suit = "Wands" | "Cups" | "Swords" | "Pentacles";
export type Card = { id: string; name: string; arcana: "major" | "minor"; suit?: Suit; number: number;
  element: string; astrology: string; keywords: string[]; upright: string; reversed: string;
  inLove?: string; atWork?: string; spirit?: string };
type Raw = { name: string; arcana: string; suit: string | null; number: number; element: string; astrology: string;
  keywords: string[]; upright: string; reversed: string; inLove?: string; atWork?: string; spirit?: string };
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const cap = (s: string) => (s[0].toUpperCase() + s.slice(1)) as Suit;
// Card text is research-based (see lib/data/sources.md); ids are name slugs so they match public/cards art.
export const CARDS: Card[] = (raw as Raw[]).map((c) => ({
  id: slug(c.name), name: c.name, arcana: c.arcana as Card["arcana"], suit: c.suit ? cap(c.suit) : undefined, number: c.number,
  element: c.element, astrology: c.astrology, keywords: c.keywords, upright: c.upright, reversed: c.reversed,
  inLove: c.inLove, atWork: c.atWork, spirit: c.spirit,
}));
