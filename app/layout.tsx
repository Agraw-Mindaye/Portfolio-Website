import { Analytics } from '@vercel/analytics/react'

import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Portfolio',
  description: 'My developer portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Navbar />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
