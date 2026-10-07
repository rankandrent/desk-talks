import config from '@payload-config'
import { REST_POST } from '@payloadcms/next/routes'

// Public "create first user" is disabled for this team-only dashboard. It only works when the
// form was opened from /admin/create-first-user?setup=<SETUP_KEY>. Payload itself refuses this
// endpoint once any user exists, so the setup link stops working after the first admin.
const notFound = () => Response.json({ errors: [{ message: 'Not found.' }] }, { status: 404 })

const hasSetupKey = (req: Request) => {
  const key = process.env.SETUP_KEY
  const referer = req.headers.get('referer')
  if (!key || !referer) return false
  try {
    return new URL(referer).searchParams.get('setup') === key
  } catch {
    return false
  }
}

const payloadPost = REST_POST(config)

export const POST = (req: Request) =>
  hasSetupKey(req)
    ? payloadPost(req, { params: Promise.resolve({ slug: ['users', 'first-register'] }) })
    : notFound()

export const GET = notFound
