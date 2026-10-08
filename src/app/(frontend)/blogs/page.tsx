import type { Metadata } from 'next'

import { BlogCard } from '@/components/BlogCard'
import { Filters } from '@/components/Filters'
import { LoadMore } from '@/components/LoadMore'
import { PageHero } from '@/components/PageHero'
import { SubscribeBox } from '@/components/SubscribeBox'
import { buildMetadata, itemListJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { getCategories, getPosts, PAGE_SIZE } from '@/lib/queries'

export const dynamic = 'force-dynamic'

type Props = { searchParams: Promise<{ category?: string; q?: string; page?: string }> }

// Category views are real landing pages ("AI Research Articles"), so they get their own title and
// canonical; search and paging point back to the clean URL.
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category, q } = await searchParams
  const match = category ? (await getCategories()).find((c) => c.slug === category) : undefined
  const meta = match
    ? buildMetadata({
        title: `${match.name} Articles`,
        description: `${match.name} articles from DeskTalks: insights from experienced experts, research best practices and articles showing how companies gain clarity and act with confidence.`,
        path: `/blogs?category=${match.slug}`,
      })
    : buildMetadata({
        title: 'Blogs',
        description:
          'Insights from experienced experts, research best practices and articles showing how companies gain clarity and act with confidence.',
        path: '/blogs',
      })
  return q ? { ...meta, robots: { index: false, follow: true } } : meta
}

export default async function BlogsPage({ searchParams }: Props) {
  const { category, q, page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)

  const [categories, posts] = await Promise.all([
    getCategories(),
    getPosts({ category, search: q, limit: PAGE_SIZE * page }),
  ])

  const activeCategory = categories.find((c) => c.slug === category)

  return (
    <>
      <JsonLd
        data={itemListJsonLd(posts.docs.map((p) => ({ name: p.title, path: `/blogs/${p.slug}` })))}
      />
      <PageHero
        title={activeCategory ? `${activeCategory.name} Articles` : 'Desktalks Blogs'}
        description="Featuring insights from experienced experts, research best practices and articles showing how we help companies gain clarity and act with confidence."
      />

      <div className="pt-[41px] pb-14">
        <Filters basePath="/blogs" categories={categories} active={category} search={q} />

        <div className="container-site mt-[52px]">
          {posts.docs.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.docs.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-ink-500">
              No articles found. Try another category or search.
            </p>
          )}
          <LoadMore
            basePath="/blogs"
            page={page}
            hasMore={posts.hasNextPage}
            params={{ category, q }}
            label="Load More.."
          />
        </div>
      </div>

      <div className="pb-[70px]">
        <SubscribeBox />
      </div>
    </>
  )
}
