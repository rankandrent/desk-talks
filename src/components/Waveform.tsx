import { cn } from '@/lib/utils'

/**
 * Decorative audio waveform from the Figma "Vectors" board.
 * Deterministic bar heights so server and client render identically.
 */
export function Waveform({
  bars = 160,
  className,
  barClassName = 'bg-white',
}: {
  bars?: number
  className?: string
  barClassName?: string
}) {
  const heights = Array.from({ length: bars }, (_, i) => {
    const wave = Math.sin(i / 3.1) * 0.5 + 0.5
    const envelope = Math.sin(i / 11) * 0.5 + 0.5
    return 30 + Math.round(70 * wave * envelope)
  })

  return (
    <div aria-hidden className={cn('flex items-end justify-between gap-[3px] overflow-hidden', className)}>
      {heights.map((h, i) => (
        <span key={i} className={cn('w-[2px] shrink-0 rounded-full', barClassName)} style={{ height: `${h}%` }} />
      ))}
    </div>
  )
}
