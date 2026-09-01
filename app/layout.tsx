import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Inter } from 'next/font/google'

import '@/app/globals.css'
import {
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_NAME,
  SITE_ROLE,
  SITE_URL,
} from '@/lib/site'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const DESCRIPTION =
  'Firmware engineer at Stukes Defense working on bare-metal ARM Cortex-M development, sensor driver bring-up, and secure onboard data logging — building toward controls and automation.'

export const metadata: Metadata = {
  // Must match the host Vercel canonicalizes to, or canonical tags and OG URLs
  // will disagree with the served host.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_ROLE}`,
    // Child pages set a short title; the site name is appended here.
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_ROLE}`,
    description: DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_ROLE}`,
    description: DESCRIPTION,
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  jobTitle: 'Firmware Engineer',
  worksFor: { '@type': 'Organization', name: 'Stukes Defense' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'New Jersey Institute of Technology' },
  url: SITE_URL,
  sameAs: [LINKEDIN_URL, GITHUB_URL],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-background text-foreground`}>
        <main>{children}</main>
        <script
          type="application/ld+json"
          // Static object defined above — no user input reaches this path.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Analytics />
      </body>
    </html>
  )
}
