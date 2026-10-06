import type { AfterErrorHook, CollectionConfig } from 'payload'

import { isAdmin } from '../access'

/** Server errors saved to the database, because live Worker logs are not always reachable. */
export const ErrorLogs: CollectionConfig = {
  slug: 'error-logs',
  admin: {
    useAsTitle: 'message',
    defaultColumns: ['message', 'path', 'createdAt'],
    group: 'Settings',
  },
  access: {
    read: isAdmin,
    create: () => false,
    update: () => false,
    delete: isAdmin,
  },
  fields: [
    { name: 'message', type: 'text' },
    { name: 'path', type: 'text' },
    { name: 'status', type: 'number' },
    { name: 'stack', type: 'textarea' },
  ],
}

export const logErrorToDatabase: AfterErrorHook = async ({ error, req }) => {
  const status = (error as { status?: number }).status ?? 500
  if (status < 500) return
  try {
    await req.payload.create({
      collection: 'error-logs',
      overrideAccess: true,
      data: {
        message: String(error?.message ?? error).slice(0, 500),
        path: req.url?.slice(0, 300),
        status,
        stack: String(error?.stack ?? '').slice(0, 4000),
      },
    })
  } catch {
    // Never let logging break the original error response.
  }
}
