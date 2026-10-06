import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../access'
import { slugField } from '../fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Legal Page', plural: 'Legal Pages' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Content',
    description: 'Privacy Policy, Terms & Conditions jaise simple text pages.',
  },
  access: {
    read: anyone,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'content', type: 'richText', required: true },
          ],
        },
      ],
    },
    slugField('title'),
  ],
}
