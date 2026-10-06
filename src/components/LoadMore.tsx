import Link from 'next/link'

/** "Load more" as a plain link (?page=n shows n pages of results) so crawlers can follow it. */
export function LoadMore({
  basePath,
  page,
  hasMore,
  params,
  label,
}: {
  basePath: string
  page: number
  hasMore: boolean
  params: Record<string, string | undefined>
  label: string
}) {
  if (!hasMore) return null
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => value && query.set(key, value))
  query.set('page', String(page + 1))

  return (
    <div className="mt-8 text-center">
      <Link href={`${basePath}?${query}`} scroll={false} className="btn-outline px-[17px] py-2 font-inter text-[13px]">
        {label}
      </Link>
    </div>
  )
}
