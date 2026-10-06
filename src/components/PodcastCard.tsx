import Link from 'next/link'

import type { Podcast } from '@/payload-types'
import { mediaAlt, mediaUrl, personOf } from '@/lib/utils'

import { PlatformLinks } from './PlatformLinks'

export function PodcastCard({ podcast }: { podcast: Podcast }) {
  const guest = personOf(podcast.guests?.[0])
  const companyLogo = mediaUrl(guest?.companyLogo)

  return (
    <article className="group relative flex h-full flex-col rounded-[9px] bg-ink-50 p-[7px] shadow-[0_0_4px_rgba(0,0,0,0.04)] transition-colors duration-300 hover:bg-sun-400">
      <div className="aspect-[356/123] overflow-hidden rounded-[6px] bg-teal-900">
        {mediaUrl(podcast.thumbnail) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mediaUrl(podcast.thumbnail)}
            alt={mediaAlt(podcast.thumbnail, podcast.title)}
            loading="lazy"
            className="size-full object-cover"
          />
        )}
      </div>
      <h3 className="min-h-[96px] px-[13px] pt-[18px] pb-6 text-[22px] leading-[1.45] font-medium text-ink-700">
        <Link href={`/podcasts/${podcast.slug}`} className="after:absolute after:inset-0">
          {podcast.title}
        </Link>
      </h3>
      <div className="mt-auto flex items-center justify-between px-[15px] pb-[15px]">
        <PlatformLinks links={podcast.links} title={podcast.title} />
        {companyLogo && (
          <span className="flex h-[35px] items-center rounded-[3px] bg-white px-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={companyLogo} alt={guest?.company ?? ''} className="h-[22px] w-auto max-w-[110px] object-contain" />
          </span>
        )}
      </div>
    </article>
  )
}
