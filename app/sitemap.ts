import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/siteUrl';
import { GUIDE_SLUGS } from '@/lib/guidesMeta';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/game`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/game?practice=true`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/how-to-play`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/archive`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.4 },
    { url: `${base}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];

  const guidePages: MetadataRoute.Sitemap = GUIDE_SLUGS.map((slug) => ({
    url: `${base}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...guidePages];
}
