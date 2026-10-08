import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SITE_URL } from '@/lib/payload'
import { getSettings } from '@/lib/queries'
import { DEFAULTS, or } from '@/content/defaults'
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/seo'
import { mediaUrl } from '@/lib/utils'

import './styles.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--next-font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--next-font-inter',
  display: 'swap',
})

const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DeskTalks | Where Expert Conversations Become Community',
    template: '%s | DeskTalks',
  },
  description:
    'Discover expert insights through podcasts, connect with a global community, and join conversations with the leaders shaping the future of tech.',
  applicationName: SITE_NAME,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    types: { 'application/rss+xml': [{ url: '/feed.xml', title: 'DeskTalks Blogs' }] },
  },
  openGraph: { siteName: SITE_NAME, type: 'website', locale: 'en_US', images: [DEFAULT_OG_IMAGE] },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE] },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  formatDetection: { telephone: false },
}

// Default description and share image come from Site Settings → SEO Defaults.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const image = mediaUrl(settings.seo?.shareImage)
  const images = [image ? { url: image } : DEFAULT_OG_IMAGE]
  return {
    ...baseMetadata,
    description: or(settings.seo?.defaultDescription, DEFAULTS.seo.defaultDescription),
    openGraph: { ...baseMetadata.openGraph, images },
    twitter: { ...baseMetadata.twitter, images },
  }
}

export const viewport: Viewport = {
  themeColor: '#ffd62d',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()

  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <Header
          nav={settings.header?.nav?.length ? settings.header.nav : [...DEFAULTS.header.nav]}
          ctaLabel={or(settings.header?.ctaLabel, DEFAULTS.header.ctaLabel)}
          ctaLink={or(settings.header?.ctaLink, DEFAULTS.header.ctaLink)}
          logo={mediaUrl(settings.header?.logo)}
        />
        <main>{children}</main>
        <Footer
          social={settings.social}
          links={settings.footer?.links?.length ? settings.footer.links : [...DEFAULTS.footer.links]}
          bottomLinks={settings.footer?.bottomLinks?.length ? settings.footer.bottomLinks : [...DEFAULTS.footer.bottomLinks]}
          copyright={or(settings.footer?.copyright, DEFAULTS.footer.copyright)}
          logo={mediaUrl(settings.footer?.logo)}
        />
      </body>
    </html>
  )
}
