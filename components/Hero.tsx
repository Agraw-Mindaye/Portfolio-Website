'use client'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen px-6 -mt-16"
    >
      <div className="w-full max-w-5xl text-center">
        {/* Title */}
        <h1 className="text-5xl font-bold leading-none tracking-tight text-white/60 sm:text-6xl md:text-7xl lg:text-8xl">
          Hi, I&apos;m <span className="text-white">Agraw</span>
        </h1>

        {/* Role */}
        <p className="mt-16 font-mono text-xs uppercase tracking-[0.35em] text-white/70 sm:text-sm md:text-base">
          Firmware &amp; Controls/Automation Engineer
        </p>
      </div>

      {/* Scroll CTA */}
      <button
        onClick={() => {
          const about = document.getElementById('about')
          if (!about) return
          const top = about.getBoundingClientRect().top + window.scrollY
          window.scrollTo({ top, behavior: 'smooth' })
        }}
        className="absolute bottom-10 flex flex-col items-center gap-3 group cursor-pointer"
        aria-label="Scroll to About"
      >
        {/* Mouse shell */}
        <div className="w-8 h-13 rounded-full border border-white/25 group-hover:border-white/55 flex items-center justify-center transition-all duration-500">
          {/* Animated arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/40 group-hover:text-white/70 transition-colors duration-500 animate-bounce"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </button>
    </section>
  )
}
