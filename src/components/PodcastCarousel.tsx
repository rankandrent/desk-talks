'use client'

import { useRef } from 'react'

import type { Podcast } from '@/payload-types'

import { ArrowLeftIcon, ArrowRightIcon } from './icons'
import { PodcastCard } from './PodcastCard'

export function PodcastCarousel({ podcasts }: { podcasts: Podcast[] }) {
  const track = useRef<HTMLDivElement>(null)

  const scroll = (direction: 1 | -1) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth, behavior: 'smooth' })
  }

  if (!podcasts.length) return null

  const arrow =
    'absolute top-1/2 z-10 hidden size-[46px] -translate-y-1/2 items-center justify-center rounded-full bg-ink-300/90 text-white transition-colors hover:bg-sun-500 hover:text-black lg:flex'

  return (
    <div className="relative mx-auto mt-11 max-w-[1280px] px-4 sm:px-8 lg:px-[65px]">
      <button type="button" aria-label="Previous podcasts" onClick={() => scroll(-1)} className={`${arrow} left-8`}>
        <ArrowLeftIcon className="size-6" />
      </button>
      <div
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
      >
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc((100%-40px)/3)]"
          >
            <PodcastCard podcast={podcast} />
          </div>
        ))}
      </div>
      <button type="button" aria-label="Next podcasts" onClick={() => scroll(1)} className={`${arrow} right-8`}>
        <ArrowRightIcon className="size-6" />
      </button>
    </div>
  )
}
