import type { Metadata } from 'next'
import Link from 'next/link'

import { EnquiryForm } from '@/components/EnquiryForm'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Join as Host or Guest',
  description: 'Whether you’re here to host or share your expertise, we’d love to hear from you.',
  alternates: { canonical: '/join' },
}

const COPY = {
  guest: {
    title: 'Join Us as a Podcast Guest',
    text: 'Have expertise, experience, or a story worth sharing? We’re always looking for industry leaders, specialists, founders, and change-makers to join our conversations.',
  },
  host: {
    title: 'Become a Podcast Host',
    text: 'Have a perspective worth sharing and a passion for meaningful conversations? Join our podcast community as a host and help bring expert voices and ideas to the forefront.',
  },
}

type Props = { searchParams: Promise<{ type?: string }> }

export default async function JoinPage({ searchParams }: Props) {
  const { type: typeParam } = await searchParams
  const type = typeParam === 'host' ? 'host' : 'guest'
  const copy = COPY[type]

  const tab = (active: boolean) =>
    cn(
      'rounded-[3px] border border-black px-3.5 py-1.5 text-[17px] transition-colors',
      active ? 'bg-sun-400 border-sun-400' : 'bg-white hover:bg-sun-50',
    )

  return (
    <>
      <section className="bg-teal-700">
        <h1 className="container-site py-16 text-center text-[30px] leading-[1.3] font-medium text-white sm:py-[86px] sm:text-[50px]">
          Whether you’re here to host or share your expertise, we’d love to hear from you.
        </h1>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pt-10 pb-24 sm:px-8 lg:px-[120px]">
        <div className="flex justify-center">
          <div className="inline-flex gap-1.5 rounded-[5px] bg-ink-50 p-1.5" role="tablist">
            <Link href="/join?type=host" scroll={false} role="tab" aria-selected={type === 'host'} className={tab(type === 'host')}>
              Join as Host
            </Link>
            <Link href="/join?type=guest" scroll={false} role="tab" aria-selected={type === 'guest'} className={tab(type === 'guest')}>
              Join as Guest
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_544px] lg:gap-[110px]">
          <div>
            <h2 className="text-[38px] leading-[1.2] font-semibold text-black sm:text-[50px]">{copy.title}</h2>
            <p className="mt-6 max-w-[350px] text-[16px] leading-[1.4] text-ink-700">{copy.text}</p>
          </div>
          <EnquiryForm key={type} type={type} />
        </div>
      </section>
    </>
  )
}
