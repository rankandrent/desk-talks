import { cache } from 'react'
import type { Where } from 'payload'

import { getPayloadClient } from './payload'

export const PAGE_SIZE = 9

const released = (): Where => ({ releaseDate: { less_than_equal: new Date().toISOString() } })

export const getSettings = cache(async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', depth: 1 })
})

const pageGlobal = <S extends 'home-page' | 'about-page' | 'podcasts-page' | 'blogs-page' | 'join-pages'>(slug: S) =>
  cache(async () => {
    const payload = await getPayloadClient()
    return payload.findGlobal({ slug, depth: 1 })
  })

export const getHomePage = pageGlobal('home-page')
export const getAboutPage = pageGlobal('about-page')
export const getPodcastsPage = pageGlobal('podcasts-page')
export const getBlogsPage = pageGlobal('blogs-page')
export const getJoinPages = pageGlobal('join-pages')

export const getCategories = cache(async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'categories', limit: 100, sort: 'name', depth: 0 })
  return docs
})

export async function getPodcasts({
  category,
  search,
  limit = PAGE_SIZE,
  page = 1,
  exclude,
}: {
  category?: string
  search?: string
  limit?: number
  page?: number
  exclude?: number
} = {}) {
  const payload = await getPayloadClient()
  const and: Where[] = [released(), { _status: { equals: 'published' } }]
  if (category) and.push({ 'category.slug': { equals: category } })
  if (search) and.push({ title: { like: search } })
  if (exclude) and.push({ id: { not_equals: exclude } })

  return payload.find({
    collection: 'podcasts',
    where: { and },
    sort: '-releaseDate',
    limit,
    page,
    depth: 2,
  })
}

/** The nearest scheduled (future) episode, shown as "Next Episode". */
export async function getNextPodcast() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'podcasts',
    where: {
      and: [
        { releaseDate: { greater_than: new Date().toISOString() } },
        { _status: { equals: 'published' } },
      ],
    },
    sort: 'releaseDate',
    limit: 1,
    depth: 2,
  })
  return docs[0]
}

export async function getFeaturedPodcast() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'podcasts',
    where: { and: [released(), { featured: { equals: true } }, { _status: { equals: 'published' } }] },
    sort: '-releaseDate',
    limit: 1,
    depth: 2,
  })
  if (docs[0]) return docs[0]
  return (await getPodcasts({ limit: 1 })).docs[0]
}

export const getPodcastBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'podcasts',
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 2,
  })
  return docs[0]
})

export async function countPodcastsInCategory(categoryId: number) {
  const payload = await getPayloadClient()
  const { totalDocs } = await payload.count({
    collection: 'podcasts',
    where: {
      and: [released(), { category: { equals: categoryId } }, { _status: { equals: 'published' } }],
    },
  })
  return totalDocs
}

export async function getPosts({
  category,
  search,
  limit = PAGE_SIZE,
  page = 1,
  exclude,
}: {
  category?: string
  search?: string
  limit?: number
  page?: number
  exclude?: number
} = {}) {
  const payload = await getPayloadClient()
  const and: Where[] = [{ _status: { equals: 'published' } }]
  if (category) and.push({ 'category.slug': { equals: category } })
  if (search) and.push({ or: [{ title: { like: search } }, { excerpt: { like: search } }] })
  if (exclude) and.push({ id: { not_equals: exclude } })

  return payload.find({
    collection: 'posts',
    where: { and },
    sort: '-publishedAt',
    limit,
    page,
    depth: 1,
  })
}

export const getPostBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 2,
  })
  return docs[0]
})

export const getPageBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return docs[0]
})

export async function getTestimonials() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'people',
    where: { testimonial: { exists: true } },
    limit: 20,
    depth: 1,
  })
  return docs.filter((person) => person.testimonial?.trim())
}
