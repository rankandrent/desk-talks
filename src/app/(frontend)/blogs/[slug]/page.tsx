import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { BlogCard } from '@/components/BlogCard'
import { Faqs } from '@/components/Faqs'
import { LinkedInIcon } from '@/components/icons'
import { extractText, extractToc, RichText } from '@/components/RichText'
import { ShareButtons } from '@/components/ShareButtons'
import { SummarizeWithAI } from '@/components/SummarizeWithAI'
import { JsonLd } from '@/components/JsonLd'
import { TableOfContents } from '@/components/TableOfContents'
import { SITE_URL } from '@/lib/payload'
import { getPostBySlug, getPosts, getSettings } from '@/lib/queries'
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from '@/lib/seo'
import { categoryOf, formatDate, mediaAlt, mediaUrl, personOf } from '@/lib/utils'

export const revalidate = 3600
export const generateStaticParams = (): { slug: string }[] => []

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return buildMetadata({
    // Long headlines drop the " | DeskTalks" suffix automatically (see pageTitle).
    title: post.meta?.title || post.title,
    fullTitle: Boolean(post.meta?.title),
    description: post.meta?.description || post.excerpt,
    path: `/blogs/${post.slug}`,
    image: mediaUrl(post.meta?.image) ?? mediaUrl(post.featuredImage),
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.contentUpdatedAt,
  })
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const category = categoryOf(post.category)
  const author = personOf(post.author)
  const [related, settings] = await Promise.all([
    getPosts({ category: category?.slug ?? undefined, exclude: post.id, limit: 3 }),
    getSettings(),
  ])
  const more =
    related.docs.length < 3
      ? [
          ...related.docs,
          ...(await getPosts({ exclude: post.id, limit: 6 })).docs.filter(
            (p) => !related.docs.some((r) => r.id === p.id),
          ),
        ].slice(0, 3)
      : related.docs

  const faqs = post.faqs ?? []
  const toc = [...extractToc(post.content), ...(faqs.length ? [{ id: 'faqs', text: 'Frequently Asked Questions' }] : [])]
  const url = `${SITE_URL}/blogs/${post.slug}`
  const cta = settings.blogCta
  const showUpdated = Boolean(post.contentUpdatedAt)
  const words = extractText(post.content).split(/\s+/).filter(Boolean).length
  const readMinutes = Math.max(1, Math.round(words / 220))

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: mediaUrl(post.featuredImage) ? absoluteUrl(mediaUrl(post.featuredImage)!) : undefined,
      datePublished: post.publishedAt,
      dateModified: post.contentUpdatedAt ?? post.publishedAt,
      author: author ? { '@type': 'Person', name: author.name, sameAs: author.linkedin ?? undefined } : undefined,
      publisher: {
        '@type': 'Organization',
        name: 'DeskTalks',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: absoluteUrl('/icon-512.png') },
      },
      mainEntityOfPage: url,
      articleSection: category?.name,
      wordCount: words,
      timeRequired: `PT${readMinutes}M`,
    },
    ...(faqs.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          },
        ]
      : []),
  ]

  return (
    <>
      <JsonLd
        data={[
          ...jsonLd,
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blogs', path: '/blogs' },
            ...(category ? [{ name: category.name, path: `/blogs?category=${category.slug}` }] : []),
            { name: post.title, path: `/blogs/${post.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bg-ink-50 font-inter">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[1fr_548px] lg:gap-[60px] lg:px-[60px] lg:py-[68px]">
          <div>
            {category && (
              <Link href={`/blogs?category=${category.slug}`} className="chip">
                {category.name}
              </Link>
            )}
            <h1 className="mt-6 text-[34px] leading-[1.2] font-semibold text-ink-900 sm:text-[48px]">{post.title}</h1>
            <p className="mt-6 flex flex-wrap gap-x-8 gap-y-1 text-[12px]">
              <span>
                <span className="font-semibold text-black">Published Date: </span>
                <time dateTime={post.publishedAt ?? undefined} className="text-ink-500">
                  {formatDate(post.publishedAt)}
                </time>
              </span>
              {showUpdated && (
                <span>
                  <span className="font-semibold text-black">Last updated: </span>
                  <time dateTime={post.contentUpdatedAt ?? undefined} className="text-ink-500">
                    {formatDate(post.contentUpdatedAt)}
                  </time>
                </span>
              )}
              <span className="text-ink-500">{readMinutes} min read</span>
            </p>
          </div>
          {mediaUrl(post.featuredImage) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mediaUrl(post.featuredImage)}
              alt={mediaAlt(post.featuredImage, post.title)}
              fetchPriority="high"
              className="aspect-[548/314] w-full rounded-[4px] object-cover"
            />
          )}
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 pt-[90px] sm:px-8 lg:grid-cols-[646px_1fr] lg:gap-[75px] lg:px-[58px]">
        <article className="min-w-0">
          <RichText data={post.content} className="article" />
          <Faqs faqs={faqs} />

          {author && (
            <div className="mt-6 flex max-w-[440px] items-center gap-5 rounded-[6px] border border-ink-300 px-6 py-6 font-inter">
              {mediaUrl(author.photo) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={mediaUrl(author.photo)} alt={author.name} className="size-[68px] rounded-full object-cover object-top" />
              )}
              <div>
                <p className="flex items-center gap-1.5 font-semibold text-black">
                  {author.name}
                  {author.linkedin && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${author.name} on LinkedIn`}
                      className="flex size-[22px] items-center justify-center rounded-full bg-black text-white"
                    >
                      <LinkedInIcon className="size-3" />
                    </a>
                  )}
                </p>
                <p className="mt-1 text-ink-700">
                  {[author.designation, author.company].filter(Boolean).join(', ')}
                </p>
              </div>
            </div>
          )}

          <div className="mt-6">
            <ShareButtons url={url} title={post.title} />
          </div>
        </article>

        <aside className="lg:max-w-[440px]">
          <div className="space-y-8 lg:sticky lg:top-[110px]">
            <TableOfContents items={toc} />
            <SummarizeWithAI url={url} />
            {cta?.heading && (
              <div className="rounded-[10px] bg-gradient-to-br from-black via-[#0b1517] to-[#1d3436] px-8 py-7 text-center font-inter text-white">
                <p className="text-[24px] leading-[1.35] font-medium">{cta.heading}</p>
                {cta.text && <p className="mt-3 text-[16px] leading-[1.4] text-white/90">{cta.text}</p>}
                {cta.buttonLabel && (
                  <Link href={cta.buttonUrl || '/#contact'} className="btn-primary mt-6 px-4 py-1.5 text-[12px]">
                    {cta.buttonLabel}
                  </Link>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* More blogs */}
      {more.length > 0 && (
        <section className="container-site pt-[74px] pb-16">
          <div className="text-center">
            <span className="chip gap-2 px-2.5 py-1.5 text-[16px] normal-case">
              <span className="size-1.5 rounded-full bg-black" /> Our Blogs
            </span>
            <h2 className="mt-5 font-inter text-[34px] font-semibold text-ink-900 sm:text-[48px]">
              Explore More Blogs
            </h2>
          </div>
          <div className="mt-11 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
