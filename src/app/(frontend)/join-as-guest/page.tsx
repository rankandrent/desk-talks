import { JoinPage, joinMetadata } from '@/components/JoinPage'

export const revalidate = 3600

export const generateMetadata = () => joinMetadata('guest')

export default function JoinAsGuestPage() {
  return <JoinPage type="guest" />
}
