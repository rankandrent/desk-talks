import type { Metadata } from 'next'
import Link from 'next/link'

import { EnquiryForm } from '@/components/EnquiryForm'
import { buildMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils'

export type JoinType = 'guest' | 'host'

export const JOIN_PAGES: Record<JoinType, { path: string; tab: string; title: string; text: string; metadata: Metadata }> = {
  guest: {
    path: '/join-as-guest',
    tab: 'Join as Guest',
    title: 'Join Us as a Podcast Guest',
    text: 'Have expertise, experience, or a story worth sharing? We’re always looking for industry leaders, specialists, founders, and change-makers to join our conversations.',
    metadata: buildMetadata({
      title: 'Join as a Podcast Guest',
      description:
        'Share your expertise on DeskTalks. We invite industry leaders, specialists, founders and change-makers to join our podcast conversations on tech and leadership.',
      path: '/join-as-guest',
    }),
  },
  host: {
    path: '/join-as-host',
    tab: 'Join as Host',
    title: 'Become a Podcast Host',
    text: 'Have a perspective worth sharing and a passion for meaningful conversations? Join our podcast community as a host and help bring expert voices and ideas to the forefront.',
    metadata: buildMetadata({
      title: 'Become a Podcast Host',
      description:
        'Become a DeskTalks podcast host. Lead meaningful conversations with tech leaders and bring expert voices and ideas to the forefront.',
      path: '/join-as-host',
    }),
  },
}

export function JoinPage({ type }: { type: JoinType }) {
  const copy = JOIN_PAGES[type]

  const tab = (active: boolean) =>
    cn(
      'rounded-[3px] border border-black px-3.5 py-1.5 text-[17px] transition-colors',
      active ? 'border-sun-400 bg-sun-400' : 'bg-white hover:bg-sun-50',
    )

  return (
    <>
      <section className="bg-teal-700">
        <p className="container-site py-16 text-center text-[30px] leading-[1.3] font-medium text-white sm:py-[86px] sm:text-[50px]">
          Whether you’re here to host or share your expertise, we’d love to hear from you.
        </p>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pt-10 pb-24 sm:px-8 lg:px-[120px]">
        <nav aria-label="Join DeskTalks" className="flex justify-center">
          <div className="inline-flex gap-1.5 rounded-[5px] bg-ink-50 p-1.5">
            {(['host', 'guest'] as const).map((key) => (
              <Link
                key={key}
                href={JOIN_PAGES[key].path}
                scroll={false}
                aria-current={type === key ? 'page' : undefined}
                className={tab(type === key)}
              >
                {JOIN_PAGES[key].tab}
              </Link>
            ))}
          </div>
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_544px] lg:gap-[110px]">
          <div>
            <h1 className="text-[38px] leading-[1.2] font-semibold text-black sm:text-[50px]">{copy.title}</h1>
            <p className="mt-6 max-w-[350px] text-[16px] leading-[1.4] text-ink-700">{copy.text}</p>
          </div>
          <EnquiryForm key={type} type={type} />
        </div>
      </section>
    </>
  )
}
