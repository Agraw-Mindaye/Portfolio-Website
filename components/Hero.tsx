'use client'

export default function Hero() {
  const scrollToContent = () => {
    const contentContainer = document.querySelector('.content-container')
    const navbarHeight = document.querySelector('nav')?.offsetHeight || 0

    if (contentContainer) {
      window.scrollTo({
        top: contentContainer.getBoundingClientRect().top + window.scrollY - navbarHeight,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 bg-background text-foreground"
      role="region"
      aria-label="Intro Section"
    >
      <div className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Hi, I'm <span className="text-blue-500">Agraw</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-10">
          Full-Stack & Embedded Systems Developer
        </p>
        <button
          onClick={scrollToContent}
          className="text-lg px-6 py-3 rounded-md bg-blue-500 text-white font-medium transition hover:bg-blue-600"
          aria-label="Scroll to view my work"
        >
          View My Work
        </button>
      </div>
    </section>
  )
}
