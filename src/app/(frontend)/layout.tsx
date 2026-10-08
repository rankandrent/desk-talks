import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SITE_URL } from '@/lib/payload'
import { getSettings } from '@/lib/queries'
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/seo'

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

export const metadata: Metadata = {
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

export const viewport: Viewport = {
  themeColor: '#ffd62d',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()

  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer social={settings.social} />
      </body>
    </html>
  )
}
