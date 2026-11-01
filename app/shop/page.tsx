import { PRODUCTS } from "@/lib/products";
export const metadata = { title: "Shop", description: "Handmade charm necklaces, amulets, potions, palo santo and cleansing kits." };
export default function Page() {
  const cats = [...new Set(PRODUCTS.map((p) => p.category))];
  return (<>
    <h1 className="font-serif text-4xl text-center glow mb-2">The Apothecary</h1>
    <p className="text-center text-silver mb-2">Charms, amulets and potions crafted with intention.</p>
    <p className="text-center text-xs text-candle mb-10">Preview — placeholder listings; checkout coming soon.</p>
    {cats.map((c) => (<section key={c} className="mb-10">
      <h2 className="font-serif text-2xl text-candle mb-4">{c}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PRODUCTS.filter((p) => p.category === c).map((p) => (
          <div key={p.id} className="rounded-2xl bg-plum/60 border border-silver/15 overflow-hidden">
            <div className="aspect-square flex items-center justify-center text-6xl" style={{ background: `radial-gradient(circle, ${p.hue}88, #1a0f2e)` }}>{p.glyph}</div>
            <div className="p-4"><h3 className="font-serif">{p.name}</h3><p className="text-xs text-silver/80 my-1">{p.blurb}</p>
              <div className="flex justify-between items-center mt-2"><span className="text-candle">${p.price}</span>
                <button disabled className="text-xs px-3 py-1 rounded-full border border-silver/30 opacity-60">Coming soon</button></div></div>
          </div>))}
      </div>
    </section>))}
  </>);
}
