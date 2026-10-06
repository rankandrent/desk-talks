import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  // Packages with Cloudflare Workers (workerd) specific code
  // Read more: https://opennext.js.org/cloudflare/howtos/workerd
  serverExternalPackages: ['jose', 'pg-cloudflare'],

  // Build pages with one worker: parallel workers each start a Wrangler proxy and lock its
  // local SQLite state (SQLITE_BUSY), which randomly fails `next build`.
  experimental: { cpus: 1 },

  // Old query-string join URLs -> dedicated, indexable pages
  async redirects() {
    return [
      {
        source: '/join',
        has: [{ type: 'query', key: 'type', value: 'host' }],
        destination: '/join-as-host',
        permanent: true,
      },
      { source: '/join', destination: '/join-as-guest', permanent: true },
      // Public sign-up is disabled: admins are created with `pnpm create-admin`.
      { source: '/admin/create-first-user', destination: '/admin/login', permanent: false },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
