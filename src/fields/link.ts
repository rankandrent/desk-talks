import type { ArrayField, Field } from 'payload'

/** Label + link pair. Links can be a page path ("/about", "/#contact") or a full URL. */
export const linkFields = (labelDefault?: string, linkDefault?: string): Field[] => [
  {
    type: 'row',
    fields: [
      { name: 'label', type: 'text', required: true, defaultValue: labelDefault },
      {
        name: 'link',
        type: 'text',
        required: true,
        defaultValue: linkDefault,
        admin: { description: 'Jaise /about, /#contact ya https://...' },
      },
    ],
  },
]

export const linkArray = (
  name: string,
  label: string,
  defaults: readonly { label: string; link: string }[],
  description?: string,
): ArrayField => ({
  name,
  label,
  type: 'array',
  admin: { description, initCollapsed: true },
  labels: { singular: 'Link', plural: 'Links' },
  defaultValue: defaults.map((item) => ({ ...item })),
  fields: linkFields(),
})
