import { JOIN_PAGES, JoinPage } from '@/components/JoinPage'

export const metadata = JOIN_PAGES.host.metadata

export default function JoinAsHostPage() {
  return <JoinPage type="host" />
}
