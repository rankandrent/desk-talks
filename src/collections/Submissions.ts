import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../access'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  labels: { singular: 'Form Entry', plural: 'Form Entries' },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'type', 'email', 'company', 'createdAt'],
    group: 'Inbox',
  },
  access: {
    create: anyone,
    read: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'contact',
      options: [
        { label: 'Contact', value: 'contact' },
        { label: 'Join as Guest', value: 'guest' },
        { label: 'Join as Host', value: 'host' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'fullName', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text' },
        { name: 'company', type: 'text', required: true },
      ],
    },
    { name: 'linkedin', type: 'text', required: true },
    { name: 'enquiry', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: ['new', 'contacted', 'closed'],
      admin: { position: 'sidebar' },
    },
  ],
}
