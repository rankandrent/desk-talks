'use server'

import { getPayloadClient } from '@/lib/payload'

export type FormState = { ok: boolean; message: string } | null

const text = (data: FormData, key: string) => String(data.get(key) ?? '').trim()

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitEnquiry(_prev: FormState, data: FormData): Promise<FormState> {
  // Honeypot: real visitors never fill this hidden field.
  if (text(data, 'website')) return { ok: true, message: 'Thanks! We will get back to you soon.' }

  const type = text(data, 'type')
  const entry = {
    type: (['contact', 'guest', 'host'].includes(type) ? type : 'contact') as 'contact' | 'guest' | 'host',
    fullName: text(data, 'fullName'),
    email: text(data, 'email'),
    phone: text(data, 'phone'),
    company: text(data, 'company'),
    linkedin: text(data, 'linkedin'),
    enquiry: text(data, 'enquiry'),
  }

  if (!entry.fullName || !entry.company || !entry.linkedin || !EMAIL.test(entry.email)) {
    return { ok: false, message: 'Please fill in all required fields with a valid email.' }
  }
  if (!data.get('terms') || !data.get('consent')) {
    return { ok: false, message: 'Please accept the terms and consent to be contacted.' }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({ collection: 'submissions', data: entry, overrideAccess: false })
    return { ok: true, message: 'Thanks! Our team will get back to you soon.' }
  } catch {
    return { ok: false, message: 'Something went wrong. Please try again.' }
  }
}

export async function subscribe(_prev: FormState, data: FormData): Promise<FormState> {
  const email = text(data, 'email').toLowerCase()
  if (!EMAIL.test(email)) return { ok: false, message: 'Please enter a valid email.' }

  try {
    const payload = await getPayloadClient()
    const existing = await payload.count({ collection: 'subscribers', where: { email: { equals: email } } })
    if (!existing.totalDocs) {
      await payload.create({ collection: 'subscribers', data: { email }, overrideAccess: false })
    }
    return { ok: true, message: 'You are subscribed. Welcome to DeskTalks!' }
  } catch {
    return { ok: false, message: 'Something went wrong. Please try again.' }
  }
}
