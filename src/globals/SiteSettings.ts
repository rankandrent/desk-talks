import type { GlobalConfig } from 'payload'

import { anyone, isStaff } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  access: {
    read: anyone,
    update: isStaff,
  },
  fields: [
    {
      name: 'partnerLogos',
      type: 'array',
      label: 'Community Logos',
      admin: { description: '"The DeskTalk community is growing!" section ke company logos.' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'logo', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'youtube', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'soundcloud', type: 'text' },
        { name: 'spotify', type: 'text' },
      ],
    },
    {
      name: 'blogCta',
      type: 'group',
      label: 'Blog Sidebar CTA',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Looking for the Right Experts for Your Project?' },
        {
          name: 'text',
          type: 'textarea',
          defaultValue:
            'Access a global network of industry specialists and tailored primary research services to uncover the insights needed to move your project forward.',
        },
        { name: 'buttonLabel', type: 'text', defaultValue: 'Launch a project' },
        { name: 'buttonUrl', type: 'text', defaultValue: '/contact' },
      ],
    },
  ],
}
