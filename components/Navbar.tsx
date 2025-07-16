// components/Navbar.tsx

export default function Navbar() {
    return (
      <nav className="w-full bg-white shadow p-4">
        <div className="max-w-4xl mx-auto flex justify-between">
          <span className="font-bold text-lg">Agraw Mindaye</span>
          <div className="space-x-4">
            <a href="/" className="text-gray-700 hover:text-black">Home</a>
            <a href="/projects" className="text-gray-700 hover:text-black">Projects</a>
            <a href="/contact" className="text-gray-700 hover:text-black">Contact</a>
          </div>
        </div>
      </nav>
    )
  }
  