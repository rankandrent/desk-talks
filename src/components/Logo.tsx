import { cn } from '@/lib/utils'

export function Logo({
  className,
  inverted = false,
  src,
}: {
  className?: string
  inverted?: boolean
  /** Uploaded logo from Site Settings; falls back to the text logo. */
  src?: string
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="DeskTalks" className={cn('h-10 w-auto max-w-[160px] object-contain', className)} />
  }
  return (
    <span
      className={cn(
        'inline-flex flex-col font-sans text-[19px] leading-[1.05] font-medium tracking-wide',
        className,
      )}
    >
      <span className={inverted ? 'text-white' : 'text-black'}>DESK</span>
      <span className={inverted ? 'text-white' : 'text-sun-500'}>TALKS.</span>
    </span>
  )
}
