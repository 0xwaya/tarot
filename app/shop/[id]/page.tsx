import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPLIANCE_NOTE, crystalFacts, getProducts, herbSafety, LOCAL_PRODUCTS, shopifyEnabled } from "@/lib/products";

export const revalidate = 600;
export const generateStaticParams = () => LOCAL_PRODUCTS.map((p) => ({ id: p.id }));
type P = { params: Promise<{ id: string }> };
export async function generateMetadata({ params }: P) {
  const { id } = await params;
  const p = (await getProducts()).find((x) => x.id === id);
  return p ? { title: p.name, description: p.blurb } : {};
}

const List = ({ t, items, tone }: { t: string; items: string[]; tone?: string }) => items.length ? (
  <section className={`rounded-xl border p-4 ${tone ?? "border-silver/15 bg-plum/40"}`}>
    <h2 className="font-serif text-lg text-candle mb-2">{t}</h2>
    <ul className="list-disc pl-5 space-y-1 text-sm text-silver/90">{items.map((i) => <li key={i}>{i}</li>)}</ul>
  </section>) : null;

export default async function Page({ params }: P) {
  const { id } = await params;
  const p = (await getProducts()).find((x) => x.id === id);
  if (!p) notFound();
  const live = shopifyEnabled();
  const safety = [...herbSafety(p), ...(p.notes ?? [])];
  return (<div className="max-w-5xl mx-auto">
    <Link href="/shop" className="text-sm text-silver/70 hover:text-candle">← The Apothecary</Link>
    <div className="grid md:grid-cols-2 gap-8 mt-4 fade-up">
      <div className="relative aspect-square rounded-2xl overflow-hidden border border-silver/15"><Image src={p.image} alt={p.name} fill sizes="(max-width:768px) 100vw, 500px" className="object-cover" priority /></div>
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-widest text-silver/60">{p.category}</p>
        <h1 className="font-serif text-3xl glow">{p.name}</h1>
        <p className="text-2xl text-candle">${p.price}</p>
        <p className="text-silver">{p.blurb}</p>
        {live && p.checkoutUrl
          ? <a href={p.checkoutUrl} className="inline-block px-6 py-2 rounded-full bg-candle text-night font-semibold">Buy</a>
          : <button disabled className="px-6 py-2 rounded-full border border-silver/30 opacity-60">Coming soon</button>}
        <List t="Materials & treatments" items={p.materials ?? []} />
        <List t="Crystal facts" items={crystalFacts(p)} />
        <List t="Herb & safety notes" items={safety} tone="border-candle/40 bg-candle/5" />
        <p className="text-xs text-silver/60">{COMPLIANCE_NOTE} Safety notes summarize NIH NCCIH guidance and are not medical advice.</p>
      </div>
    </div>
  </div>);
}
