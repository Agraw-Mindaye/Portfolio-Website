'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const links = [
  { id: 'home', label: 'Home', sectionId: 'home' },
  { id: 'about', label: 'About', sectionId: 'about' },
  { id: 'work', label: 'Work', sectionId: 'projects' },
  { id: 'contact', label: 'Contact', sectionId: 'contact' },
]

function scrollToSection(id: string) {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  function navigate(sectionId: string) {
    if (pathname === '/') {
      scrollToSection(sectionId)
    } else {
      router.push(sectionId === 'home' ? '/' : `/#${sectionId}`)
    }
  }

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Name */}
          <span className="font-mono text-xs uppercase tracking-widest text-white/80 select-none">
            Agraw Mindaye
          </span>

          {/* Desktop links */}
          <ul
            className="hidden md:flex items-center gap-8 list-none cursor-pointer"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {links.map(({ id, label, sectionId }) => (
              <li
                key={id}
                onMouseEnter={() => setHoveredLink(id)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <button
                  onClick={() => navigate(sectionId)}
                  className={`font-mono text-xs uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                    hoveredLink === null
                      ? 'text-white/80'
                      : hoveredLink === id
                        ? 'text-white'
                        : 'text-white/25'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}

            {/* Resume — bordered pill */}
            <li
              onMouseEnter={() => setHoveredLink('resume')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-mono text-xs uppercase tracking-widest transition-colors duration-200 border rounded-md px-4 py-1.5 ${
                  hoveredLink === 'resume'
                    ? 'text-white border-white/70'
                    : 'text-white/80 border-white/30'
                }`}
              >
                Resume
              </a>
            </li>
          </ul>

          {/* Mobile hamburger — always mounted so CSS transition runs both ways */}
          <button
            className="flex md:hidden flex-col justify-center gap-1.5 cursor-pointer p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 ease-in-out origin-center ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 ease-in-out ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 ease-in-out origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay — persistent, visibility toggled via opacity + pointer-events */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: '#1a191d' }}
      >
        {links.map(({ id, label, sectionId }) => (
          <button
            key={id}
            onClick={() => {
              setMenuOpen(false)
              navigate(sectionId)
            }}
            className="font-mono text-2xl uppercase tracking-widest text-white cursor-pointer"
          >
            {label}
          </button>
        ))}

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          className="font-mono text-2xl uppercase tracking-widest text-white border border-white/40 rounded-full px-8 py-2"
        >
          Resume
        </a>
      </div>
    </>
  )
}
