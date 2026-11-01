import Image from "next/image";
import Link from "next/link";
import { COMPLIANCE_NOTE, getProducts, shopifyEnabled } from "@/lib/products";
export const metadata = { title: "Shop", description: "Handmade charm necklaces, amulets, potions, white sage and cleansing kits." };
export const revalidate = 600;
export default async function Page() {
  const products = await getProducts();
  const live = shopifyEnabled();
  const cats = [...new Set(products.map((p) => p.category))];
  return (<>
    <h1 className="font-serif text-3xl sm:text-4xl text-center glow mb-2">The Apothecary</h1>
    <p className="text-center text-silver mb-2">Charms, amulets and potions crafted with intention.</p>
    {!live && <p className="text-center text-xs text-candle mb-10">Preview — placeholder listings; checkout coming soon.</p>}
    {cats.map((c) => (<section key={c} className="mb-10">
      <h2 className="font-serif text-2xl text-candle mb-4">{c}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {products.filter((p) => p.category === c).map((p) => (
          <div key={p.id} className="rounded-2xl bg-plum/60 border border-silver/15 overflow-hidden">
            <Link href={`/shop/${p.id}`} className="block group"><div className="relative aspect-square overflow-hidden"><Image src={p.image} alt={p.name} fill sizes="(max-width:1024px) 48vw, 280px" quality={70} className="object-cover transition group-hover:scale-105" /></div></Link>
            <div className="p-3 sm:p-4"><Link href={`/shop/${p.id}`} className="inline-flex items-center min-h-11 font-serif leading-tight hover:text-candle">{p.name}</Link>{(p.herbs?.length || p.notes?.length) ? <span className="ml-2 text-xs px-2 py-0.5 rounded-full border border-candle/50 text-candle align-middle">safety notes</span> : null}<p className="text-xs text-silver/80 my-1">{p.blurb}</p>
              <div className="flex flex-wrap gap-2 justify-between items-center mt-2"><span className="text-candle">${p.price}</span>
                {live && p.checkoutUrl
                  ? <a href={p.checkoutUrl} className="inline-flex items-center min-h-11 text-sm px-4 rounded-full bg-candle text-night font-semibold">Buy</a>
                  : <button disabled className="min-h-11 text-xs px-3 rounded-full border border-silver/30 opacity-60">Coming soon</button>}</div></div>
          </div>))}
      </div>
    </section>))}
    <p className="text-xs text-silver/60 text-center max-w-2xl mx-auto mt-6">{COMPLIANCE_NOTE} Stone treatments are disclosed on each product page.</p>
  </>);
}
