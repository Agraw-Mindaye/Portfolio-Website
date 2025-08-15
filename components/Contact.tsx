'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus('Message sent successfully!')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus(data?.error || 'Failed to send message. Please try again.')
      }
    } catch {
      setStatus('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
      setTimeout(() => setStatus(''), 5000)
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-20 py-16 sm:py-20 md:py-24 bg-gray-50"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-2xl px-4">
        <h2
          id="contact-title"
          className="text-slate-900 text-3xl sm:text-4xl md:text-5xl font-bold border-b-2 border-blue-500 inline-block pb-2 mb-10 text-center w-full"
        >
          Contact
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 sm:py-4 text-sm sm:text-base shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 sm:py-4 text-sm sm:text-base shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-60"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Let's chat, write your message here!"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 sm:py-4 text-sm sm:text-base shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-y disabled:opacity-60"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-600 px-6 py-3 sm:py-4 text-lg font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Sending…' : 'Submit'}
            </button>
          </div>
        </form>

        {status && (
          <p
            className="mt-4 text-center text-sm sm:text-base"
            aria-live="polite"
            style={{ color: status.includes('successfully') ? '#16a34a' : 'red' }}
          >
            {status}
          </p>
        )}
      </div>
    </section>
  )
}
