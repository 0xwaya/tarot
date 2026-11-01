import zodiac from "./data/zodiac.json";
import { moonPhase } from "./moon";
import { dailyCard } from "./daily";
import { dayKey, rng, pick } from "./seed";
export type Zodiac = { sign: string; dates: string; element: string; modality: string; ruler: string; traits: string[];
  love: string; work: string; wellness: string; stones: string[]; herbs: string[] };
export const ZODIAC = zodiac as Zodiac[];
export type Horoscope = { sign: string; date: string; text: string; love: string; work: string; wellness: string; stone: string; herb: string; source: "ai" | "rotation" };

const OPEN = ["Today", "Under this sky", "As the day unfolds", "This cycle"];
const MOON: Record<string, string> = {
  "New Moon": "a new moon asks you to plant one quiet intention", "Waxing Crescent": "the waxing crescent rewards small first steps",
  "First Quarter": "the first-quarter moon tests your resolve; act despite doubt", "Waxing Gibbous": "the waxing gibbous moon favours refining and patience",
  "Full Moon": "the full moon illuminates what is ready to be released or celebrated", "Waning Gibbous": "the waning gibbous moon invites gratitude and sharing",
  "Last Quarter": "the last-quarter moon helps you clear out what no longer fits", "Waning Crescent": "the waning crescent calls for rest, dreams and quiet cleansing",
};

export function rotationHoroscope(z: Zodiac, d = new Date()): Horoscope {
  const r = rng(`${z.sign}:${dayKey(d)}`); const moon = moonPhase(d); const dc = dailyCard(d);
  const t1 = pick(z.traits, r), t2 = pick(z.traits.filter((t) => t !== t1), r);
  const text = `${pick(OPEN, r)}, ${MOON[moon.name]}. As a ${z.modality.toLowerCase()} ${z.element.toLowerCase()} sign ruled by ${z.ruler}, your ${t1} nature is your ally, while your ${t2} side asks for awareness. The collective card of the day, ${dc.card.name}${dc.reversed ? " reversed" : ""}, adds a note of ${dc.card.keywords.slice(0, 2).join(" and ")}.`;
  return { sign: z.sign, date: dayKey(d), text, love: z.love, work: z.work, wellness: z.wellness, stone: pick(z.stones, r), herb: pick(z.herbs, r), source: "rotation" };
}

// Uses the Vercel AI Gateway when AI_GATEWAY_API_KEY is set (cached for a day); otherwise rotates research-based text.
export async function getHoroscope(z: Zodiac, d = new Date()): Promise<Horoscope> {
  const base = rotationHoroscope(z, d);
  const key = process.env.AI_GATEWAY_API_KEY;
  if (!key) return base;
  try {
    const res = await fetch("https://ai-gateway.vercel.sh/v1/chat/completions", {
      method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env.AI_MODEL ?? "openai/gpt-4o-mini", max_tokens: 220, messages: [
        { role: "system", content: "You write warm, grounded daily horoscopes (90-120 words) for a white-witch tarot site. No medical, legal or financial advice. No predictions of harm." },
        { role: "user", content: `Sign: ${z.sign} (${z.element}, ${z.modality}, ruled by ${z.ruler}). Date: ${base.date}. Moon: ${moonPhase(d).name}. Card of the day: ${dailyCard(d).card.name}. Traits: ${z.traits.join(", ")}. Write today's horoscope.` },
      ] }),
      next: { revalidate: 86400, tags: ["horoscopes"] },
    });
    if (!res.ok) return base;
    const j = await res.json(); const text = j.choices?.[0]?.message?.content?.trim();
    return text ? { ...base, text, source: "ai" } : base;
  } catch { return base; }
}
