import type { CollectionConfig } from 'payload'

import { isStaff, publishedOrStaff } from '../access'
import { imageField } from '../fields/image'
import { slugField } from '../fields/slug'
import { setPublishDates } from '../hooks/publishDates'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog', plural: 'Blogs' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'contentUpdatedAt', '_status'],
    group: 'Content',
    preview: (doc) => (doc?.slug ? `/blogs/${doc.slug}` : null),
  },
  versions: {
    drafts: true,
    maxPerDoc: 25,
  },
  defaultSort: '-publishedAt',
  access: {
    read: publishedOrStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  hooks: {
    beforeChange: [setPublishDates],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article',
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              admin: { description: 'Blog cards par dikhne wali 2–3 lines.' },
            },
            imageField({
              name: 'featuredImage',
              required: true,
              size: [1600, 900],
              minWidth: 800,
              hint: 'Landscape 16:9, JPG/WebP. Blog cards aur article ke upar isi shape mein dikhti hai.',
            }),
            {
              name: 'content',
              type: 'richText',
              required: true,
              admin: {
                description:
                  'H2 headings khud "In this Article" (Table of Contents) mein aa jati hain.',
              },
            },
          ],
        },
        {
          label: 'FAQs',
          fields: [
            {
              name: 'faqs',
              type: 'array',
              labels: { singular: 'FAQ', plural: 'FAQs' },
              admin: { description: 'Article ke neeche "Frequently Asked Questions" (Google FAQ schema bhi).' },
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
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
      name: 'author',
      type: 'relationship',
      relationTo: 'people',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published Date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
        description: 'Pehli dafa publish par khud lag jati hai.',
      },
    },
    {
      name: 'contentUpdatedAt',
      type: 'date',
      label: 'Last Updated',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayOnly' },
        description: 'Sirf tab badalti hai jab publish ke baad content waqai change ho.',
      },
    },
    {
      name: 'publishedHash',
      type: 'text',
      admin: { hidden: true },
    },
  ],
}
