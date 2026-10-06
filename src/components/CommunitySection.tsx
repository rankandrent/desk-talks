import Link from 'next/link'

import type { SiteSetting } from '@/payload-types'
import { cn, mediaUrl } from '@/lib/utils'

import { ArrowUpRightIcon } from './icons'

export function CommunitySection({
  logos,
  variant = 'light',
}: {
  logos?: SiteSetting['partnerLogos']
  variant?: 'light' | 'teal'
}) {
  const teal = variant === 'teal'

  return (
    <section className="container-site">
      <div
        className={cn(
          'rounded-[26px] px-6 py-14 sm:px-14 lg:px-[55px] lg:py-[65px]',
          teal ? 'bg-teal-900 text-white' : 'bg-ink-50 text-black',
        )}
      >
        <div className="grid items-center gap-10 md:grid-cols-2 lg:pl-[75px]">
          <div>
            <h2 className="text-[40px] leading-[1.15] font-semibold sm:text-[50px]">
              The DeskTalk community is growing!
            </h2>
            <p className={cn('mt-6 max-w-[390px] text-[16px] leading-[1.4]', teal ? 'text-white' : 'text-ink-700')}>
              We bring together founders, business leaders, and innovators who are building what’s next and
              transforming industries along the way.
            </p>
            <Link href="/join?type=guest" className="btn-primary mt-6 px-[18px] text-[17px]">
              Join Our Community <ArrowUpRightIcon className="size-3.5" />
            </Link>
          </div>
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={teal ? '/images/orbit-teal.png' : '/images/orbit-light.png'}
              alt="DeskTalks global community"
              width={360}
              height={384}
              loading="lazy"
              className="h-auto w-full max-w-[360px]"
            />
          </div>
        </div>

        {logos && logos.length > 0 && (
          <ul className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {logos.map((item) => (
              <li
                key={item.id ?? item.name}
                className={cn(
                  'flex h-[67px] items-center justify-center rounded-[6px] px-4',
                  teal ? 'bg-teal-800' : 'bg-white',
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mediaUrl(item.logo)}
                  alt={item.name}
                  loading="lazy"
                  className={cn('max-h-[42px] w-auto object-contain', teal && 'brightness-0 invert')}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
