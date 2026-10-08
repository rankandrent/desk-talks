import type { Metadata } from 'next'

import { Filters } from '@/components/Filters'
import { LoadMore } from '@/components/LoadMore'
import { PageHero } from '@/components/PageHero'
import { PodcastCard } from '@/components/PodcastCard'
import { SubscribeBox } from '@/components/SubscribeBox'
import { buildMetadata, itemListJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { getCategories, getPodcasts, PAGE_SIZE } from '@/lib/queries'

export const dynamic = 'force-dynamic'

type Props = { searchParams: Promise<{ category?: string; q?: string; page?: string }> }

// Category views are real landing pages ("AI Research Podcasts"), so they get their own title and
// canonical; search and paging point back to the clean URL.
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category, q } = await searchParams
  const match = category ? (await getCategories()).find((c) => c.slug === category) : undefined
  const meta = match
    ? buildMetadata({
        title: `${match.name} Podcasts`,
        description: `${match.name} podcasts from DeskTalks: listen to the voices shaping the future of tech & leadership. Insights from experienced experts, research best practices and more.`,
        path: `/podcasts?category=${match.slug}`,
      })
    : buildMetadata({
        title: 'Podcasts',
        description:
          'Listen to the voices shaping the future of tech & leadership. Insights from experienced experts, research best practices and more.',
        path: '/podcasts',
      })
  return q ? { ...meta, robots: { index: false, follow: true } } : meta
}

export default async function PodcastsPage({ searchParams }: Props) {
  const { category, q, page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)

  const [categories, podcasts] = await Promise.all([
    getCategories(),
    getPodcasts({ category, search: q, limit: PAGE_SIZE * page }),
  ])

  const activeCategory = categories.find((c) => c.slug === category)

  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          podcasts.docs.map((p) => ({ name: p.title, path: `/podcasts/${p.slug}` })),
        )}
      />
      <PageHero
        waveform
        title={
          activeCategory
            ? `${activeCategory.name} Podcasts`
            : 'Listen to the voices shaping the Future of Tech & leadership'
        }
        description="Featuring insights from experienced experts, research best practices and companies gain clarity and act with confidence."
      />

      <div className="pt-[53px] pb-24">
        <Filters basePath="/podcasts" categories={categories} active={category} search={q} />

        <div className="mx-auto mt-9 max-w-[1280px] px-4 sm:px-8 lg:px-[65px]">
          {podcasts.docs.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {podcasts.docs.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-ink-500">
              No podcasts found. Try another category or search.
            </p>
          )}
          <LoadMore
            basePath="/podcasts"
            page={page}
            hasMore={podcasts.hasNextPage}
            params={{ category, q }}
            label="View More"
          />
        </div>
      </div>

      <div className="pb-[120px]">
        <SubscribeBox />
      </div>
    </>
  )
}
