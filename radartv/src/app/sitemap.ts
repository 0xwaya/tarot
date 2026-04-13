import type { MetadataRoute } from 'next';

import { siteUrl } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/deibisromero', '/elradartv', '/epk'].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));
}
