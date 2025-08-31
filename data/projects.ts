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
    title: 'Bergen Routes',
    description:
      'A way‑finding web application designed to assist users in navigating large buildings',
    image: '/projects/bergen_routes.png',
    tech: ['Node.JS', 'JavaScript', 'CSS', 'AutoCAD'],
    github: 'https://github.com/bergen-routes/bergenroutes.com',
    demo: 'https://bergenroutes.com/',
  },
  {
    title: 'Ethical Hacking Malware',
    description:
      'An interactive microcontroller-based system that cycles between different LED modes through physical switches',
    image: '/projects/ethical_hacking.jpg',
    tech: ['C++'],
    github: 'https://github.com/Agraw-Mindaye/Ethical-Hacking-Malware',
    demo: 'https://youtu.be/rTSxzM5T_7I',
  },
  {
    title: 'LED Control Panel',
    description:
      'An interactive microcontroller-based system that cycles between different LED modes through physical switches',
    image: '/projects/led_control_panel.png',
    tech: ['C++', 'Arduino', 'PWM'],
    github: 'https://github.com/Agraw-Mindaye/LED-Control-Panel',
    demo: 'https://www.youtube.com/watch?v=vhHJIunVW4I&ab_channel=Agraw',
  },
  {
    title: 'Embedded Systems',
    description: 'A collection of my embedded systems roadmap and projects',
    image: '/projects/embedded_systems.jpg',
    tech: ['C', 'C++', 'GDB', 'QEMU', 'RTOS'],
    github: 'https://github.com/Agraw-Mindaye/Embedded-Systems',
  },
]
