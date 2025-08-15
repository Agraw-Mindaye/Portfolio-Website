import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      {/* Sentinel that sits right below the hero */}
      <div id="nav-sentinel" className="h-px" />

      {/* Sticky Navbar */}
      <Navbar />

      {/* Spacer to account for the fixed navbar height */}
      <div aria-hidden className="h-[12px]" />

      <div className="content-container">
        <section id="about" className="scroll-mt-20">
          <About />
        </section>
        <section id="projects" className="scroll-mt-20">
          <Projects />
        </section>
        <section id="contact" className="scroll-mt-20">
          <Contact />
        </section>
      </div>

      <Footer />
    </>
  )
}
