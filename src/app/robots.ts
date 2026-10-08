import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/payload'

// Lives at the app root: Next.js ignores robots.ts inside a route group like (frontend).
export const revalidate = 3600

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/media/file/'],
        // Search result URLs (?q=) are endless duplicates; paging (?page=) stays crawlable.
        disallow: ['/admin', '/api/', '/*?*q='],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
