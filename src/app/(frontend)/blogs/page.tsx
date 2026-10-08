import type { Metadata } from 'next'

import { BlogCard } from '@/components/BlogCard'
import { Filters } from '@/components/Filters'
import { LoadMore } from '@/components/LoadMore'
import { PageHero } from '@/components/PageHero'
import { SubscribeSection } from '@/components/SubscribeSection'
import { DEFAULTS, or } from '@/content/defaults'
import { globalMeta, itemListJsonLd, pageMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { getBlogsPage, getCategories, getPosts, PAGE_SIZE } from '@/lib/queries'

export const dynamic = 'force-dynamic'

type Props = { searchParams: Promise<{ category?: string; q?: string; page?: string }> }

// Category views are real landing pages ("AI Research Articles"), so they get their own title and
// canonical; search and paging point back to the clean URL.
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category, q } = await searchParams
  const [categories, page] = await Promise.all([getCategories(), getBlogsPage()])
  const match = category ? categories.find((c) => c.slug === category) : undefined
  const D = DEFAULTS.blogs
  const meta = match
    ? await pageMetadata({
        title: `${match.name} Articles`,
        description:
          match.description || `${match.name} articles from DeskTalks. ${D.seo.description}`,
        path: `/blogs?category=${match.slug}`,
      })
    : await pageMetadata({ ...globalMeta(page.meta, D.seo), path: '/blogs' })
  return q ? { ...meta, robots: { index: false, follow: true } } : meta
}

export default async function BlogsPage({ searchParams }: Props) {
  const { category, q, page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)

  const [categories, posts, pageCopy] = await Promise.all([
    getCategories(),
    getPosts({ category, search: q, limit: PAGE_SIZE * page }),
    getBlogsPage(),
  ])
  const D = DEFAULTS.blogs

  const activeCategory = categories.find((c) => c.slug === category)

  return (
    <>
      <JsonLd
        data={itemListJsonLd(posts.docs.map((p) => ({ name: p.title, path: `/blogs/${p.slug}` })))}
      />
      <PageHero
        title={
          activeCategory
            ? `${activeCategory.name} Articles`
            : or(pageCopy.hero?.title, D.hero.title)
        }
        description={
          activeCategory?.description || or(pageCopy.hero?.description, D.hero.description)
        }
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
            label={or(pageCopy.loadMoreLabel, D.loadMoreLabel)}
          />
        </div>
      </div>

      <div className="pb-[70px]">
        <SubscribeSection />
      </div>
    </>
  )
}
