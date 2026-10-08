import Link from 'next/link'

import { EnquiryForm } from '@/components/EnquiryForm'
import { DEFAULTS, or } from '@/content/defaults'
import { getJoinPages } from '@/lib/queries'
import { pageMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils'

export type JoinType = 'guest' | 'host'

const PATHS: Record<JoinType, string> = { guest: '/join-as-guest', host: '/join-as-host' }

/** Text for one join page from the "Join Pages" global, falling back to the defaults. */
const copyFor = async (type: JoinType) => {
  const data = await getJoinPages()
  const page = data[type]
  const D = DEFAULTS.join
  return {
    banner: or(data.banner, D.banner),
    tab: { guest: or(data.guest?.tab, D.guest.tab), host: or(data.host?.tab, D.host.tab) },
    title: or(page?.title, D[type].title),
    text: or(page?.text, D[type].text),
    seoTitle: or(page?.seoTitle, D[type].seoTitle),
    seoDescription: or(page?.seoDescription, D[type].seoDescription),
  }
}

export const joinMetadata = async (type: JoinType) => {
  const copy = await copyFor(type)
  return pageMetadata({ title: copy.seoTitle, description: copy.seoDescription, path: PATHS[type] })
}

export async function JoinPage({ type }: { type: JoinType }) {
  const copy = await copyFor(type)

  const tab = (active: boolean) =>
    cn(
      'rounded-[3px] border border-black px-3.5 py-1.5 text-[17px] transition-colors',
      active ? 'border-sun-400 bg-sun-400' : 'bg-white hover:bg-sun-50',
    )

  return (
    <>
      <section className="bg-teal-700">
        <p className="container-site py-16 text-center text-[30px] leading-[1.3] font-medium text-white sm:py-[86px] sm:text-[50px]">
          {copy.banner}
        </p>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pt-10 pb-24 sm:px-8 lg:px-[120px]">
        <nav aria-label="Join DeskTalks" className="flex justify-center">
          <div className="inline-flex gap-1.5 rounded-[5px] bg-ink-50 p-1.5">
            {(['host', 'guest'] as const).map((key) => (
              <Link
                key={key}
                href={PATHS[key]}
                scroll={false}
                aria-current={type === key ? 'page' : undefined}
                className={tab(type === key)}
              >
                {copy.tab[key]}
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
