export default function About() {
  const areas = [
    {
      title: 'Firmware Engineering',
      subtitle: 'Embedded Systems & Low-Level Development',
      description:
        'Specialized in bare-metal firmware for ARM Cortex-M targets. Covers peripheral bring-up, protocol integration, and hardware validation across embedded platforms.',
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
      subtitle: 'System Logic & Automation Workflows',
      description:
        'Focused on industrial control systems, PLC logic design, and sensor integration. Bridging firmware behavior with real-world process control, automation sequencing, and system-level diagnostics.',
      skills: [
        'PLC Systems',
        'Control Logic',
        'System Sequencing',
        'Sensor Integration',
        'Diagnostics',
        'Hardware / Software Integration',
      ],
    },
  ]

  return (
    <section id="about" className="scroll-mt-16 px-6 pt-16 pb-24 md:pt-18 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            My Expertise
          </h2>
        </div>

        <div className="overflow-hidden border border-white/20 bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {areas.map((area, index) => (
              <div
                key={area.title}
                className={[
                  'px-8 py-10 md:px-10 md:py-12',
                  index === 0 ? 'md:border-r md:border-white/20' : '',
                  index > 0 ? 'border-t border-white/20 md:border-t-0' : '',
                ].join(' ')}
              >
                <div className="max-w-xl">
                  <h3 className="mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl">
                    {area.title}
                  </h3>

                  <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-white/55">
                    {area.subtitle}
                  </p>

                  <div className="mt-8 border-l border-white/15 pl-5">
                    <p className="text-sm leading-7 text-white/72 md:text-base">
                      {area.description}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {area.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/72 sm:text-[0.72rem]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
