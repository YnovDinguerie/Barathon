import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import ToastComponent from '@/components/ToastComponent'

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
        <ToastComponent />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
