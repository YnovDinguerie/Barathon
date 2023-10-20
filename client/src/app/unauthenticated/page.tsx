'use client'

import { userAtom } from '@/state'
import { useAtomValue } from 'jotai'
import { redirect } from 'next/navigation'

export default function UnauthorizedPage() {
  const user = useAtomValue(userAtom)
  if (user.token !== '') {
    redirect('/')
  }
  return <p>Your are not allowed to see this page</p>
}
