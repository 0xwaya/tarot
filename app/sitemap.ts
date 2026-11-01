import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SIGNS } from "@/lib/signs";
import { LOCAL_PRODUCTS } from "@/lib/products";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/reading", "/horoscope", "/shop", "/about", ...LOCAL_PRODUCTS.map((p) => `/shop/${p.id}`), "/privacy", "/terms", ...SIGNS.map((s) => `/horoscope/${s.slug}`)].map((p) => ({ url: SITE.url + p, lastModified: new Date() }));
}
