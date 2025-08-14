'use client'

export default function Projects() {
  return (
    <section id="about" className="py-12 sm:py-20 md:py-16 bg-white" aria-labelledby="about-title">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title */}
        <header className="flex flex-col items-center mb-12 sm:mb-16">
          <h2
            id="about-title"
            className="text-slate-900 text-3xl sm:text-4xl md:text-5xl font-bold text-center border-b-2 border-blue-500 inline-block pb-2"
          >
            Projects
          </h2>
        </header>

        {/* Content */}

        {/* Footer Note */}
        <p className="mt-12 text-sm sm:text-base max-w-xl mx-auto text-center text-gray-500 italic">
          In progress — more content coming soon.
        </p>
      </div>
    </section>
  )
}
