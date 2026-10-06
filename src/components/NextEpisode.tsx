import type { Podcast } from '@/payload-types'
import { categoryOf, mediaUrl, personOf } from '@/lib/utils'

import { Waveform } from './Waveform'

/** "Next Episode" banner, driven by a published podcast whose release date is in the future. */
export function NextEpisode({ podcast }: { podcast: Podcast }) {
  const guest = personOf(podcast.guests?.[0])
  const category = categoryOf(podcast.category)
  const when = new Date(podcast.releaseDate)
  const date = when.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const time = when.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })
  const image = mediaUrl(podcast.thumbnail)

  return (
    <section className="container-site pb-16">
      <div className="relative overflow-hidden rounded-[18px] bg-gradient-to-r from-[#050c0d] via-teal-900 to-teal-700 text-white">
        <Waveform className="absolute inset-x-0 bottom-0 h-16 opacity-30" bars={180} />
        <div className="relative grid items-center gap-6 p-6 sm:p-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-sun-500 px-3 py-1 text-xs font-semibold tracking-wide text-black uppercase">
              <span className="size-1.5 animate-pulse rounded-full bg-black" /> Next Episode
              {category && <span className="font-normal normal-case">· {category.name}</span>}
            </p>
            <h2 className="mt-4 text-2xl leading-tight font-medium sm:text-[32px]">{podcast.title}</h2>
            {guest && (
              <p className="mt-2 text-white/80">
                with {guest.name}
                {guest.designation ? `, ${guest.designation}` : ''}
                {guest.company ? ` at ${guest.company}` : ''}
              </p>
            )}
            <p className="mt-4 text-lg text-sun-400">
              <time dateTime={podcast.releaseDate}>
                {date} · {time}
              </time>
            </p>
          </div>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" className="hidden w-[320px] rounded-lg md:block" />
          )}
        </div>
      </div>
    </section>
  )
}
