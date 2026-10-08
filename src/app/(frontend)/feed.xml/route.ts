import { getPosts } from '@/lib/queries'
import { SITE_URL } from '@/lib/payload'
import { absoluteUrl } from '@/lib/seo'
import { categoryOf, mediaUrl, personOf } from '@/lib/utils'

export const revalidate = 3600

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** RSS 2.0 feed of the latest blogs (linked from every page's <head>). */
export async function GET() {
  const { docs } = await getPosts({ limit: 30 })

  const items = docs
    .map((post) => {
      const link = `${SITE_URL}/blogs/${post.slug}`
      const image = mediaUrl(post.featuredImage)
      const category = categoryOf(post.category)
      const author = personOf(post.author)
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escape(post.excerpt)}</description>
      ${post.publishedAt ? `<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>` : ''}
      ${category ? `<category>${escape(category.name)}</category>` : ''}
      ${author ? `<dc:creator>${escape(author.name)}</dc:creator>` : ''}
      ${image ? `<enclosure url="${escape(absoluteUrl(image))}" type="image/jpeg" length="0" />` : ''}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>DeskTalks Blogs</title>
    <link>${SITE_URL}/blogs</link>
    <description>Insights from experienced experts on AI, research, technology and leadership.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
