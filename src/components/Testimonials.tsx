'use client'

import { useState } from 'react'

import { ArrowLeftIcon, ArrowRightIcon } from './icons'

export type Testimonial = { id: number; name: string; designation?: string | null; quote: string; photo?: string }

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0)
  if (!items.length) return null

  const item = items[index]
  const go = (step: number) => setIndex((i) => (i + step + items.length) % items.length)
  const arrow =
    'flex size-[47px] shrink-0 items-center justify-center rounded-full border border-ink-700/60 text-ink-700 transition-colors hover:bg-sun-500 hover:border-sun-500 hover:text-black'

  return (
    <section className="bg-sun-50">
      <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-4 py-14 sm:px-10 lg:py-[71px]">
        {items.length > 1 && (
          <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)} className={`${arrow} hidden sm:flex`}>
            <ArrowLeftIcon className="size-6" />
          </button>
        )}
        <div className="grid flex-1 items-center gap-10 md:grid-cols-[1fr_314px] md:gap-[90px] lg:px-[75px]" aria-live="polite">
          <div>
            <p className="text-[16px] leading-[1.4] whitespace-pre-line text-ink-700">{item.quote}</p>
            <p className="mt-9 text-[40px] leading-tight font-semibold text-black sm:text-[50px]">{item.name}</p>
            {item.designation && <p className="mt-1 text-[16px] text-ink-700">{item.designation}</p>}
          </div>
          {item.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.photo}
              alt={item.name}
              className="mx-auto aspect-[314/352] w-full max-w-[314px] rounded-[4px] bg-sun-500 object-cover object-top"
            />
          )}
        </div>
        {items.length > 1 && (
          <button type="button" aria-label="Next testimonial" onClick={() => go(1)} className={`${arrow} hidden sm:flex`}>
            <ArrowRightIcon className="size-6" />
          </button>
        )}
      </div>
      {items.length > 1 && (
        <div className="flex justify-center gap-4 pb-8 sm:hidden">
          <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)} className={arrow}>
            <ArrowLeftIcon className="size-6" />
          </button>
          <button type="button" aria-label="Next testimonial" onClick={() => go(1)} className={arrow}>
            <ArrowRightIcon className="size-6" />
          </button>
        </div>
      )}
    </section>
  )
}
