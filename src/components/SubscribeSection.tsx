import { DEFAULTS, or } from '@/content/defaults'
import { getSettings } from '@/lib/queries'

import { SubscribeBox } from './SubscribeBox'

/** Subscribe box with its text from Site Settings → Shared Sections. */
export async function SubscribeSection() {
  const s = (await getSettings()).subscribe
  const D = DEFAULTS.subscribe
  return (
    <SubscribeBox
      heading={or(s?.heading, D.heading)}
      placeholder={or(s?.placeholder, D.placeholder)}
      buttonLabel={or(s?.buttonLabel, D.buttonLabel)}
      successMessage={or(s?.successMessage, D.successMessage)}
    />
  )
}
