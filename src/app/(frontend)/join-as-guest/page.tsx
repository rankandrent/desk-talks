import { JOIN_PAGES, JoinPage } from '@/components/JoinPage'

export const metadata = JOIN_PAGES.guest.metadata

export default function JoinAsGuestPage() {
  return <JoinPage type="guest" />
}
