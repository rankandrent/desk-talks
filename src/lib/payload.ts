import config from '@payload-config'
import { getPayload } from 'payload'

export const getPayloadClient = () => getPayload({ config })

export const SITE_URL = process.env.SITE_URL || 'http://localhost:3000'
