export type Project = {
  title: string
  description: string
  image?: string
  tech: string[]
  github?: string
  demo?: string
}

/**
 * Embedded & Controls (primary) */

export const embeddedProjects: Project[] = [
  {
    title: 'Smart Environment Dashboard',
    description:
      'ESP32-based environmental logger: periodic sensor sampling with CSV logging to MicroSD (SPI) and an I²C 16×2 LCD UI with button navigation + auto-scroll override',
    image: '/projects/smart_environment_dashboard.jpg',
    tech: [
      'C++', 
      'ESP32', 
      'I²C LCD', 
      'SPI MicroSD', 
      'Data Logging', 
      'Buttons/UI'
    ],
    github: 'https://github.com/Agraw-Mindaye/Smart-Environment-Dashboard',
    demo: 'https://www.youtube.com/watch?v=qR6wuf3IQvo&ab_channel=Agraw',
  },
  {
    title: 'LED Control Panel',
    description:
      'Arduino-based control panel using interrupts and a mode/state machine to switch LED behaviors (blink rate, PWM brightness, RGB channel intensity) with non-blocking timing',
    image: '/projects/led_control_panel.png',
    tech: [
      'C++', 
      'Arduino Mega 2560',
      'GPIO',
      'PWM',
      'Interrupts',
      'Non-blocking Timing',
    ],
    github: 'https://github.com/Agraw-Mindaye/LED-Control-Panel',
    demo: 'https://www.youtube.com/watch?v=vhHJIunVW4I&ab_channel=Agraw',
  },
  {
    title: 'Embedded Systems Portfolio',
    description: 'Structured firmware portfolio showcasing hands-on firmware development across microcontroller fundamentals, peripheral interfaces, and real-world hardware integration',
    image: '/projects/embedded_systems.jpg',
    tech: [
      'C',
      'C++',
      'GPIO',
      'ADC',
      'PWM',
      'UART',
      'Timers / Interrupts',
      'I2C',
      'SPI',
      'Displays',
      'Sensors',
      'Motors / Actuators',
      'SD Logging',
    ],
    github: 'https://github.com/Agraw-Mindaye/Embedded-Systems',
  },
]

/**
  * Software / Other (secondary)*/

export const otherProjects: Project[] = [
  {
    title: 'Bergen Routes',
    description:
      'Way-finding web application designed to assist users in navigating large buildings.',
    image: '/projects/bergen_routes.png',
    tech: ['Node.js', 'JavaScript', 'CSS', 'AutoCAD'],
    github: 'https://github.com/bergen-routes/bergenroutes.com',
    demo: 'https://bergenroutes.com/',
  },
  {
    title: 'Ethical Hacking Malware',
    description:
      'Security-focused simulations demonstrating common malware techniques and defensive lessons learned (educational use only).',
    image: '/projects/ethical_hacking.jpg',
    tech: ['C++'],
    github: 'https://github.com/Agraw-Mindaye/Ethical-Hacking-Malware',
    demo: 'https://youtu.be/rTSxzM5T_7I',
  },
]
