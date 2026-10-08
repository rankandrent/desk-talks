import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../access'
import { slugField } from '../fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
    group: 'Content',
    description: 'Podcasts aur blogs dono mein use hoti hain (AI, Design, Social...).',
  },
  access: {
    read: anyone,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description:
          'Optional. Category page (/podcasts?category=...) ke hero aur Google description mein dikhti hai (155 characters tak).',
      },
    },
    slugField('name'),
  ],
}
