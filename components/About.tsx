'use client'

import {
  FaReact,
  FaPython,
  FaGitAlt,
  FaDatabase,
  FaJsSquare,
  FaNodeJs,
  FaUserAlt,
} from 'react-icons/fa'
import { SiC, SiCplusplus, SiNextdotjs, SiExpress } from 'react-icons/si'
import { ReactNode } from 'react'

// Skill groups
const skillColumns = [
  [
    { name: 'C', icon: <SiC /> },
    { name: 'C++', icon: <SiCplusplus /> },
    { name: 'Python', icon: <FaPython /> },
  ],
  [
    { name: 'JavaScript', icon: <FaJsSquare /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'SQL', icon: <FaDatabase /> },
    { name: 'Git', icon: <FaGitAlt /> },
  ],
  [
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'Express.js', icon: <SiExpress /> },
  ],
]

function SkillIcon({
  icon,
  label,
  accent,
}: {
  icon: ReactNode
  label: string
  accent: 'blue' | 'teal'
}) {
  const border =
    accent === 'blue'
      ? 'border-blue-500 md:group-hover:border-blue-600'
      : 'border-teal-500 md:group-hover:border-teal-600'
  const glow = accent === 'blue' ? 'ring-blue-500/25' : 'ring-teal-500/25'
  const hoverBg = accent === 'blue' ? 'md:hover:bg-blue-50' : 'md:hover:bg-teal-50'
  const hoverText =
    accent === 'blue' ? 'md:group-hover:text-blue-700' : 'md:group-hover:text-teal-700'

  return (
    <figure
      className={`
        group relative rounded-2xl bg-gray-50 ${hoverBg}
        border-4 ${border}
        w-[84px] h-[84px] sm:w-[96px] sm:h-[96px] md:w-[100px] md:h-[100px]
        p-4 shadow-sm flex flex-col items-center justify-center
        transition-transform duration-200 md:hover:scale-[1.06]
      `}
      aria-label={label}
    >
      <div className={`text-2xl sm:text-4xl md:text-5xl text-slate-900 ${hoverText}`}>{icon}</div>
      <figcaption className="mt-2 text-xs sm:text-sm md:text-base text-slate-900">
        {label}
      </figcaption>
      <span
        className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 md:group-hover:opacity-100 transition ring-1 ${glow}`}
      />
    </figure>
  )
}

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-20 md:py-16 bg-white" aria-labelledby="about-title">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title */}
        <header className="flex flex-col items-center mb-12 sm:mb-16">
          <h2
            id="about-title"
            className="text-slate-900 text-3xl sm:text-4xl md:text-5xl font-bold text-center border-b-2 border-blue-500 inline-block pb-2"
          >
            About
          </h2>
        </header>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Summary */}
          <div className="space-y-6 text-gray-900/90 leading-relaxed">
            <div className="flex justify-center">
              <FaUserAlt className="text-slate-900/20 text-[6rem] sm:text-[8rem] md:text-[10rem]" />
            </div>
            <p className="text-base sm:text-lg">
              I'm a Software Engineer focused on full-stack development and embedded systems. Driven
              by a passion for problem solving, I'm committed to building efficient embedded and
              full-stack solutions. With expertise in modern technologies like C/C++, Python, React,
              and SQL, I strive to craft seamless user experiences and write clean, maintainable
              code.
              <br />
              <br />
              When I'm not at my computer, I spend my time cooking, staying active, and exploring
              new music.
            </p>
          </div>

          {/* Right - Skills Grid */}
          <div className="flex justify-center items-center gap-4 sm:gap-6">
            {skillColumns.map((column, idx) => (
              <div key={idx} className="flex flex-col gap-4 sm:gap-5">
                {column.map((skill) => (
                  <SkillIcon
                    key={skill.name}
                    icon={skill.icon}
                    label={skill.name}
                    accent={idx % 2 === 0 ? 'teal' : 'blue'}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-sm sm:text-base max-w-xl mx-auto text-center text-gray-500 italic">
          In progress — more content coming soon.
        </p>
      </div>
    </section>
  )
}
