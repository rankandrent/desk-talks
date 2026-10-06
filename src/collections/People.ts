import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../access'

export const People: CollectionConfig = {
  slug: 'people',
  labels: { singular: 'Person', plural: 'Hosts & Guests' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'designation', 'company'],
    group: 'Content',
    description: 'Podcast hosts, guests aur blog authors. Ek dafa add karein, har jagah select karein.',
  },
  access: {
    read: anyone,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'designation', type: 'text', admin: { description: 'e.g. Co-founder & CEO' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'company', type: 'text' },
        { name: 'linkedin', type: 'text', admin: { description: 'LinkedIn profile URL' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'companyLogo', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'testimonial',
      type: 'textarea',
      admin: { description: 'Agar bhara ho to About page ke testimonials slider mein dikhega.' },
    },
  ],
}
