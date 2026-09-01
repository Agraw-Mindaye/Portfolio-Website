import Image from 'next/image'

import { RESUME_URL } from '@/lib/site'

// ─── Data ─────────────────────────────────────────────────────────────────────

// Values stay short enough to sit on one line in the narrow left column; the
// labels carry the context that would otherwise pad them out.
const FACTS = [
  { label: 'Based in', value: 'New Jersey / New York' },
  { label: 'Firmware Engineer', value: 'Stukes Defense' },
  { label: 'B.S. Computer Science', value: 'NJIT' },
]

export default function About() {
  const areas = [
    {
      title: 'Firmware Engineering',
      description:
        'Bare-metal firmware for ARM Cortex-M targets. Peripheral bring-up, protocol integration, and hardware validation.',
      skills: [
        'Embedded C/C++',
        'ARM Cortex-M',
        'STM32 / ESP32',
        'I2C / SPI / UART',
        'RTOS',
        'Debugging & Validation',
      ],
    },
    {
      title: 'Controls & Automation',
      description:
        'Industrial control systems, PLC logic design, and sensor integration. Bridging firmware behavior with physical process control.',
      // Trimmed to what current shipped work backs up. "System Sequencing",
      // "Diagnostics", and "Hardware / Software Integration" stay out until the
      // CCW/Micro800 project ships and gives them evidence to point at.
      skills: ['PLC Systems', 'Control Logic', 'Sensor Integration',],
    },
  ]

  return (
    <section id="about" className="scroll-mt-16 px-6 pt-16 pb-24 md:pt-18 md:pb-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center md:mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">About</h2>
        </div>

        {/* Bio block: portrait + facts on the left, prose on the right.
            The left column widens at lg so fact values ("Firmware Engineer,
            Stukes Defense") sit on one line, while staying narrow at md where a
            20rem portrait would out-weigh the prose beside it. */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-12">
          {/* Left column */}
          <div className="mx-auto w-full max-w-[240px] md:mx-0 md:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/20 bg-white/[0.02]">
              <Image
                src="/portrait.jpeg"
                alt="Portrait of Agraw Mindaye"
                fill
                sizes="(min-width: 1024px) 20rem, (min-width: 768px) 13rem, 240px"
                className="object-cover"
              />
            </div>

            <dl className="mt-6 space-y-4">
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/55">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-white/80">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right column: bio prose */}
          <div className="max-w-[62ch] space-y-5 text-[0.95rem] leading-7 text-white/75">
            <p>
              I&apos;m a firmware engineer at Stukes Defense, working on embedded systems for
              defense applications: bare-metal ARM Cortex-M development, sensor driver bring-up, and
              secure onboard data logging.
            </p>

            <p>
            I studied Computer Science during undergrad and spent most of it well above the hardware. 
            Embedded pulled me down the stack because the problems there settle: either the pin 
            goes high or it doesn't, and a scope will tell you which. 
            Most of my work now is drivers written against reference manuals, protocol traffic 
            traced on a logic analyzer, and state machines that have to hold up unattended. 
            Controls is where I'm headed next, where the logic stays the same but 
            I'll be moving real equipment.
            </p>

            {/* Placed here rather than nav-only: this is where someone who has
                just read the bio decides they want the full history. */}
            <div className="pt-2">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-white/20 px-5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/55 transition-colors duration-200 hover:border-white/40 hover:text-white/80"
              >
                Read the résumé
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
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Expertise */}
        <div className="mt-14 md:mt-16">
          <h3 className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/55">
            Expertise
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {areas.map((area) => (
              <div
                key={area.title}
                className="border border-white/15 bg-white/[0.02] px-6 py-6 md:px-7 md:py-7"
              >
                <h4 className="text-lg font-semibold leading-tight text-white">{area.title}</h4>

                <div className="mt-4 border-l border-white/15 pl-4">
                  <p className="text-sm leading-6 text-white/70">{area.description}</p>
                </div>

                <ul className="mt-5 flex list-none flex-wrap gap-2 p-0">
                  {area.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[0.60rem] uppercase tracking-[0.14em] text-white/70"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
