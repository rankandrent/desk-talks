import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageHero } from '@/components/PageHero'
import { extractText, RichText } from '@/components/RichText'
import { buildMetadata } from '@/lib/seo'
import { mediaUrl } from '@/lib/utils'
import { getPageBySlug } from '@/lib/queries'

export const revalidate = 3600
export const generateStaticParams = (): { slug: string }[] => []

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) return {}
  // Fall back to the opening text of the page when no SEO description was written.
  const intro = extractText(page.content).slice(0, 300)
  return buildMetadata({
    title: page.meta?.title || page.title,
    fullTitle: Boolean(page.meta?.title),
    description: page.meta?.description || intro,
    path: `/${page.slug}`,
    image: mediaUrl(page.meta?.image),
  })
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) notFound()

  return (
    <>
      <PageHero title={`Desktalks ${page.title}`} />
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-8 lg:px-[103px]">
        <RichText data={page.content} className="article max-w-[1002px]" />
      </div>
    </>
  )
}
