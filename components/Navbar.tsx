'use client'

import Link from 'next/link'

const navLinkStyle = 'text-lg px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 rounded'

export default function Navbar() {
  return (
    <nav className="w-full bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-center md:justify-between">
        <span className="hidden md:block font-bold text-xl tracking-tight">Agraw Mindaye</span>

        {/* Nav links */}
        <div className="flex space-x-6">
          <Link href="/about" className={`${navLinkStyle} hover:text-blue-300`}>
            About
          </Link>
          <Link href="/projects" className={`${navLinkStyle} hover:text-blue-300`}>
            Projects
          </Link>
          <Link href="/contact" className={`${navLinkStyle} hover:text-blue-300`}>
            Contact
          </Link>

          {/* Resume */}
          <Link
            href="/resume.pdf"
            target="_blank"
            className="text-lg px-3 py-1 rounded-md bg-teal-500 text-slate-900 font-medium transition-colors hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50"
          >
            Resume
          </Link>
        </div>
      </div>
    </nav>
  )
}
