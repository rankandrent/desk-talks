/**
 * Fills empty dashboard fields of the page globals with the current website text,
 * so editors see (and can change) what is live. Never overwrites anything already filled.
 *
 *   pnpm fill-defaults          -> live Cloudflare database
 *   pnpm fill-defaults:local    -> local database
 */
import config from '@payload-config'
import { getPayload, type GlobalSlug } from 'payload'

import { DEFAULTS } from '../content/defaults'

type Plain = Record<string, unknown>

const isEmpty = (value: unknown) =>
  value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)

/** Copy defaults into `current` wherever `current` is empty; returns only the changed keys. */
const fill = (current: Plain | undefined, defaults: Plain): Plain | undefined => {
  const changes: Plain = {}
  for (const [key, def] of Object.entries(defaults)) {
    const value = current?.[key]
    if (Array.isArray(def)) {
      if (isEmpty(value)) changes[key] = def.map((item) => ({ ...(item as Plain) }))
    } else if (def && typeof def === 'object') {
      const nested = fill(value as Plain | undefined, def as Plain)
      if (nested) changes[key] = { ...((value as Plain) ?? {}), ...nested }
    } else if (isEmpty(value)) {
      changes[key] = def
    }
  }
  return Object.keys(changes).length ? changes : undefined
}

const D = DEFAULTS
const plan: { slug: GlobalSlug; defaults: Plain }[] = [
  {
    slug: 'site-settings',
    defaults: {
      header: D.header,
      footer: D.footer,
      community: D.community,
      subscribe: D.subscribe,
      seo: { defaultDescription: D.seo.defaultDescription },
    },
  },
  {
    slug: 'home-page',
    defaults: { hero: D.home.hero, podcasts: D.home.podcasts, blogs: D.home.blogs, contact: D.home.contact, meta: D.home.seo },
  },
  {
    slug: 'about-page',
    defaults: { hero: D.about.hero, whatWeDo: D.about.whatWeDo, vision: D.about.vision, meta: D.about.seo },
  },
  {
    slug: 'podcasts-page',
    defaults: { hero: D.podcasts.hero, moreHeading: D.podcasts.moreHeading, loadMoreLabel: D.podcasts.loadMoreLabel, meta: D.podcasts.seo },
  },
  {
    slug: 'blogs-page',
    defaults: { hero: D.blogs.hero, moreHeading: D.blogs.moreHeading, loadMoreLabel: D.blogs.loadMoreLabel, meta: D.blogs.seo },
  },
  { slug: 'join-pages', defaults: { banner: D.join.banner, guest: D.join.guest, host: D.join.host } },
]

const payload = await getPayload({ config })

for (const { slug, defaults } of plan) {
  const current = (await payload.findGlobal({ slug, depth: 0 })) as unknown as Plain
  const changes = fill(current, JSON.parse(JSON.stringify(defaults)))
  if (!changes) {
    console.log(`= ${slug}: already filled`)
    continue
  }
  await payload.updateGlobal({ slug, data: changes, depth: 0, context: { skipImageSizeCheck: true } })
  console.log(`+ ${slug}: filled ${Object.keys(changes).join(', ')}`)
}
process.exit(0)
