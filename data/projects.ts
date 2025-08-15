export type Project = {
  title: string
  description: string
  image?: string // optional; we render a fallback if missing
  tech: string[]
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    title: 'Smart Environment Dashboard',
    description:
      'A temperature and humidity sensor that logs readings onto an SD card and displays them on an LCD screen',
    image: '/projects/smart_environment_dashboard.jpg',
    tech: ['C++', 'ESP32', 'DHT11', 'I2C'],
    github: 'https://github.com/Agraw-Mindaye/Smart-Environment-Dashboard',
    demo: 'https://www.youtube.com/watch?v=qR6wuf3IQvo&ab_channel=Agraw',
  },
  {
    title: 'LED Control Panel',
    description:
      'An interactive microcontroller-based system that cycles between different LED modes through physical switches',
    image: '/projects/led_control_panel.png',
    tech: ['C++', 'Arduino', 'PWM'],
    github: 'https://github.com/youruser/algo-visualizer',
    demo: 'https://www.youtube.com/watch?v=vhHJIunVW4I&ab_channel=Agraw',
  },

  {
    title: 'Embedded Systems',
    description: 'A collection of my embedded systems roadmap and projects',
    image: '/projects/embedded_systems.jpg',
    tech: ['C', 'C++', 'GDB', 'QEMU', 'RTOS'],
    github: 'https://github.com/Agraw-Mindaye/Embedded-Systems',
  },
  {
    title: 'Portfolio Website',
    description:
      'A personal portfolio built with Next.js and Tailwind CSS. Showcases projects and skills with a responsive design',
    image: '/projects/portfolio_website.png',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/Agraw-Mindaye/Portfolio-Website',
    demo: 'https://www.agrawmin.com/',
  },
  {
    title: 'Bergen Routes',
    description:
      'A way‑finding web application designed to assist users in navigating large buildings',
    image: '/projects/bergen_routes.png',
    tech: ['Node.JS', 'JavaScript', 'CSS', 'AutoCAD'],
    github: 'https://github.com/bergen-routes/bergenroutes.com',
    demo: 'https://bergenroutes.com/',
  },
  {
    title: 'GPT from Scratch',
    description: 'An Implementaton a miniature Generative Pre-trained Transformer (GPT) in PyTorch',
    image: '/projects/gpt_from_scratch.png',
    tech: ['Python', 'PyTorch', 'Machine Learning'],
    github: 'https://github.com/Agraw-Mindaye/gpt-from-scratch',
    demo: 'https://www.youtube.com/watch?v=kCc8FmEb1nY&ab_channel=AndrejKarpathy',
  },
]
