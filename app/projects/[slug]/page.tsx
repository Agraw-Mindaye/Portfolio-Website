import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { PROJECTS } from '@/data/projects'
import { getCaseStudy } from '@/data/caseStudies'

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)
  return {
    title: project ? `${project.title} — Case Study` : 'Project',
  }
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function ArrowLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 border-t border-white/10 pt-16 md:pt-20">
      <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-white/28">
        {index}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h2>
    </div>
  )
}

function PlaceholderBlock({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center border border-white/10 bg-white/[0.02] ${className}`}
    >
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/20">
        {label}
      </span>
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-7 text-white/60 md:text-base">
          <span className="shrink-0 font-mono text-[0.55rem] leading-7 text-white/25">—</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) notFound()

  const study = getCaseStudy(slug)
  if (!study) notFound()

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null

  return (
    <div className="px-6 pb-32 pt-28 md:pt-36">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.20em] text-white/35 transition-colors duration-200 hover:text-white/65"
        >
          <ArrowLeft />
          All Projects
        </Link>

        {/* ── Hero ───────────────────────────────────────────────────────────── */}

        <div className="mt-10">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-white/35">
            Case Study
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            {project.title}
          </h1>

          <p className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-white/40">
            {study.descriptor}
          </p>

          {/* Summary */}
          <div className="mt-8 border-l border-white/15 pl-5">
            <p className="max-w-2xl text-sm leading-7 text-white/60 md:text-base">
              {study.summary}
            </p>
          </div>

          {/* Metadata grid */}
          <div className="mt-10 border border-white/12">
            <div className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
              {study.metadata.map((item) => (
                <div key={item.label} className="bg-background px-5 py-5">
                  <p className="font-mono text-[0.60rem] uppercase tracking-[0.16em] text-white/30">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-white/70">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-7 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/55"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {study.codeUrl && study.codeUrl !== '#' && (
              <a
                href={study.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-white/20 px-5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/55 transition-colors duration-200 hover:border-white/40 hover:text-white/80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                View Code
              </a>
            )}
            {study.demoUrl && study.demoUrl !== '#' && (
              <a
                href={study.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-white/20 px-5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/55 transition-colors duration-200 hover:border-white/40 hover:text-white/80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </a>
            )}
          </div>

          {/* Hero image */}
          <div className="mt-12">
            {study.heroImageSrc ? (
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={study.heroImageSrc}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <PlaceholderBlock label="Hero Image / Visual" className="aspect-video" />
            )}
          </div>
        </div>

        {/* ── 01 Overview ────────────────────────────────────────────────────── */}

        <SectionHeader index="01" title="Overview" />

        <p className="text-sm leading-7 text-white/60 md:text-base">{study.overview}</p>

        {/* ── 02 Technical Design ────────────────────────────────────────────── */}

        <SectionHeader index="02" title="Technical Design" />

        <p className="text-sm leading-7 text-white/60 md:text-base">
          {study.technicalDesign.description}
        </p>

        <div className="mt-10">
          <BulletList items={study.technicalDesign.coreFeatures} />
        </div>

        <div className="mt-10 space-y-5">
          {study.technicalDesign.challenges.map((item, i) => (
            <div key={i} className="border border-white/10 px-7 py-6 md:px-8 md:py-7">
              <h3 className="text-base font-semibold text-white md:text-lg">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/55 md:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── 03 Outcomes ────────────────────────────────────────────────────── */}

        <SectionHeader index="03" title="Outcomes" />

        <BulletList items={study.outcomes.results} />

        <div className="mt-10 flex flex-wrap gap-2">
          {study.outcomes.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/55"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-10">
          <p className="mb-5 font-mono text-[0.65rem] uppercase tracking-[0.20em] text-white/30">
            Next Steps
          </p>
          <BulletList items={study.outcomes.nextSteps} />
        </div>

        {/* ── Bottom navigation ──────────────────────────────────────────────── */}

        <div className="mt-20 border-t border-white/10 pt-10 md:mt-24 md:pt-12">
          <div className="flex items-center justify-between">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.20em] text-white/35 transition-colors duration-200 hover:text-white/65"
              >
                <ArrowLeft />
                <span className="hidden lg:inline">Prev —&nbsp;</span>
                {prevProject.title}
              </Link>
            ) : (
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.20em] text-white/35 transition-colors duration-200 hover:text-white/65"
              >
                <ArrowLeft />
                All Projects
              </Link>
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.20em] text-white/35 transition-colors duration-200 hover:text-white/65"
              >
                <span className="hidden lg:inline">Next —&nbsp;</span>
                {nextProject.title}
                <ArrowRight />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
