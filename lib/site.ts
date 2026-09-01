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
