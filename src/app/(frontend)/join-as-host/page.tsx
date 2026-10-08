import { JoinPage, joinMetadata } from '@/components/JoinPage'

export const revalidate = 3600

export const generateMetadata = () => joinMetadata('host')

export default function JoinAsHostPage() {
  return <JoinPage type="host" />
}
