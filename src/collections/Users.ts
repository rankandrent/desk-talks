import type { CollectionConfig } from 'payload'

import { adminOrSelf, isAdmin, isAdminField } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Settings',
  },
  auth: true,
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: isAdmin,
    delete: isAdmin,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        { label: 'Admin (sab kuch, users bhi)', value: 'admin' },
        { label: 'Editor (podcasts, blogs, categories)', value: 'editor' },
      ],
      access: {
        create: isAdminField,
        update: isAdminField,
      },
    },
  ],
}
