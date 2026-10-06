import type { Category, Media, Person } from '@/payload-types'

type Rel<T> = number | T | null | undefined

/** Narrow a populated relationship; returns undefined when only the ID came back. */
export const populated = <T extends object>(value: Rel<T>): T | undefined =>
  value && typeof value === 'object' ? value : undefined

export const mediaUrl = (value: Rel<Media>): string | undefined => populated(value)?.url ?? undefined

export const mediaAlt = (value: Rel<Media>, fallback = ''): string =>
  populated(value)?.alt ?? fallback

export const categoryOf = (value: Rel<Category>) => populated(value)

export const personOf = (value: Rel<Person>) => populated(value)

export const formatDate = (value?: string | null): string =>
  value
    ? new Date(value).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : ''

export const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ')
