import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SITE_URL } from '@/lib/payload'
import { getSettings } from '@/lib/queries'

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
  icons: { icon: '/favicon.svg' },
  openGraph: { siteName: 'DeskTalks', type: 'website' },
  twitter: { card: 'summary_large_image' },
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
