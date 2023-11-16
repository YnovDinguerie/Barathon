import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { init } from '@sentry/nextjs'

init({
  dsn: 'https://80e2c68e14cba2bceb53a94315877a98@o4506186000498688.ingest.sentry.io/4506186003382272',
  // Ajoutez d'autres options de configuration de Sentry si nécessaire
})
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BrewSprint',
  description: 'Une application pour creer des Barathon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
