import Link from 'next/link'

import type { Post } from '@/payload-types'
import { categoryOf, formatDate, mediaAlt, mediaUrl } from '@/lib/utils'

import { ArrowRightIcon } from './icons'

export function BlogCard({ post }: { post: Post }) {
  const category = categoryOf(post.category)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[18px] bg-white p-[9px] pb-0 font-inter shadow-[0_1px_6px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)]">
      <div className="aspect-[351/201] overflow-hidden rounded-t-[10px] bg-ink-100">
        {mediaUrl(post.featuredImage) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mediaUrl(post.featuredImage)}
            alt={mediaAlt(post.featuredImage, post.title)}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col px-4 pt-4 pb-6">
        <div className="flex items-center justify-between gap-3">
          {category && <span className="chip px-3.5 py-1.5 text-[11px] normal-case">{category.name}</span>}
          <time className="text-[12px] text-ink-500" dateTime={post.publishedAt ?? undefined}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <h3 className="mt-5 line-clamp-2 text-[20px] leading-[1.4] text-black">
          <Link href={`/blogs/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-4 text-[16px] leading-[1.4] text-ink-700">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-sun-700">
          Read More <ArrowRightIcon className="size-3.5" />
        </span>
      </div>
    </article>
  )
}
