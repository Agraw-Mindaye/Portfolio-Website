'use client'

import { useEffect, useState } from 'react'

const sections = ['about', 'projects', 'contact']

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('#about')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3
      let currentSection = '#about'

      for (const id of sections) {
        const section = document.getElementById(id)
        if (section) {
          const { top, height } = section.getBoundingClientRect()
          const sectionTop = window.scrollY + top
          if (scrollY >= sectionTop && scrollY < sectionTop + height) {
            currentSection = `#${id}`
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // optional: smooth scroll behavior for clicks
  const handleNavClick = (targetId: string) => {
    setActiveSection(`#${targetId}`)
    const target = document.getElementById(targetId)
    const navbarHeight = document.querySelector('nav')?.offsetHeight || 0

    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navbarHeight,
        behavior: 'smooth',
      })
    }
  }

  return { activeSection, handleNavClick }
}
