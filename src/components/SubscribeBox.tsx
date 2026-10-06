'use client'

import { useActionState } from 'react'

import { subscribe } from '@/app/(frontend)/actions'
import { cn } from '@/lib/utils'

export function SubscribeBox() {
  const [state, action, pending] = useActionState(subscribe, null)

  return (
    <section className="container-site">
      <div className="mx-auto max-w-[1017px] rounded-[8px] bg-sun-600 px-6 py-12 text-center sm:py-14">
        <h2 className="mx-auto max-w-[640px] text-2xl leading-[1.3] font-medium text-black sm:text-[30px]">
          Subscribe to get the latest news, trends, and expert insights in AI, tech, and leadership.
        </h2>
        <form action={action} className="mx-auto mt-6 flex max-w-[372px] flex-col gap-2 sm:flex-row">
          <label htmlFor="subscribe-email" className="sr-only">
            Email
          </label>
          <input
            id="subscribe-email"
            name="email"
            type="email"
            required
            placeholder="Enter Email..."
            className="h-[38px] flex-1 rounded-[3px] border border-ink-700 bg-transparent px-3 text-[17px] text-black outline-none placeholder:text-ink-700/80 focus:border-black"
          />
          <button
            type="submit"
            disabled={pending}
            className="h-[38px] rounded-[3px] bg-teal-800 px-[18px] text-[17px] text-white transition-colors hover:bg-teal-900 disabled:opacity-60"
          >
            {pending ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
        {state && (
          <p role="status" className={cn('mt-3 text-sm', state.ok ? 'text-teal-900' : 'text-red-700')}>
            {state.message}
          </p>
        )}
      </div>
    </section>
  )
}
