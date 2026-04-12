'use client'

import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Fields = { name: string; email: string; message: string }
type FieldErrors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'loading' | 'success' | 'error'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {}
  if (!fields.name.trim()) errors.name = 'Required'
  if (!fields.email.trim()) {
    errors.email = 'Required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Invalid email address'
  }
  if (!fields.message.trim()) errors.message = 'Required'
  return errors
}

function inputClass(hasError: boolean) {
  return [
    'mt-2.5 w-full border bg-white/[0.03] px-4 py-3 text-sm text-white/80',
    'placeholder:text-white/20 focus:outline-none transition-colors duration-200',
    hasError ? 'border-white/30 focus:border-white/40' : 'border-white/15 focus:border-white/35',
  ].join(' ')
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Contact() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  function handleChange(field: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="scroll-mt-16 px-6 pt-16 pb-24 md:pt-18 md:pb-32">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Get in Touch
          </h2>
          <div className="mt-6 border-l border-white/15 pl-5">
            <p className="max-w-2xl text-sm leading-7 text-white/55 md:text-base">
              Open to firmware engineering roles, embedded systems consulting, and collaboration on
              controls or automation projects.
            </p>
          </div>
        </div>

        {/* Two-column container */}
        <div className="overflow-hidden border border-white/20 bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: context + external links */}
            <div className="px-8 py-10 md:border-r md:border-white/20 md:px-10 md:py-12">
              <p className="font-mono text-[0.70rem] uppercase tracking-[0.20em] text-white/40">
                Connect
              </p>

              <h3 className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl">
                Let&apos;s Work Together
              </h3>

              <div className="mt-6 border-l border-white/15 pl-5">
                <p className="text-sm leading-7 text-white/60 md:text-base">
                  Currently available for new opportunities. Whether it&apos;s a firmware project, a
                  controls integration challenge, or just a question about something in my work,
                  I&apos;m happy to hear it.
                </p>
              </div>

              {/* External profile links */}
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/agraw-min/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border border-white/20 px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/55 transition-colors duration-200 hover:border-white/40 hover:text-white/80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </a>

                <a
                  href="https://github.com/Agraw-Mindaye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border border-white/20 px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/55 transition-colors duration-200 hover:border-white/40 hover:text-white/80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            {/* Right: contact form */}
            <div className="border-t border-white/20 px-8 py-10 md:border-t-0 md:px-10 md:py-12">
              {status === 'success' ? (
                <div className="flex h-full flex-col justify-center py-4">
                  <p className="font-mono text-[0.70rem] uppercase tracking-[0.22em] text-white/40">
                    Message sent
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/60 md:text-base">
                    Thanks for reaching out. I&apos;ll get back to you as soon as I can.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/40"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      value={fields.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={inputClass(!!errors.name)}
                    />
                    {errors.name && (
                      <p className="mt-1.5 font-mono text-[0.60rem] uppercase tracking-[0.14em] text-white/45">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mt-6">
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/40"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="your@email.com"
                      value={fields.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={inputClass(!!errors.email)}
                    />
                    {errors.email && (
                      <p className="mt-1.5 font-mono text-[0.60rem] uppercase tracking-[0.14em] text-white/45">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="mt-6">
                    <label
                      htmlFor="contact-message"
                      className="block font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/40"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="What's on your mind?"
                      value={fields.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className={inputClass(!!errors.message)}
                    />
                    {errors.message && (
                      <p className="mt-1.5 font-mono text-[0.60rem] uppercase tracking-[0.14em] text-white/45">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="border border-white/20 px-6 py-3 font-mono text-[0.70rem] uppercase tracking-[0.18em] text-white/55 transition-colors duration-200 hover:border-white/40 hover:text-white/80 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {status === 'loading' ? 'Sending…' : 'Send Message'}
                    </button>

                    {status === 'error' && (
                      <p className="font-mono text-[0.60rem] uppercase tracking-[0.14em] text-white/45">
                        Something went wrong — please try again
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
