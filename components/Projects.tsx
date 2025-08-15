'use client'

import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/data/projects'

function TechBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-700">
      {label}
    </span>
  )
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-20 py-16 sm:py-20 md:py-24 bg-white"
      aria-labelledby="projects-title"
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* Title */}
        <header className="mb-12 sm:mb-16 text-center">
          <h2
            id="projects-title"
            className="text-slate-900 text-3xl sm:text-4xl md:text-5xl font-bold inline-block border-b-2 border-blue-500 pb-2"
          >
            Projects
          </h2>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((p, idx) => (
            <article
              key={p.title}
              className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              aria-label={p.title}
            >
              {/* Media */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={`${p.title} preview`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                    priority={idx === 0 ? false : false}
                  />
                ) : (
                  // Fallback if no image provided
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-lg bg-blue-500/10 ring-1 ring-blue-200" />
                  </div>
                )}
                {/* Subtle overlay on hover */}
                <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-4 p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {p.demo ? (
                    <Link href={p.demo} target="_blank" rel="noopener noreferrer">
                      {p.title}
                    </Link>
                  ) : (
                    p.title
                  )}
                </h3>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {p.description}
                </p>

                {/* Tech stack */}
                <div className="mt-1 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <TechBadge key={t} label={t} />
                  ))}
                </div>

                {/* Links */}
                <div className="mt-2 flex items-center gap-3">
                  {p.github && (
                    <Link
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-50 transition"
                    >
                      View Code
                    </Link>
                  )}
                  {p.demo && (
                    <Link
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 transition"
                    >
                      Live Demo
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* temporary footer */}
        <p className="mt-12 text-center text-sm text-gray-500 italic">
          In progress — more content coming soon.
        </p>
      </div>
    </section>
  )
}
