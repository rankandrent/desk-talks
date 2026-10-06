import type { CollectionBeforeChangeHook } from 'payload'

/** Fields whose change counts as a real content update for the "Last updated" date. */
const CONTENT_FIELDS = ['title', 'excerpt', 'content', 'faqs', 'featuredImage', 'category', 'author']

// Relationships (including uploads inside rich text) arrive either as an ID or as a populated
// document depending on depth; collapse populated docs to their ID so both hash the same.
const stableJSON = (value: unknown): string =>
  JSON.stringify(value, (_key, v) =>
    v && typeof v === 'object' && 'id' in v && 'createdAt' in v ? (v as { id: unknown }).id : v,
  )

// FNV-1a: small, fast and dependency-free; only used to detect changes.
const hash = (input: string): string => {
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(16)
}

/**
 * - `publishedAt` is set once, on first publish (editors can still change it manually).
 * - `contentUpdatedAt` only moves when a publish actually changes the content,
 *   so re-saving without edits keeps the old "Last updated" date.
 */
export const setPublishDates: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  const previousHash: string | undefined = originalDoc?.publishedHash

  if (data._status !== 'published') {
    data.publishedHash = previousHash
    return data
  }

  const now = new Date().toISOString()
  const merged = { ...originalDoc, ...data }
  const currentHash = hash(stableJSON(CONTENT_FIELDS.map((field) => merged[field] ?? null)))

  if (!merged.publishedAt) data.publishedAt = now

  if (!previousHash) {
    data.contentUpdatedAt = data.publishedAt ?? merged.publishedAt
  } else if (previousHash !== currentHash) {
    data.contentUpdatedAt = now
  }

  data.publishedHash = currentHash
  return data
}
