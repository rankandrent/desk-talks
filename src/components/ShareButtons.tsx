'use client'

import { useState } from 'react'

import { FacebookIcon, LinkedInIcon, LinkIcon, XIcon } from './icons'

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)

  const links = [
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon },
    { label: 'X', href: `https://x.com/intent/post?url=${u}&text=${t}`, Icon: XIcon },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedInIcon },
  ]

  const btn =
    'flex size-10 items-center justify-center rounded-[3px] bg-gradient-to-b from-sun-600 to-sun-700 text-black transition-transform hover:-translate-y-0.5'

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="mr-1 font-inter text-[24px] font-light text-ink-800">Share on:</span>
      {links.map(({ label, href, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`} className={btn}>
          <Icon className="size-[18px]" />
        </a>
      ))}
      <button
        type="button"
        aria-label="Copy link"
        className={btn}
        onClick={async () => {
          await navigator.clipboard.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
      >
        <LinkIcon className="size-[18px]" />
      </button>
      {copied && <span className="text-sm text-teal-700">Link copied!</span>}
    </div>
  )
}
