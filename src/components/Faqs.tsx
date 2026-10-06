import type { Post } from '@/payload-types'

import { PlusIcon } from './icons'

export function Faqs({ faqs }: { faqs: NonNullable<Post['faqs']> }) {
  if (!faqs.length) return null

  return (
    <section className="mt-10 font-inter" aria-labelledby="faqs">
      <h2 id="faqs" className="scroll-mt-28 text-[24px] text-black">
        Frequently Asked Questions
      </h2>
      <div className="mt-4 max-w-[560px] space-y-4">
        {faqs.map((faq, i) => (
          <details key={faq.id ?? i} open={i === 0} className="group rounded-[8px] bg-ink-50 px-5 py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-semibold text-ink-800 [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <span className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-sun-600 text-black transition-transform group-open:rotate-45">
                <PlusIcon className="size-4" />
              </span>
            </summary>
            <p className="mt-4 max-w-[440px] leading-[1.4] text-ink-700">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
