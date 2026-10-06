// Public "create first user" is disabled for this team-only dashboard.
// Admin accounts are created from the terminal with `pnpm create-admin`.
const disabled = () => Response.json({ errors: [{ message: 'Not found.' }] }, { status: 404 })

export const GET = disabled
export const POST = disabled
