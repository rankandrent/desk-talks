import type { Person } from '@/payload-types'
import { mediaUrl } from '@/lib/utils'

import { LinkedInIcon } from './icons'

export function PersonCard({ label, person }: { label: string; person: Person }) {
  const logo = mediaUrl(person.companyLogo)

  return (
    <div className="rounded-[7px] border border-ink-900 px-4 py-4">
      <p className="text-[20px] font-medium text-ink-700 underline underline-offset-4">{label}</p>
      <p className="mt-3 flex items-center gap-1.5 text-[17px] font-semibold text-ink-800">
        {person.name}
        {person.linkedin && (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${person.name} on LinkedIn`}
            className="flex size-[25px] items-center justify-center rounded-full bg-[#0a66c2] text-white"
          >
            <LinkedInIcon className="size-3.5" />
          </a>
        )}
      </p>
      {person.designation && <p className="mt-1 text-[16px] leading-snug text-ink-700">{person.designation}</p>}
      {logo ? (
        <span className="mt-3 inline-flex h-9 items-center rounded-[3px] bg-ink-100 px-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt={person.company ?? ''} className="h-5 w-auto max-w-[130px] object-contain" />
        </span>
      ) : (
        person.company && <p className="mt-2 text-sm text-ink-500">{person.company}</p>
      )}
    </div>
  )
}
