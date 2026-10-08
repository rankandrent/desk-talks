import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CommunitySection } from '@/components/CommunitySection'
import { ArrowUpRightIcon } from '@/components/icons'
import { PersonCard } from '@/components/PersonCard'
import { PlatformLinks } from '@/components/PlatformLinks'
import { PodcastCard } from '@/components/PodcastCard'
import { RichText } from '@/components/RichText'
import { ShareButtons } from '@/components/ShareButtons'
import { Waveform } from '@/components/Waveform'
import { JsonLd } from '@/components/JsonLd'
import { soundCloudEmbed, spotifyEmbed, youTubeEmbed, youTubeId } from '@/lib/embeds'
import { SITE_URL } from '@/lib/payload'
import { countPodcastsInCategory, getPodcastBySlug, getPodcasts, getSettings } from '@/lib/queries'
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from '@/lib/seo'
import { categoryOf, formatDate, mediaUrl, personOf } from '@/lib/utils'

// Cached; hourly refresh makes scheduled episodes go live within an hour of release.
export const revalidate = 3600
export const generateStaticParams = (): { slug: string }[] => []

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const podcast = await getPodcastBySlug(slug)
  if (!podcast) return {}
  return buildMetadata({
    title: podcast.meta?.title || `${podcast.title} | DeskTalks Podcast`,
    fullTitle: true,
    description: podcast.meta?.description || podcast.excerpt,
    path: `/podcasts/${podcast.slug}`,
    image: mediaUrl(podcast.meta?.image) ?? mediaUrl(podcast.heroImage) ?? mediaUrl(podcast.thumbnail),
    type: 'video.episode',
  })
}

/** "42 min" / "1h 5m" -> ISO 8601 duration for schema.org. */
const isoDuration = (text?: string | null) => {
  const h = Number(text?.match(/(\d+)\s*h/i)?.[1] ?? 0)
  const m = Number(text?.match(/(\d+)\s*m/i)?.[1] ?? 0)
  return h || m ? `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}` : undefined
}

export default async function PodcastPage({ params }: Props) {
  const { slug } = await params
  const podcast = await getPodcastBySlug(slug)
  if (!podcast || new Date(podcast.releaseDate) > new Date()) notFound()

  const category = categoryOf(podcast.category)
  const [related, categoryCount, settings] = await Promise.all([
    getPodcasts({ category: category?.slug ?? undefined, exclude: podcast.id, limit: 3 }),
    category ? countPodcastsInCategory(category.id) : Promise.resolve(0),
    getSettings(),
  ])
  // Fill "Explore more" with latest episodes when the category has fewer than three.
  const more =
    related.docs.length < 3
      ? [
          ...related.docs,
          ...(await getPodcasts({ exclude: podcast.id, limit: 6 })).docs.filter(
            (p) => !related.docs.some((r) => r.id === p.id),
          ),
        ].slice(0, 3)
      : related.docs

  const host = personOf(podcast.host)
  const guests = (podcast.guests ?? []).map(personOf).filter((p) => p !== undefined)
  const heroImage = mediaUrl(podcast.heroImage) ?? mediaUrl(podcast.thumbnail)
  const url = `${SITE_URL}/podcasts/${podcast.slug}`
  const player =
    youTubeEmbed(podcast.links?.youtube) ?? spotifyEmbed(podcast.links?.spotify) ?? soundCloudEmbed(podcast.links?.soundcloud)
  const isVideo = Boolean(youTubeEmbed(podcast.links?.youtube))

  const videoId = youTubeId(podcast.links?.youtube)
  const people = [host, ...guests].filter((p) => p !== undefined)
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'PodcastEpisode',
      name: podcast.title,
      url,
      datePublished: podcast.releaseDate,
      description: podcast.excerpt ?? undefined,
      image: heroImage ? absoluteUrl(heroImage) : undefined,
      timeRequired: isoDuration(podcast.duration),
      actor: people.map((p) => ({ '@type': 'Person', name: p.name, sameAs: p.linkedin ?? undefined })),
      partOfSeries: { '@type': 'PodcastSeries', name: 'DeskTalks', url: SITE_URL },
      sameAs: [podcast.links?.youtube, podcast.links?.spotify, podcast.links?.soundcloud].filter(Boolean),
    },
    // Video rich result in Google when the episode is on YouTube.
    ...(videoId
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: podcast.title,
            description: podcast.excerpt || podcast.title,
            thumbnailUrl: [`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`],
            uploadDate: podcast.releaseDate,
            duration: isoDuration(podcast.duration),
            embedUrl: `https://www.youtube.com/embed/${videoId}`,
            contentUrl: podcast.links?.youtube,
          },
        ]
      : []),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Podcasts', path: '/podcasts' },
      ...(category ? [{ name: category.name, path: `/podcasts?category=${category.slug}` }] : []),
      { name: podcast.title, path: `/podcasts/${podcast.slug}` },
    ]),
  ]

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="px-4 pt-6 sm:px-[25px]">
        <div className="relative mx-auto grid max-w-[1230px] overflow-hidden rounded-[40px] bg-gradient-to-r from-[#030707] via-teal-900 to-teal-500 md:min-h-[424px] md:grid-cols-[1fr_1fr]">
          <div className="absolute bottom-0 left-0 hidden h-[80px] w-1/2 md:block">
            <Waveform className="h-full px-1" bars={90} />
          </div>
          <div className="relative z-10 p-8 pb-24 sm:p-11 md:pr-0">
            {category && (
              <Link
                href={`/podcasts?category=${category.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur hover:bg-white/20"
              >
                {category.name}
                <span className="text-sun-400">·</span>
                <span className="text-white/80">
                  {categoryCount} {categoryCount === 1 ? 'episode' : 'episodes'}
                </span>
              </Link>
            )}
            <h1 className="mt-4 text-[34px] leading-[1.2] font-semibold text-white sm:text-[50px]">{podcast.title}</h1>
            <p className="mt-2 text-sm text-white/70">
              {formatDate(podcast.releaseDate)}
              {podcast.duration ? ` · ${podcast.duration}` : ''}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-[15px] text-white">Play on</span>
              <PlatformLinks links={podcast.links} title={podcast.title} variant="hero" />
            </div>
          </div>
          {heroImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroImage}
              alt={podcast.title}
              fetchPriority="high"
              className="h-full max-h-[424px] w-full self-end object-cover object-bottom md:object-right"
            />
          )}
        </div>
      </section>

      {/* Summary + people */}
      <section className="mx-auto grid max-w-[1280px] gap-10 px-4 pt-12 sm:px-8 lg:grid-cols-[470px_1fr] lg:gap-[57px] lg:pl-[107px]">
        <div>
          <h2 className="text-[24px] font-medium text-ink-700">Episode Summary:</h2>
          <RichText data={podcast.summary} className="article !font-sans !text-[17px] !text-ink-700 mt-3" />
          <div className="mt-8">
            <ShareButtons url={url} title={podcast.title} />
          </div>
        </div>
        <div className="grid content-start gap-5 sm:grid-cols-2">
          {host && <PersonCard label="Host" person={host} />}
          {guests.map((guest) => (
            <PersonCard key={guest.id} label="Guest" person={guest} />
          ))}
        </div>
      </section>

      {/* Player */}
      {player && (
        <section className="mx-auto max-w-[1280px] px-4 pt-14 sm:px-8 lg:px-[107px]">
          <div className={isVideo ? 'aspect-video overflow-hidden rounded-xl bg-black' : 'overflow-hidden rounded-xl'}>
            <iframe
              src={player}
              title={`${podcast.title} player`}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              className={isVideo ? 'size-full' : 'h-[232px] w-full'}
            />
          </div>
        </section>
      )}

      {/* Explore more */}
      {more.length > 0 && (
        <section className="pt-20 pb-16">
          <h2 className="text-center font-inter text-[34px] font-semibold text-ink-900 sm:text-[48px]">
            Explore More Podcast
          </h2>
          <div className="mx-auto mt-8 grid max-w-[1280px] gap-5 px-4 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-[65px]">
            {more.map((p) => (
              <PodcastCard key={p.id} podcast={p} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={category ? `/podcasts?category=${category.slug}` : '/podcasts'}
              className="btn-outline px-[17px] text-[17px]"
            >
              View All Podcasts <ArrowUpRightIcon className="size-3.5" />
            </Link>
          </div>
        </section>
      )}

      <div className="pt-6 pb-[90px]">
        <CommunitySection logos={settings.partnerLogos} />
      </div>
    </>
  )
}
