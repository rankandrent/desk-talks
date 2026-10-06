import Link from 'next/link'

import type { SiteSetting } from '@/payload-types'

import { InstagramIcon, LinkedInIcon, SoundCloudIcon, SpotifyIcon, YouTubeIcon } from './icons'
import { Logo } from './Logo'

export function Footer({ social }: { social?: SiteSetting['social'] }) {
  const links = [
    { href: social?.youtube, label: 'YouTube', Icon: YouTubeIcon },
    { href: social?.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
    { href: social?.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: social?.soundcloud, label: 'SoundCloud', Icon: SoundCloudIcon },
    { href: social?.spotify, label: 'Spotify', Icon: SpotifyIcon },
  ].filter((link) => link.href)

  return (
    <footer className="bg-footer text-white">
      <div className="container-site !px-4 py-8 sm:!px-[68px]">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <Link href="/" aria-label="DeskTalks home">
            <Logo inverted />
          </Link>
          <div className="flex flex-col gap-6 sm:items-end">
            <div className="flex gap-7 text-[17px]">
              <Link href="/join?type=guest" className="hover:text-sun-400">
                Join as Guest
              </Link>
              <Link href="/join?type=host" className="hover:text-sun-400">
                Join as Host
              </Link>
            </div>
            {links.length > 0 && (
              <div className="flex items-center gap-5">
                {links.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="hover:text-sun-400"
                  >
                    <Icon className="size-[22px]" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/40 pt-7 text-[17px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} | All rights reserved.</p>
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            <Link href="/terms-and-conditions" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/#contact" className="hover:text-white">
              Contact Us
            </Link>
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
