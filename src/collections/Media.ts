import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
  },
  access: {
    read: anyone,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Image ka chhota sa description (SEO aur accessibility ke liye).' },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    // These are not supported on Workers yet due to lack of sharp
    crop: false,
    focalPoint: false,
  },
}
