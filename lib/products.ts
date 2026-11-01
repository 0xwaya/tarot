// Product provider: Shopify Storefront API when SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_TOKEN are set,
// otherwise local placeholder listings. Checkout stays "Coming soon" without Shopify.
export type Product = { id: string; name: string; category: string; price: number; blurb: string; image: string; checkoutUrl?: string };

export const LOCAL_PRODUCTS: Product[] = [
 { id:"amethyst-charm-necklace", name:"Amethyst Charm Necklace", category:"Charm Necklaces", price:48, blurb:"Raw amethyst point with silver moon charm for calm and intuition.", image:"/products/amethyst-charm-necklace.webp" },
 { id:"rose-quartz-charm-necklace", name:"Rose Quartz Charm Necklace", category:"Charm Necklaces", price:44, blurb:"Rose quartz heart for self-love and gentle healing.", image:"/products/rose-quartz-charm-necklace.webp" },
 { id:"key-charm-necklace", name:"Skeleton Key Charm Necklace", category:"Charm Necklaces", price:42, blurb:"Antique-silver key to open new doors.", image:"/products/key-charm-necklace.webp" },
 { id:"shell-charm-necklace", name:"Sea Shell Charm Necklace", category:"Charm Necklaces", price:38, blurb:"Ocean shell for cleansing tides and water energy.", image:"/products/shell-charm-necklace.webp" },
 { id:"protection-amulet", name:"Witch's Protection Amulet", category:"Amulets", price:55, blurb:"Black tourmaline amulet, blessed under the full moon.", image:"/products/protection-amulet.webp" },
 { id:"evil-eye-amulet", name:"Evil Eye Amulet", category:"Amulets", price:32, blurb:"Classic nazar to turn away envy and ill wishes.", image:"/products/evil-eye-amulet.webp" },
 { id:"cleansing-potion", name:"Moonwater Cleansing Potion", category:"Potions", price:24, blurb:"Rosemary, sage and moon water mist to clear stale energy.", image:"/products/cleansing-potion.webp" },
 { id:"blessing-oil", name:"Abundance Blessing Oil", category:"Potions", price:28, blurb:"Cinnamon, basil and citrine-infused anointing oil.", image:"/products/blessing-oil.webp" },
 { id:"white-sage-bundle", name:"White Sage Smudge Bundle", category:"Sage & Cleansing", price:16, blurb:"Hand-tied cultivated white sage for clearing and blessing. Ethically sourced: farm-grown, never wild-harvested.", image:"/products/white-sage-bundle.webp" },
 { id:"cleansing-kit", name:"Home Cleansing Kit", category:"Sage & Cleansing", price:39, blurb:"Cultivated white sage, salt, selenite and a guided ritual card.", image:"/products/cleansing-kit.webp" },
];

export const shopifyEnabled = () => !!(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_TOKEN);

type SfNode = { handle: string; title: string; description: string; productType: string; onlineStoreUrl: string | null;
  featuredImage: { url: string } | null; priceRange: { minVariantPrice: { amount: string } } };

async function shopifyProducts(): Promise<Product[]> {
  const res = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN! },
    body: JSON.stringify({ query: `{ products(first: 50) { nodes { handle title description productType onlineStoreUrl featuredImage { url } priceRange { minVariantPrice { amount } } } } }` }),
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`Shopify ${res.status}`);
  const json = await res.json();
  return (json.data.products.nodes as SfNode[]).map((n) => ({
    id: n.handle, name: n.title, category: n.productType || "Shop", blurb: n.description,
    price: Number(n.priceRange.minVariantPrice.amount), image: n.featuredImage?.url ?? "/img/hero.webp", checkoutUrl: n.onlineStoreUrl ?? undefined,
  }));
}

export async function getProducts(): Promise<Product[]> {
  if (!shopifyEnabled()) return LOCAL_PRODUCTS;
  try { return await shopifyProducts(); } catch (e) { console.error("Shopify fetch failed, using local products", e); return LOCAL_PRODUCTS; }
}
