import Link from 'next/link'

import { BlogCard } from '@/components/BlogCard'
import { CommunitySection } from '@/components/CommunitySection'
import { EnquiryForm } from '@/components/EnquiryForm'
import { ArrowUpRightIcon, PlayIcon } from '@/components/icons'
import { NextEpisode } from '@/components/NextEpisode'
import { PodcastCarousel } from '@/components/PodcastCarousel'
import { SubscribeSection } from '@/components/SubscribeSection'
import {
  getFeaturedPodcast,
  getNextPodcast,
  getPodcasts,
  getHomePage,
  getPosts,
  getSettings,
} from '@/lib/queries'
import { JsonLd } from '@/components/JsonLd'
import { DEFAULTS, or } from '@/content/defaults'
import { globalMeta, organizationJsonLd, pageMetadata, websiteJsonLd } from '@/lib/seo'
import { mediaAlt, mediaUrl } from '@/lib/utils'

// Cached; refreshed every 10 min (Next Episode depends on time) and on every publish.
export const revalidate = 600

export async function generateMetadata() {
  const meta = globalMeta((await getHomePage()).meta, DEFAULTS.home.seo)
  return pageMetadata({ ...meta, fullTitle: true, path: '/' })
}

export default async function HomePage() {
  const [featured, nextPodcast, podcasts, posts, settings, page] = await Promise.all([
    getFeaturedPodcast(),
    getNextPodcast(),
    getPodcasts({ limit: 9 }),
    getPosts({ limit: 3 }),
    getSettings(),
    getHomePage(),
  ])
  const D = DEFAULTS.home
  const { hero, podcasts: podcastsSection, blogs, contact } = page

  const heroImage = mediaUrl(featured?.heroImage) ?? mediaUrl(featured?.thumbnail)

  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      {/* Hero */}
      <section className="container-site grid items-center gap-12 pt-14 pb-20 lg:grid-cols-[1fr_518px] lg:gap-[60px] lg:pt-[75px] lg:pl-[99px]">
        <div>
          <h1 className="text-[40px] leading-[1.15] font-semibold text-black sm:text-[48px]">
            {or(hero?.title, D.hero.title)}
          </h1>
          <p className="mt-7 max-w-[410px] text-[16px] leading-[1.4] text-ink-700">
            {or(hero?.text, D.hero.text)}
          </p>
          <div className="mt-5 flex flex-wrap gap-[11px]">
            <Link
              href={or(hero?.hostButtonLink, D.hero.hostButtonLink)}
              className="btn-outline px-[17px] text-[16px]"
            >
              {or(hero?.hostButtonLabel, D.hero.hostButtonLabel)}
            </Link>
            <Link
              href={or(hero?.guestButtonLink, D.hero.guestButtonLink)}
              className="btn-primary px-[17px] text-[16px]"
            >
              {or(hero?.guestButtonLabel, D.hero.guestButtonLabel)}
            </Link>
          </div>
        </div>

        {featured && (
          <Link
            href={`/podcasts/${featured.slug}`}
            className="group relative block aspect-[518/338] overflow-hidden rounded-[13px] bg-teal-900 shadow-[0_0_0_7px_#f3f3f3]"
          >
            {heroImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroImage}
                alt={mediaAlt(featured.heroImage ?? featured.thumbnail, featured.title)}
                fetchPriority="high"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <span className="absolute top-1/2 left-1/2 flex size-[50px] -translate-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors group-hover:bg-sun-500 group-hover:text-black">
              <PlayIcon className="size-6" />
            </span>
            <span className="absolute right-6 bottom-4 left-6 text-xl leading-[1.45] font-medium text-white sm:text-[23px]">
              {featured.title}
            </span>
          </Link>
        )}
      </section>

      {nextPodcast && <NextEpisode podcast={nextPodcast} />}

      {/* Podcasts */}
      <section className="pt-8 pb-24">
        <h2 className="mx-auto max-w-[830px] px-4 text-center text-[34px] leading-[1.2] font-semibold text-balance text-black sm:text-[48px]">
          {or(podcastsSection?.heading, D.podcasts.heading)}
        </h2>
        <PodcastCarousel podcasts={podcasts.docs} />
        <div className="mt-9 text-center">
          <Link href="/podcasts" className="btn-outline px-[17px] text-[16px]">
            {or(podcastsSection?.buttonLabel, D.podcasts.buttonLabel)}{' '}
            <ArrowUpRightIcon className="size-3.5" />
          </Link>
        </div>
      </section>

      <CommunitySection settings={settings} />

      {/* Blogs */}
      {posts.docs.length > 0 && (
        <section className="container-site pt-[74px] pb-20">
          <div className="text-center">
            <span className="chip gap-2 px-2.5 py-1.5 text-[16px] normal-case">
              <span className="size-1.5 rounded-full bg-black" /> {or(blogs?.label, D.blogs.label)}
            </span>
            <h2 className="mt-5 font-inter text-[34px] font-semibold text-ink-900 sm:text-[48px]">
              {or(blogs?.heading, D.blogs.heading)}
            </h2>
          </div>
          <div className="mt-11 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.docs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-[1280px] scroll-mt-24 px-4 py-16 sm:px-8 lg:px-[120px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_544px] lg:gap-[90px]">
          <div>
            <h2 className="text-[40px] leading-[1.2] font-semibold text-black sm:text-[48px]">
              {or(contact?.heading, D.contact.heading)}
            </h2>
            <p className="mt-6 max-w-[340px] text-[16px] leading-[1.4] text-ink-700">
              {or(contact?.text, D.contact.text)}
            </p>
          </div>
          <EnquiryForm
            type="contact"
            joinPrompt={or(contact?.joinPrompt, D.contact.joinPrompt)}
            joinLinkLabel={or(contact?.joinLinkLabel, D.contact.joinLinkLabel)}
          />
        </div>
      </section>

      <div className="pt-16 pb-[120px]">
        <SubscribeSection />
      </div>
    </>
  )
}
