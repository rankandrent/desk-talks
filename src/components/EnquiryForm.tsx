'use client'

import Link from 'next/link'
import { useActionState } from 'react'

import { submitEnquiry } from '@/app/(frontend)/actions'
import { cn } from '@/lib/utils'

const Field = ({
  label,
  name,
  type = 'text',
  required,
  className,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  className?: string
}) => (
  <label className={cn('flex flex-col gap-2', className)}>
    <span className="text-[17px] text-ink-700">
      {label}
      {required && ' *'}
    </span>
    <input name={name} type={type} required={required} className="field h-12" />
  </label>
)

export function EnquiryForm({
  type,
  joinPrompt,
  joinLinkLabel,
}: {
  type: 'contact' | 'guest' | 'host'
  /** When set, shows "<joinPrompt> <joinLinkLabel>" under the button (homepage contact form). */
  joinPrompt?: string
  joinLinkLabel?: string
}) {
  const [state, action, pending] = useActionState(submitEnquiry, null)

  if (state?.ok) {
    return (
      <div className="rounded-md bg-sun-50 p-8 text-center">
        <p className="text-xl font-medium">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} className="grid gap-x-2 gap-y-5 sm:grid-cols-2">
      <input type="hidden" name="type" value={type} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <Field label="Full name" name="fullName" required />
      <Field label="E-mail" name="email" type="email" required />
      <Field label="Phone Number" name="phone" type="tel" />
      <Field label="Company" name="company" required />
      <Field label="Linkedin" name="linkedin" type="url" required className="sm:col-span-2" />
      <label className="flex flex-col gap-2 sm:col-span-2">
        <span className="text-[17px] text-ink-700">Enquiry</span>
        <textarea name="enquiry" rows={5} className="field resize-y" />
      </label>

      <div className="space-y-2 text-[13px] text-ink-700 sm:col-span-2">
        <label className="flex items-center gap-2.5">
          <input type="checkbox" name="terms" required className="size-3.5 accent-sun-700" />
          <span>
            I accept the{' '}
            <Link href="/terms-and-conditions" className="underline-offset-2 hover:underline">
              Terms of Use
            </Link>{' '}
            and have read the{' '}
            <Link href="/privacy-policy" className="underline-offset-2 hover:underline">
              Privacy Policy
            </Link>{' '}
            of Desktalks.
          </span>
        </label>
        <label className="flex items-center gap-2.5">
          <input type="checkbox" name="consent" required className="size-3.5 accent-sun-700" />
          <span>I consent to the collection and use of my data for the purpose of contacting me.</span>
        </label>
      </div>

      {state && !state.ok && (
        <p role="alert" className="text-sm text-red-700 sm:col-span-2">
          {state.message}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className={cn('btn-primary text-[16px] disabled:opacity-60', type === 'contact' ? 'w-full' : 'px-[14px]')}
        >
          {pending ? 'Sending…' : 'Submit'}
        </button>
        {joinPrompt && (
          <p className="mt-4 text-[17px] text-ink-700">
            {joinPrompt}{' '}
            <Link href="/join-as-guest" className="font-semibold text-teal-700 hover:underline">
              {joinLinkLabel}
            </Link>
          </p>
        )}
      </div>
    </form>
  )
}
