import type { Podcast } from '@/payload-types'
import { cn } from '@/lib/utils'

import { SoundCloudIcon, SpotifyIcon, YouTubeIcon } from './icons'

type Variant = 'card' | 'hero'

/**
 * Platform buttons from the Figma components board:
 * grey icon by default, brand colour on hover.
 */
export function PlatformLinks({
  links,
  variant = 'card',
  title,
}: {
  links?: Podcast['links']
  variant?: Variant
  title: string
}) {
  const items = [
    { href: links?.youtube, label: 'YouTube', Icon: YouTubeIcon, hover: 'group-hover/btn:text-[#ff0000]' },
    { href: links?.soundcloud, label: 'SoundCloud', Icon: SoundCloudIcon, hover: 'group-hover/btn:text-[#ff7700]' },
    { href: links?.spotify, label: 'Spotify', Icon: SpotifyIcon, hover: 'group-hover/btn:text-[#1ed760]' },
  ].filter((item) => item.href)

  if (!items.length) return null

  return (
    <div className="relative z-10 flex items-center gap-2.5">
      {items.map(({ href, label, Icon, hover }) => (
        <a
          key={label}
          href={href!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Listen to ${title} on ${label}`}
          className={cn(
            'group/btn flex size-10 items-center justify-center rounded-full transition-colors',
            variant === 'card'
              ? 'bg-sun-400 text-ink-800 group-hover:bg-ink-100'
              : 'bg-white/95 text-ink-800 hover:bg-white',
          )}
        >
          <Icon className={cn('size-5 transition-colors', hover)} />
        </a>
      ))}
    </div>
  )
}
