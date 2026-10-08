import fs from 'fs'
import path from 'path'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { buildConfig, type CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'

import { YouTubeBlock } from './blocks/YouTube'
import { Categories } from './collections/Categories'
import { ErrorLogs, logErrorToDatabase } from './collections/ErrorLogs'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { People } from './collections/People'
import { Podcasts } from './collections/Podcasts'
import { Posts } from './collections/Posts'
import { Submissions } from './collections/Submissions'
import { Subscribers } from './collections/Subscribers'
import { Users } from './collections/Users'
import { AboutPage, BlogsPage, HomePage, JoinPages, PodcastsPage } from './globals/Pages'
import { SiteSettings } from './globals/SiteSettings'
import { revalidateAfterChange, revalidateAfterDelete, revalidateGlobal } from './hooks/revalidate'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => {
  try {
    return fs.existsSync(value) ? fs.realpathSync(value) : undefined
  } catch {
    return undefined
  }
}

const isCLI = process.argv.some((value) => {
  const resolved = realpath(value)
  if (!resolved) return false
  return (
    resolved.endsWith(path.join('payload', 'bin.js')) ||
    resolved.endsWith(path.join('next', 'dist', 'bin', 'next'))
  )
})
const isProduction = process.env.NODE_ENV === 'production'

const createLog =
  (level: string, fn: typeof console.log) => (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === 'string') {
      fn(JSON.stringify({ level, msg: objOrMsg }))
    } else {
      fn(JSON.stringify({ level, ...objOrMsg, msg: msg ?? (objOrMsg as { msg?: string }).msg }))
    }
  }

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || 'info',
  trace: createLog('trace', console.debug),
  debug: createLog('debug', console.debug),
  info: createLog('info', console.log),
  warn: createLog('warn', console.warn),
  error: createLog('error', console.error),
  fatal: createLog('fatal', console.error),
  silent: () => {},
} as any // Use PayloadLogger type when it's exported

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

// Collections shown on the public site: changing them clears the page cache.
const withRevalidation = <T extends CollectionConfig>(collection: T): T => ({
  ...collection,
  hooks: {
    ...collection.hooks,
    afterChange: [...(collection.hooks?.afterChange ?? []), revalidateAfterChange],
    afterDelete: [...(collection.hooks?.afterDelete ?? []), revalidateAfterDelete],
  },
})

const siteUrl = process.env.SITE_URL || 'http://localhost:3000'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' | DeskTalks Dashboard',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' }],
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo#Logo',
        Icon: '/components/admin/Icon#Icon',
      },
    },
  },
  collections: [
    ...[Podcasts, Posts, Categories, People, Media, Pages].map(withRevalidation),
    Submissions,
    Subscribers,
    Users,
    ErrorLogs,
  ],
  hooks: {
    afterError: [logErrorToDatabase],
  },
  globals: [HomePage, AboutPage, PodcastsPage, BlogsPage, JoinPages, SiteSettings].map((global) => ({
    ...global,
    hooks: { ...global.hooks, afterChange: [...(global.hooks?.afterChange ?? []), revalidateGlobal] },
  })),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures.filter((feature) => feature.key !== 'heading'),
      HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
      FixedToolbarFeature(),
      BlocksFeature({ blocks: [YouTubeBlock] }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
  logger: isProduction ? cloudflareLogger : undefined,
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
    seoPlugin({
      collections: ['posts', 'podcasts', 'pages'],
      globals: ['home-page', 'about-page', 'podcasts-page', 'blogs-page'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => (doc?.title ? `${doc.title} | DeskTalks` : 'DeskTalks'),
      generateDescription: ({ doc }) => doc?.excerpt || '',
      generateURL: ({ doc, collectionSlug, globalSlug }) => {
        if (globalSlug) {
          const paths: Record<string, string> = { 'home-page': '', 'about-page': 'about', 'podcasts-page': 'podcasts', 'blogs-page': 'blogs' }
          return `${siteUrl}/${paths[globalSlug] ?? ''}`
        }
        const base = collectionSlug === 'posts' ? 'blogs' : collectionSlug === 'podcasts' ? 'podcasts' : ''
        return `${siteUrl}/${base ? `${base}/` : ''}${doc?.slug ?? ''}`
      },
    }),
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
