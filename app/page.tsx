import Hero from '@/components/Hero'
import About from '@/components/About'

export default function Home() {
  return (
    <>
      <Hero />
      <section id="about" className="scroll-mt-24">
        <About />
      </section>

      <section id="projects" className="scroll-mt-24">
        {/* <Projects /> */}
      </section>

      <section id="contact" className="scroll-mt-24">
        {/* <Contact /> */}
      </section>
    </>
  )
}
