import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Pages are cached (ISR). Any content change can appear on many pages (cards, "Explore more",
 * category counts, footer links), so the whole site cache is cleared; it is small and rebuilds
 * on the next visit.
 */
const purgeSite = async (reason: string) => {
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    // Outside a Next.js request (seed / CLI scripts) there is no cache to clear.
    if (process.env.NODE_ENV === 'development') console.info(`[revalidate] skipped: ${reason}`)
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc, collection, req }) => {
  if (!req.context?.skipRevalidate) await purgeSite(`${collection.slug} ${doc?.id}`)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, collection, req }) => {
  if (!req.context?.skipRevalidate) await purgeSite(`${collection.slug} ${doc?.id} deleted`)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, global }) => {
  await purgeSite(global.slug)
  return doc
}
