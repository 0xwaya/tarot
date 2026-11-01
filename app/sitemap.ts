import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SIGNS } from "@/lib/signs";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/reading", "/horoscope", "/shop", "/privacy", "/terms", ...SIGNS.map((s) => `/horoscope/${s.slug}`)].map((p) => ({ url: SITE.url + p, lastModified: new Date() }));
}
