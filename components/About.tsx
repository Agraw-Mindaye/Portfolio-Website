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

// skill icons
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

function SkillTile({ icon, label, accent }: { icon: ReactNode; label: string; accent: string }) {
  const border =
    accent === 'blue'
      ? 'border-blue-500 md:group-hover:border-blue-600'
      : 'border-teal-500 md:group-hover:border-teal-600'
  const glow = accent === 'blue' ? 'ring-blue-500/25' : 'ring-teal-500/25'
  const hoverBg = accent === 'blue' ? 'md:hover:bg-blue-50' : 'md:hover:bg-teal-50'
  const hoverText =
    accent === 'blue' ? 'md:group-hover:text-blue-700' : 'md:group-hover:text-teal-700'

  return (
    <div
      className={`
        group relative rounded-2xl bg-gray-50 ${hoverBg}
        border-4 ${border}
        w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36
        p-4 shadow-sm flex flex-col items-center justify-center
        transition-transform duration-200 md:hover:scale-[1.06]
      `}
    >
      <div className={`text-3xl sm:text-4xl md:text-5xl text-slate-900 ${hoverText}`}>{icon}</div>
      <span className="mt-2 text-sm sm:text-base text-slate-900">{label}</span>

      {/* hover animation for desktop */}
      <span
        className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 md:group-hover:opacity-100 transition ring-1 ${glow}`}
      />
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Centered section title */}
        <div className="flex flex-col justify-center">
          <h2 className="text-slate-900 text-3xl font-bold text-center border-b-2 border-blue-500 inline-block pb-2 mb-8">
            About
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-30">
          {/* Left-side details  */}
          <div className="space-y-5 text-gray-900/90 leading-relaxed">
            <div className="flex justify-center">
              <FaUserAlt className="text-slate-900/20 text-[6rem] sm:text-[8rem] md:text-[10rem] leading-none" />
            </div>
            <p>
              {"I'm a Software Engineer focused on full-stack development and embedded systems. "}
              {"Driven by a passion for problem solving, I'm committed "}
              to building effecient embedded and full-stack solutions. With expertise in modern
              technologies like C/C++, Python, React, and SQL, I strive to craft seamless user
              experiences and write clean, maintainble code.
              {
                "When I'm not at my computer, I spend my time cooking, staying active, and exploring new music."
              }
            </p>
          </div>

          {/* Right-side skills */}
          <div className="flex justify-center gap-6 items-center self-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-5">
              {skillColumns[0].map((s) => (
                <SkillTile key={s.name} icon={s.icon} label={s.name} accent="teal" />
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-5 sm:mt-[-14px] md:mt-[-18px]">
              {skillColumns[1].map((s, i) => (
                <div
                  key={s.name}
                  className={`${i === 0 ? '' : i === skillColumns[1].length - 1 ? '' : ''}`}
                >
                  <SkillTile icon={s.icon} label={s.name} accent="blue" />
                </div>
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-5">
              {skillColumns[2].map((s) => (
                <SkillTile key={s.name} icon={s.icon} label={s.name} accent="teal" />
              ))}
            </div>
          </div>

          <p className="text-base sm:text-lg max-w-xl mx-auto text-gray-500 italic">
            In progress — more content coming soon.
          </p>
        </div>
      </div>
    </section>
  )
}
