import type { Access, FieldAccess, Where } from 'payload'

type Role = 'admin' | 'editor'

const hasRole = (user: unknown, roles: Role[]): boolean => {
  const role = (user as { role?: Role } | null)?.role
  return Boolean(role && roles.includes(role))
}

export const isAdmin: Access = ({ req: { user } }) => hasRole(user, ['admin'])

export const isAdminField: FieldAccess = ({ req: { user } }) => hasRole(user, ['admin'])

export const isStaff: Access = ({ req: { user } }) => hasRole(user, ['admin', 'editor'])

export const anyone: Access = () => true

/** Logged-in staff see drafts; the public only sees published documents. */
export const publishedOrStaff: Access = ({ req: { user } }) => {
  if (hasRole(user, ['admin', 'editor'])) return true
  const where: Where = { _status: { equals: 'published' } }
  return where
}

/** Admins manage every account; editors can only read and update their own. */
export const adminOrSelf: Access = ({ req: { user } }) => {
  if (hasRole(user, ['admin'])) return true
  if (!user) return false
  return { id: { equals: user.id } }
}
