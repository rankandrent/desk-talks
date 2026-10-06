import type { Field, FieldHook } from 'payload'

export const slugify = (value: string): string =>
  value
    .toString()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

const formatSlug =
  (fallbackField: string): FieldHook =>
  ({ value, data, originalDoc }) => {
    if (typeof value === 'string' && value.trim()) return slugify(value)
    const source = data?.[fallbackField] ?? originalDoc?.[fallbackField]
    return typeof source === 'string' ? slugify(source) : value
  }

export const slugField = (fallbackField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: `URL ka hissa. Khali chhorein to "${fallbackField}" se khud ban jayega.`,
  },
  hooks: {
    beforeValidate: [formatSlug(fallbackField)],
  },
})
