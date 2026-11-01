import type { Drawn } from "./draw";
import { LOCAL_PRODUCTS, type Product } from "./products";
const first = (s: string) => s.split(/(?<=\.)\s/)[0];
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
// Weave the drawn cards into one reading: per-position lines, then an overall theme from element balance and majors.
export function narrative(cards: Drawn[], positions: readonly string[]) {
  const lines = cards.map((d, i) => `In the ${positions[i].toLowerCase()} position, ${d.card.name}${d.reversed ? " reversed" : ""} speaks of ${d.card.keywords.slice(0, 2).join(" and ")}: ${lower(first(d.reversed ? d.card.reversed : d.card.upright))}`);
  const el: Record<string, number> = {}; cards.forEach((d) => (el[d.card.element] = (el[d.card.element] ?? 0) + 1));
  const top = Object.entries(el).sort((a, b) => b[1] - a[1])[0]?.[0];
  const theme = { Fire: "action and courage", Water: "feeling and intuition", Air: "clarity of mind and honest words", Earth: "the body, home and practical steps" }[top ?? ""] ?? "balance";
  const majors = cards.filter((d) => d.card.arcana === "major").length;
  const rev = cards.filter((d) => d.reversed).length;
  let summary = `Taken together, the spread leans toward ${theme}.`;
  if (majors >= Math.ceil(cards.length / 2)) summary += " Several Major Arcana suggest a significant turning point rather than a passing mood.";
  if (rev > cards.length / 2) summary += " Many reversals point to energy turned inward: slow down, cleanse and reflect before acting.";
  else summary += " Trust the momentum and take one concrete step this week.";
  return { lines, summary };
}
const KEYMAP: [RegExp, string[]][] = [
  [/protect|shadow|upheaval|conflict|challenge|attachment|fear|illusion/, ["protection-amulet", "evil-eye-amulet"]],
  [/love|union|harmony|nurture|compassion|emotion/, ["rose-quartz-charm-necklace", "blessing-oil"]],
  [/intuition|mystery|dream|unconscious|reflection|inner/, ["amethyst-charm-necklace", "cleansing-potion"]],
  [/beginning|seed|door|choice|opportunity|potential|journey/, ["key-charm-necklace", "blessing-oil"]],
  [/ending|release|transformation|cleans|renewal|rest/, ["white-sage-bundle", "cleansing-kit"]],
  [/abundance|money|success|prosper|stability/, ["blessing-oil", "key-charm-necklace"]],
];
export function relatedProducts(cards: Drawn[], n = 3): Product[] {
  const score: Record<string, number> = {};
  for (const d of cards) { const text = `${d.card.keywords.join(" ")} ${d.card.name}`.toLowerCase();
    for (const [re, ids] of KEYMAP) if (re.test(text)) ids.forEach((id, i) => (score[id] = (score[id] ?? 0) + 2 - i));
    if (d.reversed) score["cleansing-kit"] = (score["cleansing-kit"] ?? 0) + 1;
    if (d.card.element === "Water") score["shell-charm-necklace"] = (score["shell-charm-necklace"] ?? 0) + 1; }
  const ids = Object.entries(score).sort((a, b) => b[1] - a[1]).map(([id]) => id);
  for (const p of ["white-sage-bundle", "amethyst-charm-necklace", "protection-amulet"]) if (!ids.includes(p)) ids.push(p);
  return ids.slice(0, n).map((id) => LOCAL_PRODUCTS.find((p) => p.id === id)!).filter(Boolean);
}
