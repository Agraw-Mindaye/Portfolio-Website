import { ImageResponse } from 'next/og'

import { SITE_NAME, SITE_ROLE } from '@/lib/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${SITE_NAME} — ${SITE_ROLE}`

/**
 * Generated at build time from the site's own palette so shared links carry the
 * same visual language as the site. No design asset to keep in sync.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#1a191d',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          agrawmin.com
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 96, fontWeight: 700, color: '#ffffff' }}>
            {SITE_NAME}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 36,
              letterSpacing: '0.06em',
              color: 'rgba(255,255,255,0.72)',
            }}
          >
            {SITE_ROLE}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 24,
            color: 'rgba(255,255,255,0.5)',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: 28,
          }}
        >
          Bare-metal ARM Cortex-M · Sensor drivers · Controls &amp; automation
        </div>
      </div>
    ),
    size,
  )
}
