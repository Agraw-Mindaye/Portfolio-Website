import type { NextConfig } from 'next'

import { RESUME_FILE } from './lib/site'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /resume is the stable link for applications and email signatures.
      // Non-permanent on purpose: if the PDF is ever renamed this repoints, so
      // browsers and search engines must not cache it hard.
      {
        source: '/resume',
        destination: `/${RESUME_FILE}`,
        permanent: false,
      },
      // /resume.pdf is indexed by Google — 301 so the ranking signal carries
      // over to the real filename.
      {
        source: '/resume.pdf',
        destination: `/${RESUME_FILE}`,
        permanent: true,
      },
    ]
  },
}

export default nextConfig
