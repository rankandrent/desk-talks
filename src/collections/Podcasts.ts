import type { CollectionConfig } from 'payload'

import { isStaff, publishedOrStaff } from '../access'
import { imageField } from '../fields/image'
import { slugField } from '../fields/slug'

export const Podcasts: CollectionConfig = {
  slug: 'podcasts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'releaseDate', '_status'],
    group: 'Content',
    description:
      'Release date future mein ho to episode website par "Next Episode" ban kar dikhega, aur us din se list mein aa jayega.',
    preview: (doc) => (doc?.slug ? `/podcasts/${doc.slug}` : null),
  },
  versions: {
    drafts: true,
    maxPerDoc: 25,
  },
  defaultSort: '-releaseDate',
  access: {
    read: publishedOrStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Episode',
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'summary',
              type: 'richText',
              label: 'Episode Summary',
            },
            {
              name: 'excerpt',
              type: 'textarea',
              admin: { description: 'Short description, cards aur Google ke liye (1–2 lines).' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'host',
                  type: 'relationship',
                  relationTo: 'people',
                },
                {
                  name: 'guests',
                  type: 'relationship',
                  relationTo: 'people',
                  hasMany: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Media & Links',
          fields: [
            imageField({
              name: 'thumbnail',
              required: true,
              size: [1280, 440],
              minWidth: 640,
              hint: 'Wide banner, JPG/WebP. Podcast cards aur Next Episode banner mein isi shape mein dikhta hai.',
            }),
            imageField({
              name: 'heroImage',
              size: [1240, 850],
              minWidth: 620,
              hint: 'Optional. Single podcast page banner ka right hissa: host + guest, neeche se kate hue, JPG/WebP. Khali ho to thumbnail use hoga.',
            }),
            {
              name: 'links',
              type: 'group',
              admin: { description: 'Jis platform par episode hai, sirf us ka link paste karein.' },
              fields: [
                { name: 'youtube', type: 'text', label: 'YouTube URL' },
                { name: 'spotify', type: 'text', label: 'Spotify URL' },
                { name: 'soundcloud', type: 'text', label: 'SoundCloud URL' },
              ],
            },
          ],
        },
      ],
    },
    slugField('title'),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'releaseDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'duration',
      type: 'text',
      admin: { position: 'sidebar', description: 'e.g. 42 min' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      admin: { position: 'sidebar', description: 'Homepage ke hero mein dikhayein.' },
    },
  ],
}
