/**
 * Creates (or resets the password of) a dashboard admin.
 *
 *   pnpm create-admin          -> live Cloudflare database
 *   pnpm create-admin:local    -> local development database
 *
 * Asks for name, email and password in the terminal; nothing is stored in code.
 */
import { createInterface } from 'node:readline'
import config from '@payload-config'
import { getPayload } from 'payload'

// Line queue instead of rl.question(): works when typing and when input is piped in.
const rl = createInterface({ input: process.stdin })
const lines = rl[Symbol.asyncIterator]()
const ask = async (prompt: string) => {
  process.stdout.write(prompt)
  const { value } = await lines.next()
  return String(value ?? '').trim()
}

const name = (await ask('Name [DeskTalks Admin]: ')) || 'DeskTalks Admin'
const email = (await ask('Email: ')).toLowerCase()
const password = await ask('Password (min 8 characters): ')
rl.close()

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) {
  console.error('\nPlease enter a valid email and a password of at least 8 characters.')
  process.exit(1)
}

const payload = await getPayload({ config })
const { docs } = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })

if (docs[0]) {
  await payload.update({ collection: 'users', id: docs[0].id, data: { password, role: 'admin' } })
  console.log(`\nUpdated: ${email} is an admin and the password has been reset.`)
} else {
  await payload.create({ collection: 'users', data: { name, email, password, role: 'admin' } })
  console.log(`\nCreated admin: ${email}`)
}
process.exit(0)
