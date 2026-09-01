import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import CodeBlock from '@/components/CodeBlock'
import { PROJECTS } from '@/data/projects'
import { getCaseStudy } from '@/data/caseStudies'

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)
  const study = getCaseStudy(slug)
  if (!project) return { title: 'Project' }

  // Lead with the technology rather than spending the highest-value title
  // characters on the word "Case Study". The root layout's template appends the
  // site name, so this stays short.
  const description = study?.descriptor ?? project.description

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      type: 'article',
      images: project.imageSrc ? [project.imageSrc] : undefined,
    },
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

function SectionHeader({ index, title }: { index: number; title: string }) {
  return (
    <div className="mb-10 border-t border-white/10 pt-16 md:pt-20">
      <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-white/55">
        {String(index).padStart(2, '0')}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h2>
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

// ─── Content guards ────────────────────────────────────────────────────────────

/** Drops empty/whitespace-only strings so blank data never renders as a bullet. */
function clean(items?: string[]): string[] {
  return (items ?? []).filter((item) => item.trim().length > 0)
}

function hasText(value?: string): boolean {
  return typeof value === 'string' && value.trim().length > 0
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

  // Resolve which sections actually have content. Anything absent is skipped
  // entirely rather than rendered as an empty shell, and section numbers are
  // assigned from what survives so the sequence never skips.
  const design = study.technicalDesign
  const designFeatures = clean(design?.coreFeatures)
  const designChallenges = (design?.challenges ?? []).filter((c) => hasText(c.description))
  const hasDesign = hasText(design?.description) || designFeatures.length > 0 || designChallenges.length > 0

  const measurements = study.measurements ?? []
  const figures = study.figures ?? []
  const excerpts = study.excerpts ?? []
  // A table with headers but no usable rows would render as an empty shell.
  const tables = (study.tables ?? []).filter(
    (t) => t.columns.length > 0 && t.rows.some((row) => row.length === t.columns.length),
  )

  const results = clean(study.outcomes?.results)
  const techStack = clean(study.outcomes?.techStack)
  const nextSteps = clean(study.outcomes?.nextSteps)
  const hasOutcomes = results.length > 0 || techStack.length > 0 || nextSteps.length > 0

  let section = 0

  return (
    <div className="px-6 pb-32 pt-28 md:pt-36">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.20em] text-white/55 transition-colors duration-200 hover:text-white/65"
        >
          <ArrowLeft />
          All Projects
        </Link>

        {/* ── Hero ───────────────────────────────────────────────────────────── */}

        <div className="mt-10">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-white/55">
            Case Study
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            {project.title}
          </h1>

          <p className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-white/55">
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
                  <p className="font-mono text-[0.60rem] uppercase tracking-[0.16em] text-white/55">
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
          {study.heroImageSrc && (
            <div className="mt-12">
              {/* `contain` rather than `cover`: hardware photos aren't shot to a
                  fixed ratio, and cropping one to 16:9 cuts off the board the
                  image exists to show. The panel background fills the letterbox. */}
              <div className="relative aspect-video overflow-hidden border border-white/12 bg-white/[0.02]">
                <Image
                  src={study.heroImageSrc}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 64rem, 100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Overview ───────────────────────────────────────────────────────── */}

        {hasText(study.overview) && (
          <>
            <SectionHeader index={++section} title="Overview" />
            <p className="text-sm leading-7 text-white/60 md:text-base">{study.overview}</p>
          </>
        )}

        {/* ── Technical Design ───────────────────────────────────────────────── */}

        {hasDesign && (
          <>
            <SectionHeader index={++section} title="Technical Design" />

            {hasText(design?.description) && (
              <p className="text-sm leading-7 text-white/60 md:text-base">{design?.description}</p>
            )}

            {designFeatures.length > 0 && (
              <div className="mt-10">
                <BulletList items={designFeatures} />
              </div>
            )}

            {designChallenges.length > 0 && (
              <div className="mt-10 space-y-5">
                {designChallenges.map((item, i) => (
                  <div key={i} className="border border-white/10 px-7 py-6 md:px-8 md:py-7">
                    <h3 className="text-base font-semibold text-white md:text-lg">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/55 md:text-base">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Measurements ───────────────────────────────────────────────────── */}

        {measurements.length > 0 && (
          <>
            <SectionHeader index={++section} title="Measurements" />
            <dl className="grid grid-cols-1 gap-px border border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {measurements.map((m) => (
                <div key={m.label} className="bg-background px-6 py-6">
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/55">
                    {m.label}
                  </dt>
                  <dd className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    {m.value}
                  </dd>
                  {m.method && (
                    <p className="mt-2 text-xs leading-5 text-white/55">{m.method}</p>
                  )}
                </div>
              ))}
            </dl>
          </>
        )}

        {/* ── Figures ────────────────────────────────────────────────────────── */}

        {figures.length > 0 && (
          <>
            <SectionHeader index={++section} title="Diagrams" />
            <div className="space-y-12">
              {figures.map((fig) => (
                <figure key={fig.src}>
                  {/* Defaults to 16:9; a figure that declares its own dimensions
                      (a tall wiring diagram, a ladder rung) keeps its real shape
                      instead of being letterboxed. */}
                  <div className="relative overflow-hidden border border-white/12 bg-white/[0.02]">
                    <Image
                      src={fig.src}
                      alt={fig.alt}
                      width={fig.width ?? 1600}
                      height={fig.height ?? 900}
                      sizes="(min-width: 1024px) 64rem, 100vw"
                      className="mx-auto h-auto w-full"
                      style={
                        fig.width && fig.height
                          ? { maxWidth: `${fig.width}px` }
                          : undefined
                      }
                    />
                  </div>
                  <figcaption className="mt-3 text-sm leading-6 text-white/55">
                    {fig.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        )}

        {/* ── Tables ─────────────────────────────────────────────────────────── */}

        {tables.length > 0 && (
          <>
            <SectionHeader index={++section} title="Reference" />
            <div className="space-y-12">
              {tables.map((table) => (
                <div key={table.title}>
                  <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/55">
                    {table.title}
                  </h3>

                  {/* Scrolls within its own box so a wide I/O list never forces
                      the page itself to scroll sideways on mobile. */}
                  <div className="mt-4 overflow-x-auto border border-white/12">
                    <table className="w-full min-w-[36rem] border-collapse text-left">
                      <thead>
                        <tr className="border-b border-white/12 bg-white/[0.02]">
                          {table.columns.map((col) => (
                            <th
                              key={col}
                              scope="col"
                              className="px-4 py-3 font-mono text-[0.62rem] font-normal uppercase tracking-[0.16em] text-white/55"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows
                          // A ragged row would silently shift every cell after
                          // it under the wrong heading, so drop it instead.
                          .filter((row) => row.length === table.columns.length)
                          .map((row, i) => (
                            <tr
                              key={i}
                              className="border-b border-white/8 last:border-b-0"
                            >
                              {row.map((cell, j) => (
                                <td
                                  key={j}
                                  className={`px-4 py-3 align-top text-sm leading-6 ${
                                    j === 0
                                      ? 'font-mono text-[0.75rem] text-white/80'
                                      : 'text-white/65'
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {table.caption && (
                    <p className="mt-3 text-sm leading-6 text-white/55">{table.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Code ───────────────────────────────────────────────────────────── */}

        {excerpts.length > 0 && (
          <>
            <SectionHeader index={++section} title="Code" />
            <div className="space-y-10">
              {excerpts.map((ex) => (
                <div key={ex.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/55">
                      {ex.title}
                    </h3>
                    {ex.sourceUrl && (
                      <a
                        href={ex.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/55 transition-colors duration-200 hover:text-white/80"
                      >
                        View on GitHub
                      </a>
                    )}
                  </div>
                  <CodeBlock code={ex.code} language={ex.language} />
                  <p className="mt-3 text-sm leading-6 text-white/55">{ex.caption}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Outcomes ───────────────────────────────────────────────────────── */}

        {hasOutcomes && (
          <>
            <SectionHeader index={++section} title="Outcomes" />

            {results.length > 0 && <BulletList items={results} />}

            {techStack.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/55"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {nextSteps.length > 0 && (
              <div className="mt-10">
                <p className="mb-5 font-mono text-[0.65rem] uppercase tracking-[0.20em] text-white/55">
                  Next Steps
                </p>
                <BulletList items={nextSteps} />
              </div>
            )}
          </>
        )}

        {/* ── Bottom navigation ──────────────────────────────────────────────── */}

        <div className="mt-20 border-t border-white/10 pt-10 md:mt-24 md:pt-12">
          <div className="flex items-center justify-between">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.20em] text-white/55 transition-colors duration-200 hover:text-white/65"
              >
                <ArrowLeft />
                <span className="hidden lg:inline">Prev —&nbsp;</span>
                {prevProject.title}
              </Link>
            ) : (
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.20em] text-white/55 transition-colors duration-200 hover:text-white/65"
              >
                <ArrowLeft />
                All Projects
              </Link>
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.20em] text-white/55 transition-colors duration-200 hover:text-white/65"
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
