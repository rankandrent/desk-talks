import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  type JSXConvertersFunction,
  RichText as PayloadRichText,
} from '@payloadcms/richtext-lexical/react'

import type { YouTubeBlock } from '@/payload-types'
import { youTubeEmbed } from '@/lib/embeds'
import { slugify } from '@/fields/slug'

type LexicalNode = { type?: string; text?: string; tag?: string; children?: LexicalNode[] }

export const nodeText = (node: LexicalNode): string =>
  node.text ?? (node.children ?? []).map(nodeText).join('')

/** H2 headings become the "In this Article" table of contents. */
export const extractToc = (data?: SerializedEditorState | null) => {
  const root = (data?.root as LexicalNode | undefined)?.children ?? []
  return root
    .filter((node) => node.type === 'heading' && node.tag === 'h2')
    .map((node) => {
      const text = nodeText(node)
      return { id: slugify(text), text }
    })
    .filter((item) => item.text)
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const Tag = (['h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tag) ? node.tag : 'h2') as 'h2'
    return <Tag id={slugify(nodeText(node as LexicalNode))}>{nodesToJSX({ nodes: node.children })}</Tag>
  },
  blocks: {
    youtube: ({ node }: { node: { fields: YouTubeBlock } }) => {
      const src = youTubeEmbed(node.fields.url)
      if (!src) return null
      return (
        <figure className="my-6">
          <div className="aspect-video overflow-hidden rounded-md bg-black">
            <iframe
              src={src}
              title={node.fields.caption || 'YouTube video'}
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="size-full"
            />
          </div>
          {node.fields.caption && (
            <figcaption className="mt-2 text-center text-sm text-ink-500">{node.fields.caption}</figcaption>
          )}
        </figure>
      )
    },
  },
})

export function RichText({ data, className }: { data?: SerializedEditorState | null; className?: string }) {
  if (!data) return null
  return <PayloadRichText data={data} converters={converters} className={className} />
}
