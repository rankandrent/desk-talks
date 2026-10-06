/** Tiny helpers to build Lexical rich-text JSON for seed content. */

type Node = { type: string; version: number; [key: string]: unknown }

const text = (value: string, format = 0): Node => ({
  type: 'text',
  text: value,
  format,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const block = (type: string, children: Node[], extra: Record<string, unknown> = {}) => ({
  type,
  children,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
  ...extra,
})

export const p = (value: string) => block('paragraph', [text(value)], { textFormat: 0, textStyle: '' })

export const h2 = (value: string) => block('heading', [text(value)], { tag: 'h2' })

export const h3 = (value: string) => block('heading', [text(value)], { tag: 'h3' })

export const image = (mediaId: number): Node => ({
  type: 'upload',
  relationTo: 'media',
  value: mediaId,
  fields: null,
  format: '',
  version: 3,
  id: `seed-${mediaId}-${Math.random().toString(36).slice(2, 8)}`,
})

export const doc = (...children: Node[]) => ({
  root: block('root', children),
})
