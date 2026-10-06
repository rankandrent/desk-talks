import { cn } from '@/lib/utils'

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
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
