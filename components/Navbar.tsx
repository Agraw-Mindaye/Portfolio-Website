'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

const linkBase =
  'transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 rounded'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {

  const [active, setActive] = useState<string>('') // current section id
  const observerRef = useRef<IntersectionObserver | null>(null)
  const navRef = useRef<HTMLElement | null>(null)  // NEW

  const sectionEls = useMemo(
    () => SECTIONS.map(s => typeof window !== 'undefined' ? document.getElementById(s.id) : null),
    []
  )

  // Highlight active link when section is in view
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Clean up previous observer (hot reload friendly)
    observerRef.current?.disconnect()

    const navH = navRef.current?.offsetHeight ?? 56 // header height (fallback)
    const options: IntersectionObserverInit = {
      root: null,
      // Shift the "viewbox" down by the header height so the active section matches what you see
      rootMargin: `-${navH}px 0px -50% 0px`,   // top margin = header; bottom margin makes switch a bit earlier
      threshold: [0, 0.2, 0.4, 0.6, 0.8],      // smoother transitions
    }

    const io = new IntersectionObserver((entries) => {
      // Pick the most visible section
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))[0]

      if (visible?.target?.id) setActive(visible.target.id)
    }, options)

    sectionEls.forEach(el => el && io.observe(el))
    observerRef.current = io

    return () => io.disconnect()
  }, [])

  // Smooth scroll with offset + set active immediately
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setActive(id) // immediate UI update

    const target = document.getElementById(id)
    const navH = navRef.current?.offsetHeight ?? 56
    if (!target) return

    // manual offset to avoid header overlap
    const y = target.getBoundingClientRect().top + window.scrollY - navH
    window.scrollTo({ top: y, behavior: 'smooth' })
    history.pushState(null, '', `#${id}`)
  }

  const linkClass = (id: string) =>
    [
      // base
      `text-sm sm:text-base px-1.5 py-1 sm:px-2 ${linkBase} hover:text-blue-300`,
      // active state
      active === id ? 'text-blue-300 underline underline-offset-4' : 'text-white',
    ].join(' ')


  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white">
      <div className="
          mx-auto w-full px-4
          max-w-screen-xl 3xl:max-w-[90rem]
          py-3
          flex items-center justify-center
          md:justify-between
          h-[52px] 
          md:h-[56px]
        "
      >
        {/* Name (hidden on mobile) */}
        <span className="hidden md:block font-bold text-lg tracking-tight sm:text-xl">
          Agraw Mindaye
        </span>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {SECTIONS.map(s => (
            <Link
              key={s.id}
              href={`#${s.id}`}
              className={linkClass(s.id)}
              onClick={(e) => handleNavClick(e, s.id)}
            >
              {s.label}
            </Link>
          ))}

          <Link
            href="/resume.pdf"
            target="_blank"
            className="inline-flex items-center text-sm sm:text-base px-3 py-1 rounded-md
                       bg-teal-500 text-slate-900 font-medium transition-colors hover:bg-teal-400
                       focus:outline-none focus:ring-2 focus:ring-teal-400/50 md:px-4 md:py-1.5"
          >
            Resume
          </Link>
        </div>
      </div>
    </nav>
  )
}
