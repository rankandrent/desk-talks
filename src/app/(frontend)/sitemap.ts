import type { MetadataRoute } from 'next'

import { getPayloadClient, SITE_URL } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()
  const now = new Date().toISOString()

  const [podcasts, posts, pages] = await Promise.all([
    payload.find({
      collection: 'podcasts',
      where: { and: [{ _status: { equals: 'published' } }, { releaseDate: { less_than_equal: now } }] },
      limit: 1000,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      limit: 1000,
      depth: 0,
      select: { slug: true, contentUpdatedAt: true, updatedAt: true },
    }),
    payload.find({ collection: 'pages', limit: 100, depth: 0, select: { slug: true, updatedAt: true } }),
  ])

  return [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/podcasts`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blogs`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/join-as-guest`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/join-as-host`, changeFrequency: 'monthly', priority: 0.6 },
    ...podcasts.docs.map((doc) => ({ url: `${SITE_URL}/podcasts/${doc.slug}`, lastModified: doc.updatedAt })),
    ...posts.docs.map((doc) => ({
      url: `${SITE_URL}/blogs/${doc.slug}`,
      lastModified: doc.contentUpdatedAt ?? doc.updatedAt,
    })),
    ...pages.docs.map((doc) => ({ url: `${SITE_URL}/${doc.slug}`, lastModified: doc.updatedAt })),
  ]
}
