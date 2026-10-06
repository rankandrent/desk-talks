import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps) => ({
  'aria-hidden': true,
  focusable: false,
  ...props,
})

export const YouTubeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
  </svg>
)

export const SpotifyIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" {...base(props)}>
    <path d="M4 8.6c5-1.6 11-1.2 16 1.4M5 12.6c4.2-1.2 9-.8 13 1.2M6 16.4c3.4-.9 7-.6 10 .9" />
  </svg>
)

export const SoundCloudIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
    <path d="M1 13.5h1v3.5H1zM3 12h1v5H3zM5 11h1v6H5zM7 10h1v7H7zM9 9.2h1V17H9zM11 8.4c.5-.3 1.1-.4 1.7-.4a5 5 0 0 1 4.9 4 3 3 0 1 1 .9 5.9H11V8.4Z" />
  </svg>
)

export const LinkedInIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v5.46h-4v-4.84c0-1.16-.02-2.64-1.6-2.64-1.62 0-1.86 1.26-1.86 2.56v4.92h-4v-11Z" />
  </svg>
)

export const InstagramIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...base(props)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const FacebookIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
    <path d="M14 8.5V6.6c0-.8.2-1.3 1.4-1.3H17V2.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.6v3.4h2.7V22H14v-10.1h2.7l.4-3.4H14Z" />
  </svg>
)

export const XIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
    <path d="M17.8 3h3.1l-6.8 7.7 8 10.3h-6.2l-4.9-6.3L5.4 21H2.3l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" />
  </svg>
)

export const ArrowUpRightIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...base(props)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const ArrowRightIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...base(props)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const ArrowLeftIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" {...base(props)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
)

export const SearchIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...base(props)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

export const PlayIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...base(props)}>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
)

export const PlusIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" {...base(props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const MenuIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...base(props)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const CloseIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...base(props)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const LinkIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...base(props)}>
    <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
  </svg>
)

/* "Summarize with AI" assistant marks (simplified) */
export const ChatGPTIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" {...base(props)}>
    <path d="M12 3.2 19.6 7.6v8.8L12 20.8 4.4 16.4V7.6L12 3.2Z" />
    <path d="M12 3.2v8.8m0 0 7.6 4.4M12 12l-7.6 4.4" />
  </svg>
)

export const GeminiIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" {...base(props)}>
    <defs>
      <linearGradient id="gem" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4285f4" />
        <stop offset="1" stopColor="#d96570" />
      </linearGradient>
    </defs>
    <path fill="url(#gem)" d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10Z" />
  </svg>
)

export const ClaudeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth={2.2} strokeLinecap="round" {...base(props)}>
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4M7.5 3.8l9 16.4M16.5 3.8l-9 16.4" />
  </svg>
)

export const PerplexityIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#20808d" strokeWidth={1.6} strokeLinejoin="round" {...base(props)}>
    <path d="M12 2v20M5 7l7 5 7-5M5 7v6l7-1 7 1V7M5 13v5l7-6 7 6v-5M3 7h18" />
  </svg>
)
