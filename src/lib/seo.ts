import type { Metadata } from 'next'

import { SITE_URL } from './payload'

export const SITE_NAME = 'DeskTalks'
export const DEFAULT_OG_IMAGE = { url: '/og-image.jpg', width: 1200, height: 630, alt: 'DeskTalks podcast' }

// Page-level `alternates` replace the layout's, so the RSS link is repeated here.
const RSS_ALTERNATE = { 'application/rss+xml': [{ url: '/feed.xml', title: 'DeskTalks Blogs' }] }

const TITLE_MAX = 60
const DESCRIPTION_MAX = 155

/** "Title | DeskTalks" when it fits in Google's ~60 characters, otherwise the title alone. */
export const pageTitle = (title: string) => {
  const branded = `${title} | ${SITE_NAME}`
  return { absolute: branded.length <= TITLE_MAX ? branded : title }
}

/** Trim to ~155 characters on a word boundary so Google does not cut it mid-word. */
export const metaDescription = (text?: string | null) => {
  const clean = (text ?? '').replace(/\s+/g, ' ').trim()
  if (clean.length <= DESCRIPTION_MAX) return clean || undefined
  const cut = clean.slice(0, DESCRIPTION_MAX - 1)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

export const absoluteUrl = (path = '/') => (path.startsWith('http') ? path : `${SITE_URL}${path}`)

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl('/icon-512.png'),
  parentOrganization: { '@type': 'Organization', name: 'The Insights Desk' },
})

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/blogs?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
})

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})

export const itemListJsonLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: absoluteUrl(item.path),
    name: item.name,
  })),
})

/** One place that fills title, description, canonical, Open Graph and Twitter for a page. */
export const buildMetadata = ({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  fullTitle,
  fallbackImage,
  fallbackDescription,
}: {
  title: string
  description?: string | null
  path: string
  image?: string | null
  type?: 'website' | 'article' | 'video.episode'
  publishedTime?: string | null
  modifiedTime?: string | null
  /** Use the title exactly as given (no " | DeskTalks"). */
  fullTitle?: boolean
  /** Site-wide defaults from Site Settings → SEO Defaults. */
  fallbackImage?: string | null
  fallbackDescription?: string | null
}): Metadata => {
  const desc = metaDescription(description || fallbackDescription)
  const images = [image ? { url: image } : fallbackImage ? { url: fallbackImage } : DEFAULT_OG_IMAGE]
  return {
    title: fullTitle ? { absolute: title } : pageTitle(title),
    description: desc,
    alternates: { canonical: path, types: RSS_ALTERNATE },
    openGraph: {
      title,
      description: desc,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: type === 'video.episode' ? 'video.episode' : type,
      images,
      ...(type === 'article'
        ? { publishedTime: publishedTime ?? undefined, modifiedTime: modifiedTime ?? undefined }
        : {}),
    },
    twitter: { card: 'summary_large_image', title, description: desc, images },
  }
}

/** buildMetadata + the site-wide default share image and description from the dashboard. */
export const pageMetadata = async (args: Parameters<typeof buildMetadata>[0]): Promise<Metadata> => {
  const { getSettings } = await import('./queries')
  const { mediaUrl } = await import('./utils')
  const settings = await getSettings()
  return buildMetadata({
    ...args,
    fallbackImage: mediaUrl(settings.seo?.shareImage),
    fallbackDescription: settings.seo?.defaultDescription,
  })
}

/** SEO tab of a page global (title / description / image), falling back to defaults. */
export const globalMeta = (
  meta: { title?: string | null; description?: string | null; image?: unknown } | null | undefined,
  fallback: { title: string; description: string },
) => ({
  title: meta?.title || fallback.title,
  description: meta?.description || fallback.description,
  // Image only counts when populated (depth >= 1); a bare ID has no URL to use.
  image:
    meta?.image && typeof meta.image === 'object' && 'url' in meta.image
      ? ((meta.image as { url?: string | null }).url ?? undefined)
      : undefined,
})
