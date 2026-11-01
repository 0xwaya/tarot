import { SITE } from "@/lib/site";
export const metadata = { title: "Terms & Disclaimer" };
export default function Page() { return (<article className="max-w-2xl mx-auto space-y-4 text-silver">
  <h1 className="font-serif text-4xl text-candle">Terms &amp; Disclaimer</h1>
  <h2 className="font-serif text-xl">Entertainment &amp; spiritual disclaimer</h2>
  <p>Tarot readings, horoscopes, spells, blessings, potions and amulets offered by {SITE.name} are for entertainment, spiritual reflection and personal growth only. They are not a substitute for professional medical, psychological, legal or financial advice, and no specific outcome is guaranteed.</p>
  <p>Potions and oils are not for ingestion unless explicitly labelled. Patch-test topical products and keep away from children and pets. Never leave burning sage or candles unattended.</p>
  <h2 className="font-serif text-xl">Use of the site</h2>
  <p>You must be 18+ to purchase. Product, shipping and refund terms will be published when the shop opens.</p>
  <p className="text-xs">Draft — to be reviewed before going public.</p></article>); }
