'use client'

import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

// export function AuthProvider() {
//   const user = useAtomValue(userAtom)
//   if (user.token === '') {
//     redirect('/unauthenticated')
//   }
// }
