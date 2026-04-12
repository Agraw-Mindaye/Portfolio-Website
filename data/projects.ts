export type Project = {
  slug: string
  title: string
  type: string
  summary: string
  description: string
  tags: string[]
  imageSrc: string
  featured: boolean
}

export const PROJECTS: Project[] = [
  {
    slug: 'embedded-thermal-management',
    title: 'Embedded Thermal Management System',
    type: 'Firmware / Embedded Engineering',
    summary:
      'Designed and implemented a dual-microcontroller thermal management system using an STM32 Nucleo F030R8 as the control node and an ESP32 WROVER as the UI node. The STM32 runs a formal three-state finite state machine (MONITORING, COOLING, FAULT) with hysteresis-based bang-bang control, driving a PWM-actuated fan in response to live sensor data. System telemetry is transmitted over UART to the ESP32, which renders real-time temperature, humidity, and system state on an LCD display, with a web dashboard planned for remote visualization.',
    description: '',
    tags: ['Embedded C', 'STM32', 'ESP32', 'UART', 'PWM', 'I2C', 'ARM Cortex-M0'],
    imageSrc: '/projects/thermal_management.jpg',
    featured: true,
  },
  {
    slug: 'smart-environment-dashboard',
    title: 'Smart Environment Dashboard',
    type: 'Embedded Engineering',
    summary: '',
    description:
      'ESP32-based firmware system that periodically samples temperature and humidity, logs readings to a microSD card over SPI, and renders live and historical data on a 16x2 I2C LCD with button navigation and auto-follow mode.',
    tags: ['C++', 'ESP32', 'PlatformIO', 'I2C', 'SPI', 'DHT11'],
    imageSrc: '/projects/smart_environment_dashboard.jpg',
    featured: false,
  },
  {
    slug: 'led-control-panel',
    title: 'LED Control Panel',
    type: 'Firmware Engineering',
    summary: '',
    description:
      'Arduino Mega 2560 firmware demonstrating interrupt-driven mode switching, a three-mode state machine, and non-blocking PWM control from analog input.',
    tags: ['C++', 'PlatformIO', 'Arduino', 'GPIO', 'PWM', 'Interrupts'],
    imageSrc: '/projects/led_control_panel.png',
    featured: false,
  },
  {
    slug: 'embedded-systems-portfolio',
    title: 'Embedded Systems Portfolio',
    type: 'Embedded Systems',
    summary: '',
    description:
      'Structured firmware portfolio showcasing hands-on firmware development across microcontroller fundamentals, peripheral interfaces, and real-world hardware integration',
    tags: ['C', 'C++', 'PlatformIO', 'Arduino', 'ESP32', 'I2C', 'SPI', 'UART'],
    imageSrc: '/projects/embedded_systems.jpg',
    featured: false,
  },
]
