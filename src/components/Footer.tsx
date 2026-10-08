import Link from 'next/link'

import type { SiteSetting } from '@/payload-types'

import { InstagramIcon, LinkedInIcon, SoundCloudIcon, SpotifyIcon, YouTubeIcon } from './icons'
import { Logo } from './Logo'

type FooterLink = { label: string; link: string; id?: string | null }

export function Footer({
  social,
  links: topLinks,
  bottomLinks,
  copyright,
  logo,
}: {
  social?: SiteSetting['social']
  links: FooterLink[]
  bottomLinks: FooterLink[]
  copyright: string
  logo?: string
}) {
  const socialLinks = [
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
            <Logo inverted src={logo} />
          </Link>
          <div className="flex flex-col gap-6 sm:items-end">
            <div className="flex flex-wrap gap-x-7 gap-y-2 text-[17px]">
              {topLinks.map((item) => (
                <Link key={item.id ?? item.link} href={item.link} className="hover:text-sun-400">
                  {item.label}
                </Link>
              ))}
            </div>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-5">
                {socialLinks.map(({ href, label, Icon }) => (
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
          <p>
            © {new Date().getFullYear()} | {copyright}
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            {bottomLinks.map((item) => (
              <Link key={item.id ?? item.link} href={item.link} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
