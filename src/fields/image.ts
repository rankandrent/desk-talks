import type { PayloadRequest, UploadField, UploadFieldSingleValidation } from 'payload'

type ImageSpec = {
  name: string
  label?: string
  required?: boolean
  /** Recommended upload size in pixels, shown to editors. */
  size: [width: number, height: number]
  /** Where/how the image appears and which format to use. */
  hint: string
  /** Smaller images look blurry on the site; reject anything narrower than this. */
  minWidth: number
}

/**
 * Upload field that tells editors the exact size to use and rejects images that are too small.
 * The site crops every image to a fixed shape, so following the size keeps all cards identical.
 */
export const imageField = ({ name, label, required, size, hint, minWidth }: ImageSpec): UploadField => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
  required,
  admin: {
    description: `📐 ${size[0]} × ${size[1]} px · ${hint}`,
  },
  validate: (async (value: unknown, { req, previousValue }: { req: PayloadRequest; previousValue?: unknown }) => {
    if (!value) return required ? 'This field is required.' : true
    const idOf = (v: unknown) => (typeof v === 'object' && v !== null && 'id' in v ? v.id : v)
    const id = idOf(value)
    // Seed/import scripts opt out with `context: { skipImageSizeCheck: true }`.
    if (req.context?.skipImageSizeCheck) return true
    // Only check newly selected images, so older content can still be edited.
    if (previousValue && idOf(previousValue) === id) return true
    try {
      const media = await req.payload.findByID({ collection: 'media', id: id as number, depth: 0, req })
      // SVGs have no pixel width, so they are always accepted.
      if (media?.width && media.width < minWidth) {
        return `Image bohat chhoti hai (${media.width}px wide). Kam se kam ${minWidth}px chahiye, behtar ${size[0]} × ${size[1]} px.`
      }
    } catch {
      // If the media lookup fails, don't block saving.
    }
    return true
  }) as UploadFieldSingleValidation,
})
