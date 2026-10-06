import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../access'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'createdAt'],
    group: 'Inbox',
  },
  access: {
    create: anyone,
    read: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [{ name: 'email', type: 'email', required: true, unique: true }],
}
