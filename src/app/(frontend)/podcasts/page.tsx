import type { Metadata } from 'next'

import { Filters } from '@/components/Filters'
import { LoadMore } from '@/components/LoadMore'
import { PageHero } from '@/components/PageHero'
import { PodcastCard } from '@/components/PodcastCard'
import { SubscribeBox } from '@/components/SubscribeBox'
import { getCategories, getPodcasts, PAGE_SIZE } from '@/lib/queries'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Podcasts',
  description:
    'Listen to the voices shaping the future of tech & leadership. Insights from experienced experts, research best practices and more.',
  alternates: { canonical: '/podcasts' },
}

type Props = { searchParams: Promise<{ category?: string; q?: string; page?: string }> }

export default async function PodcastsPage({ searchParams }: Props) {
  const { category, q, page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)

  const [categories, podcasts] = await Promise.all([
    getCategories(),
    getPodcasts({ category, search: q, limit: PAGE_SIZE * page }),
  ])

  return (
    <>
      <PageHero
        waveform
        title="Listen to the voices shaping the Future of Tech & leadership"
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
            <p className="py-16 text-center text-ink-500">No podcasts found. Try another category or search.</p>
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
