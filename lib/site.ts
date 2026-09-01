/**
 * Single source of truth for site-wide constants.
 *
 * Nothing should reference the resume's filename directly except the redirects
 * in next.config.ts — link to RESUME_URL instead. To ship a new resume, replace
 * the PDF in public/; if the filename ever changes, updating RESUME_FILE here
 * carries every link and both redirects with it.
 */
export const RESUME_FILE = 'Agraw_Mindaye_Resume.pdf'

/** Stable public path. Redirects to the resume PDF. */
export const RESUME_URL = '/resume'

/**
 * Canonical origin. Must match the host that Vercel 301s to, or canonical tags
 * and OG URLs will disagree with the served host and split ranking signal.
 */
export const SITE_URL = 'https://agrawmin.com'

export const SITE_NAME = 'Agraw Mindaye'
export const SITE_ROLE = 'Firmware & Controls Engineer'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/agraw-min/'
export const GITHUB_URL = 'https://github.com/Agraw-Mindaye'

/**
 * Public contact address. Shown as the fallback when the contact form can't
 * send, so a broken mail path never leaves someone with no way to reach you.
 */
export const CONTACT_EMAIL = 'mindaye.agraw@gmail.com'
