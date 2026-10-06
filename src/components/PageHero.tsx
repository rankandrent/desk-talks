import type { ReactNode } from 'react'

import { Waveform } from './Waveform'

export function PageHero({
  title,
  description,
  waveform = false,
}: {
  title: ReactNode
  description?: ReactNode
  waveform?: boolean
}) {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="container-site relative z-10 py-20 text-center sm:py-[110px]">
        <h1 className="mx-auto max-w-[800px] text-[36px] leading-[1.2] font-semibold text-ink-900 sm:text-[50px]">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-[620px] font-inter text-[16px] leading-[1.4] text-black">{description}</p>
        )}
      </div>
      {waveform && <Waveform className="absolute inset-x-0 bottom-0 h-[84px] px-2" bars={220} />}
    </section>
  )
}
