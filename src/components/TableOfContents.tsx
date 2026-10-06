'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

export function TableOfContents({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-100px 0px -65% 0px' },
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav aria-label="In this article">
      <p className="border-b border-ink-900 pb-3 font-inter text-[24px] text-ink-900">In this Article</p>
      <ol className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                'block font-inter text-[13px] leading-snug transition-colors hover:text-sun-700',
                active === item.id ? 'text-sun-700' : 'text-ink-800',
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
