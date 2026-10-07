import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../access'
import { imageField } from '../fields/image'

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
        imageField({
          name: 'photo',
          size: [800, 900],
          minWidth: 400,
          hint: 'Portrait (lambi) photo, chehra upar beech mein, JPG/WebP. Testimonials aur author box mein isi shape mein katti hai.',
        }),
        imageField({
          name: 'companyLogo',
          size: [400, 120],
          minWidth: 150,
          hint: 'Transparent PNG ya SVG, logo ke aas paas khali jagah na ho. Cards par 22px oonchai mein dikhta hai.',
        }),
      ],
    },
    {
      name: 'testimonial',
      type: 'textarea',
      admin: { description: 'Agar bhara ho to About page ke testimonials slider mein dikhega.' },
    },
  ],
}
