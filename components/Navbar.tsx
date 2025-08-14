'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState('about')

  useEffect(() => {
    const navHeight = 56 // keep in sync with h-[56px]
    const sentinel = document.getElementById('nav-sentinel')
    if (!sentinel) return

    const io = new IntersectionObserver(
      ([entry]) => {
        // If the sentinel is intersecting (we are near top/hero), hide the nav.
        // If it's not intersecting (we scrolled past it), show the nav.
        setVisible(!entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: `-${navHeight}px 0px 0px 0px`,
        threshold: 0,
      }
    )

    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  // Smooth scroll & active highlight (optional)
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setActive(id)
    const target = document.getElementById(id)
    const navHeight = 56
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
      history.pushState(null, '', `#${id}`)
    }
  }

  const linkClass = (id: string) =>
    `text-sm sm:text-base transition ${
      active === id
        ? 'text-blue-300 underline underline-offset-4'
        : 'text-white hover:text-blue-300'
    }`

  return (
    <nav
      className={[
        // fixed so it’s independent of ancestor overflow quirks
        'fixed top-0 inset-x-0 z-[1000]',
        // styling
        'bg-slate-900/90 backdrop-blur shadow-sm',
        // animation
        'transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none',
      ].join(' ')}
      aria-hidden={!visible}
    >
      <div className="mx-auto max-w-screen-xl w-full px-4 py-3 h-[56px] flex items-center
                      justify-center md:justify-between gap-4">
        <span className="hidden md:inline font-bold text-lg tracking-tight text-white">Agraw Mindaye</span>

        <div className="flex gap-6 items-center">
          {SECTIONS.map(({ id, label }) => (
            <Link
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={linkClass(id)}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/resume.pdf"
            target="_blank"
            className="text-sm sm:text-base px-3 py-1 rounded bg-teal-500 text-slate-900 font-medium hover:bg-teal-400"
          >
            Resume
          </Link>
        </div>
      </div>
    </nav>
  )
}
