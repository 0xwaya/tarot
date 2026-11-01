// Product provider: Shopify Storefront API when SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_TOKEN are set,
// otherwise local placeholder listings. Checkout stays "Coming soon" without Shopify.
import corr from "./data/correspondences.json";

export type Product = {
  id: string; name: string; category: string; price: number; blurb: string; image: string; checkoutUrl?: string;
  /** Materials and any stone treatment / imitation disclosure. */
  materials?: string[];
  /** Keys into correspondences.json herbSafety. */
  herbs?: (keyof typeof corr.herbSafety)[];
  /** Keys into correspondences.json crystalFacts. */
  stones?: (keyof typeof corr.crystalFacts)[];
  /** Extra product-specific safety notes. */
  notes?: string[];
};

export const herbSafety = (p: Product) => (p.herbs ?? []).map((k) => corr.herbSafety[k]);
export const crystalFacts = (p: Product) => (p.stones ?? []).map((k) => corr.crystalFacts[k]);
export const COMPLIANCE_NOTE = "Our pieces are spiritual and traditional tools, offered for ritual, reflection and entertainment. They are not medical products and do not cure, treat or prevent any condition, and no outcome is guaranteed.";

export const LOCAL_PRODUCTS: Product[] = [
 { id:"amethyst-charm-necklace", name:"Amethyst Charm Necklace", category:"Charm Necklaces", price:48, image:"/products/amethyst-charm-necklace.webp",
   blurb:"Raw amethyst point with a silver moon charm, traditionally worn for calm and intuition.",
   materials:["Natural, untreated raw amethyst point","Sterling-silver-plated moon charm and chain"] },
 { id:"rose-quartz-charm-necklace", name:"Rose Quartz Charm Necklace", category:"Charm Necklaces", price:44, image:"/products/rose-quartz-charm-necklace.webp",
   blurb:"Rose quartz heart, a traditional stone of self-love and tenderness.",
   materials:["Natural rose quartz, polished (not dyed)","Silver-tone chain"] },
 { id:"key-charm-necklace", name:"Skeleton Key Charm Necklace", category:"Charm Necklaces", price:42, image:"/products/key-charm-necklace.webp",
   blurb:"Antique-silver key, a folk symbol of opening new doors.",
   materials:["Antique-finish zinc alloy key (nickel-free)","Silver-tone chain"] },
 { id:"shell-charm-necklace", name:"Sea Shell Charm Necklace", category:"Charm Necklaces", price:38, image:"/products/shell-charm-necklace.webp",
   blurb:"Ocean shell charm honoring the tides and water element.",
   materials:["Naturally shed sea shell (beach-collected, no live harvest)","Freshwater pearl accent","Silver-tone chain"] },
 { id:"protection-amulet", name:"Witch's Protection Amulet", category:"Amulets", price:55, image:"/products/protection-amulet.webp",
   blurb:"Five-pointed pentacle set with black tourmaline, a traditional protection symbol.",
   materials:["Natural black tourmaline cabochon (untreated)","Pewter pentacle setting","Braided cord"] },
 { id:"evil-eye-amulet", name:"Evil Eye Amulet", category:"Amulets", price:32, image:"/products/evil-eye-amulet.webp",
   blurb:"Classic nazar, carried in Mediterranean folk tradition as a symbol against envy.",
   materials:["Glass nazar bead (handmade glass, not a gemstone)","Silver-tone chain"] },
 { id:"cleansing-potion", name:"Moonwater Cleansing Potion", category:"Potions", price:24, image:"/products/cleansing-potion.webp",
   blurb:"Room and altar mist of rosemary, garden sage and moon water, made for clearing rituals.",
   materials:["Moon water, rosemary and garden sage hydrosol, grain alcohol preservative"], herbs:["sage"],
   notes:["For room, altar and fabric use only. Do not drink or spray on skin.","Keep away from children and pets."] },
 { id:"blessing-oil", name:"Abundance Blessing Oil", category:"Potions", price:28, image:"/products/blessing-oil.webp",
   blurb:"Cinnamon and basil anointing oil with citrine chips, made for candle and abundance rituals.",
   materials:["Fractionated coconut oil, cinnamon bark and basil","Citrine chips: heat-treated amethyst, as most citrine on the market is"], stones:["citrine"],
   notes:["For anointing candles and tools. Not for internal use.","Cinnamon oil can irritate skin; do a patch test and dilute before any skin contact."] },
 { id:"white-sage-bundle", name:"White Sage Smudge Bundle", category:"Sage & Cleansing", price:16, image:"/products/white-sage-bundle.webp",
   blurb:"Hand-tied cultivated white sage for smudging rituals. Ethically sourced: farm-grown, never wild-harvested, out of respect for the Indigenous traditions it comes from.",
   materials:["Cultivated Salvia apiana, grown on a licensed farm","Cotton thread"], herbs:["sage","smoke"] },
 { id:"cleansing-kit", name:"Home Cleansing Kit", category:"Sage & Cleansing", price:39, image:"/products/cleansing-kit.webp",
   blurb:"Cultivated white sage, sea salt, a selenite wand and a guided ritual card.",
   materials:["Cultivated white sage bundle","Sea salt","Natural selenite (gypsum) wand","Printed ritual card"], herbs:["sage","smoke"], stones:["selenite"] },
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
