// components/Navbar.tsx

import Link from 'next/link'

export default function Navbar() {
    return (
      <nav className="w-full bg-white shadow p-4">
        <div className="max-w-4xl mx-auto flex justify-between">
          <span className="font-bold text-lg">Agraw Mindaye</span>
          <div className="space-x-4">
            <Link href="/" className="text-gray-700 hover:text-black">Home</Link>
            <Link href="/projects" className="text-gray-700 hover:text-black">Projects</Link>
            <Link href="/contact" className="text-gray-700 hover:text-black">Contact</Link>
          </div>
        </div>
      </nav>
    )
  }
  