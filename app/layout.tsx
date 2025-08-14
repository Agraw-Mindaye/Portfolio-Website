import { Analytics } from '@vercel/analytics/react'
import { Inter } from 'next/font/google'

import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${inter.variable} font-sans bg-background text-foreground overflow-x-hidden`}
      >
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
