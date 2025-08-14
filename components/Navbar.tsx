'use client'

import Link from 'next/link'
import { useStickyNav } from '@/app/hooks/useStickyNav'

export default function Navbar() {
  const isSticky = useStickyNav()

  return (
    <nav
      className={`w-full z-50 transition-all 
        ${isSticky ? 'fixed top-0 bg-white/80 backdrop-blur-md shadow' 
                   : 'relative'
        } text-foreground bg-white/80 backdrop-blur-md shadow`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Name (hidden on small screens) */}
        <div className="text-lg font-semibold hidden sm:block">
          Agraw Mindaye
        </div>

        {/* Nav Links */}
        <div className="flex-1 flex justify-center sm:justify-end items-center space-x-4 sm:space-x-6 text-sm sm:text-base">
          <a href="#about" className="hover:text-blue-500 transition">About</a>
          <a href="#projects" className="hover:text-blue-500 transition">Projects</a>
          <a href="#contact" className="hover:text-blue-500 transition">Contact</a>

          {/* Resume Button */}
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition text-sm sm:text-base"
          >
            Resume
          </Link>
        </div>
      </div>
    </nav>
  )
}
