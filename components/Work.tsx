import Link from 'next/link'
import Image from 'next/image'

import { PROJECTS, type Project } from '@/data/projects'

// ─── Featured Project ────────────────────────────────────────────────────────

function FeaturedProject({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border border-white/15 hover:border-white/30 transition-colors duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-[55%_45%]">
        {/* Image column — first in DOM so it stacks on top on mobile */}
        <div className="relative min-h-[260px] overflow-hidden border-b border-white/15 bg-white/[0.03] md:order-last md:min-h-0 md:border-b-0 md:border-l md:border-white/15">
          {project.imageSrc ? (
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover opacity-75 transition-opacity duration-300 group-hover:opacity-90"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300 group-hover:bg-white/[0.02]">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/18">
                Image Placeholder
              </span>
            </div>
          )}
        </div>

        {/* Text column — second in DOM, ordered first on desktop */}
        <div className="flex flex-col justify-between px-8 py-10 md:order-first md:px-12 md:py-14">
          <div>
            <p className="font-mono text-[0.70rem] uppercase tracking-[0.20em] text-white/40">
              Featured Project
            </p>

            <h3 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
              {project.title}
            </h3>

            <p className="mt-2 font-mono text-[0.70rem] uppercase tracking-[0.18em] text-white/40">
              {project.type}
            </p>

            <div className="mt-8 border-l border-white/15 pl-5">
              <p className="text-sm leading-7 text-white/65 md:text-base">{project.summary}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/55"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <span className="inline-flex items-center gap-2.5 font-mono text-[0.70rem] uppercase tracking-[0.20em] text-white/45 transition-colors duration-300 group-hover:text-white/75">
              View Case Study
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Project Card ────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border border-white/15 hover:border-white/30 transition-colors duration-300"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-white/[0.03]">
        {project.imageSrc ? (
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-90"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300 group-hover:bg-white/[0.02]">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/18">
              Placeholder
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="px-6 py-6 md:px-7 md:py-7">
        <p className="font-mono text-[0.67rem] uppercase tracking-[0.18em] text-white/38">
          {project.type}
        </p>

        <h3 className="mt-2.5 text-base font-semibold leading-snug text-white md:text-lg">
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-white/55">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/12 px-2.5 py-1 font-mono text-[0.60rem] uppercase tracking-[0.12em] text-white/45"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

// ─── Work Section ────────────────────────────────────────────────────────────

export default function Work() {
  const featured = PROJECTS.find((p) => p.featured)
  const rest = PROJECTS.filter((p) => !p.featured)

  return (
    <section id="projects" className="scroll-mt-16 px-6 pt-16 pb-24 md:pt-18 md:pb-32">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            My Work
          </h2>
          <div className="mt-6 border-l border-white/15 pl-5">
            <p className="max-w-2xl text-sm leading-7 text-white/55 md:text-base">
              A selection of engineering projects spanning firmware development, embedded systems,
              and controls. Each project links to a detailed case study.
            </p>
          </div>
        </div>

        {/* Featured project */}
        {featured && <FeaturedProject project={featured} />}

        {/* Cards grid */}
        {rest.length > 0 && (
          <div className="mt-16 md:mt-20">
            <p className="mb-8 font-mono text-[0.70rem] uppercase tracking-[0.22em] text-white/35">
              All Projects
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
              {rest.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
