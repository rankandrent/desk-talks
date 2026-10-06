import type { Block } from 'payload'

export const YouTubeBlock: Block = {
  slug: 'youtube',
  labels: { singular: 'YouTube Video', plural: 'YouTube Videos' },
  interfaceName: 'YouTubeBlock',
  fields: [
    { name: 'url', type: 'text', required: true, label: 'YouTube URL' },
    { name: 'caption', type: 'text' },
  ],
}
