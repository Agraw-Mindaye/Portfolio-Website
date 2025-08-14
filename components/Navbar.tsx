'use client'

import Link from 'next/link'

import { useStickyNav } from '@/app/hooks/useStickyNav'
import { useActiveSection } from '@/app/hooks/useActiveSection'

export default function Navbar() {
  const isSticky = useStickyNav()
  const { activeSection } = useActiveSection()

  const navLinkStyle = (id: string) =>
    `transition hover:text-blue-500 text-lg ${
      activeSection === `#${id}` ? 'text-blue-600 font-semibold' : 'text-foreground'
    }=`

  return (
    <>
      {isSticky && <div className="h-16" aria-hidden="true" />}
      <nav
        className={`w-full z-50 transition-all ${
          isSticky ? 'fixed top-0' : 'relative'
        } text-foreground bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-lg font-semibold hidden sm:block">Agraw Mindaye</div>

          <div className="flex-1 flex justify-center sm:justify-end items-center space-x-4 sm:space-x-6 text-sm sm:text-base">
            <a href="#about" className={navLinkStyle('about')}>
              About
            </a>
            <a href="#projects" className={navLinkStyle('projects')}>
              Projects
            </a>
            <a href="#contact" className={navLinkStyle('contact')}>
              Contact
            </a>

            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className=" px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition text-sm sm:text-base"
            >
              Resume
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
