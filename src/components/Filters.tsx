import Link from 'next/link'

import type { Category } from '@/payload-types'
import { cn } from '@/lib/utils'

import { SearchIcon } from './icons'

/** Category chips + search; plain links/GET form so it works without JS and is crawlable. */
export function Filters({
  basePath,
  categories,
  active,
  search,
}: {
  basePath: string
  categories: Category[]
  active?: string
  search?: string
}) {
  const href = (slug?: string) => {
    const params = new URLSearchParams()
    if (slug) params.set('category', slug)
    if (search) params.set('q', search)
    const qs = params.toString()
    return qs ? `${basePath}?${qs}` : basePath
  }

  const chip = (isActive: boolean) =>
    cn(
      'shrink-0 rounded-[3px] border px-5 py-2 font-inter text-[12px] transition-colors',
      isActive ? 'border-sun-500 bg-sun-500 text-black' : 'border-ink-700 bg-white text-black hover:bg-sun-50',
    )

  return (
    <div className="container-site flex flex-col items-center gap-4 lg:flex-row lg:justify-center lg:gap-[22px]">
      <nav aria-label="Categories" className="no-scrollbar flex max-w-full gap-[22px] overflow-x-auto pb-1">
        <Link href={href()} className={chip(!active)} scroll={false}>
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={href(category.slug ?? undefined)}
            className={chip(active === category.slug)}
            scroll={false}
          >
            {category.name}
          </Link>
        ))}
      </nav>
      <form action={basePath} className="relative w-full max-w-[252px]" role="search">
        {active && <input type="hidden" name="category" value={active} />}
        <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-700" />
        <input
          type="search"
          name="q"
          defaultValue={search}
          placeholder="Search"
          aria-label="Search"
          className="h-[35px] w-full rounded-[3px] border border-ink-700 pr-3 pl-10 font-inter text-[13px] outline-none focus:border-sun-700"
        />
      </form>
    </div>
  )
}
