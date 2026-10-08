import type { GlobalConfig } from 'payload'

import { anyone, isStaff } from '../access'
import { DEFAULTS } from '../content/defaults'
import { imageField } from '../fields/image'
import { linkArray } from '../fields/link'

const D = DEFAULTS

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Pages',
    description: 'Poori website par aane wali cheezein: menu, footer, shared sections, social links aur SEO.',
  },
  access: {
    read: anyone,
    update: isStaff,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header & Footer',
          fields: [
            {
              name: 'header',
              type: 'group',
              fields: [
                imageField({
                  name: 'logo',
                  size: [300, 120],
                  minWidth: 120,
                  hint: 'Optional. Transparent PNG/SVG logo. Khali ho to "DESK TALKS." text logo dikhega.',
                }),
                linkArray('nav', 'Menu', D.header.nav, 'Upar wale menu ke links, isi tarteeb mein.'),
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', label: 'Button Label', type: 'text', defaultValue: D.header.ctaLabel },
                    { name: 'ctaLink', label: 'Button Link', type: 'text', defaultValue: D.header.ctaLink },
                  ],
                },
              ],
            },
            {
              name: 'footer',
              type: 'group',
              fields: [
                imageField({
                  name: 'logo',
                  size: [300, 120],
                  minWidth: 120,
                  hint: 'Optional. Dark footer ke liye safaid (white) logo, transparent PNG/SVG.',
                }),
                linkArray('links', 'Top Links', D.footer.links, 'Footer mein logo ke saath wale links.'),
                linkArray('bottomLinks', 'Bottom Links', D.footer.bottomLinks, 'Copyright line ke saath wale links.'),
                {
                  name: 'copyright',
                  type: 'text',
                  defaultValue: D.footer.copyright,
                  admin: { description: 'Saal (year) khud aage lag jata hai.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Shared Sections',
          description: 'Ye sections kai pages par aate hain; yahan badlein to har jagah badal jayenge.',
          fields: [
            {
              name: 'community',
              label: 'Community Section',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', defaultValue: D.community.title },
                { name: 'text', type: 'textarea', defaultValue: D.community.text },
                {
                  type: 'row',
                  fields: [
                    { name: 'buttonLabel', type: 'text', defaultValue: D.community.buttonLabel },
                    { name: 'buttonLink', type: 'text', defaultValue: D.community.buttonLink },
                  ],
                },
                imageField({
                  name: 'image',
                  size: [720, 768],
                  minWidth: 360,
                  hint: 'Optional. Transparent PNG (globe / people graphic). Khali ho to default graphic dikhega.',
                }),
              ],
            },
            {
              name: 'subscribe',
              label: 'Subscribe Box',
              type: 'group',
              fields: [
                { name: 'heading', type: 'textarea', defaultValue: D.subscribe.heading },
                {
                  type: 'row',
                  fields: [
                    { name: 'placeholder', type: 'text', defaultValue: D.subscribe.placeholder },
                    { name: 'buttonLabel', type: 'text', defaultValue: D.subscribe.buttonLabel },
                  ],
                },
                { name: 'successMessage', type: 'text', defaultValue: D.subscribe.successMessage },
              ],
            },
            {
              name: 'blogCta',
              type: 'group',
              label: 'Blog Sidebar CTA',
              fields: [
                { name: 'heading', type: 'text', defaultValue: D.blogCta.heading },
                { name: 'text', type: 'textarea', defaultValue: D.blogCta.text },
                {
                  type: 'row',
                  fields: [
                    { name: 'buttonLabel', type: 'text', defaultValue: D.blogCta.buttonLabel },
                    // Existing DB default; changing it would make SQLite rebuild the table. /contact redirects to /#contact.
                    { name: 'buttonUrl', type: 'text', defaultValue: '/contact' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Community Logos',
          fields: [
            {
              name: 'partnerLogos',
              type: 'array',
              label: 'Community Logos',
              admin: { description: '"The DeskTalk community is growing!" section ke company logos.' },
              fields: [
                { name: 'name', type: 'text', required: true },
                imageField({
                  name: 'logo',
                  required: true,
                  size: [440, 100],
                  minWidth: 200,
                  hint: 'Transparent PNG ya SVG, ek rang (grey) ka logo. Teal section mein khud safaid ho jata hai.',
                }),
              ],
            },
          ],
        },
        {
          label: 'Social Links',
          fields: [
            {
              name: 'social',
              type: 'group',
              admin: { description: 'Footer ke icons. Khali chhora hua icon nahi dikhega.' },
              fields: [
                { name: 'youtube', type: 'text' },
                { name: 'linkedin', type: 'text' },
                { name: 'instagram', type: 'text' },
                { name: 'soundcloud', type: 'text' },
                { name: 'spotify', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'SEO Defaults',
          fields: [
            {
              name: 'seo',
              type: 'group',
              fields: [
                {
                  name: 'defaultDescription',
                  type: 'textarea',
                  defaultValue: D.seo.defaultDescription,
                  admin: { description: 'Jin pages ki apni description na ho, un par Google mein yeh dikhegi (155 characters tak).' },
                },
                imageField({
                  name: 'shareImage',
                  size: [1200, 630],
                  minWidth: 600,
                  hint: 'Facebook/LinkedIn/WhatsApp par link share karne par dikhne wali image. Khali ho to default image.',
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
}
