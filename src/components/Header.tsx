'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { CloseIcon, MenuIcon } from './icons'
import { Logo } from './Logo'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/podcasts', label: 'Podcasts' },
  { href: '/blogs', label: 'Blogs' },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100/70 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[90px] max-w-[1280px] items-center justify-between px-4 sm:px-8 lg:pr-[82px] lg:pl-[47px]">
        <Link href="/" aria-label="DeskTalks home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-[50px] md:flex lg:ml-auto lg:mr-[126px]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm transition-colors hover:text-sun-700',
                isActive(item.href) ? 'text-sun-700' : 'text-black',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/#contact" className="btn-primary hidden px-[18px] text-[17px] md:inline-flex">
          Contact Us
        </Link>

        <button
          type="button"
          className="p-2 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink-100 bg-white px-4 pb-6 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'block border-b border-ink-100 py-3 text-base',
                isActive(item.href) ? 'text-sun-700' : 'text-black',
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn-primary mt-4 w-full">
            Contact Us
          </Link>
        </nav>
      )}
    </header>
  )
}
