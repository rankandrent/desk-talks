import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageHero } from '@/components/PageHero'
import { RichText } from '@/components/RichText'
import { getPageBySlug } from '@/lib/queries'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) return {}
  return {
    title: page.meta?.title ? { absolute: page.meta.title } : page.title,
    description: page.meta?.description ?? undefined,
    alternates: { canonical: `/${page.slug}` },
  }
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
