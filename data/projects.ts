export type Project = {
  slug: string
  title: string
  type: string
  /** Short blurb for the card grid. Required — every project needs one. */
  description: string
  /**
   * Longer blurb for the featured slot. Optional: the featured component falls
   * back to `description`, so promoting any project can never render blank.
   */
  summary?: string
  year?: string
  tags: string[]
  imageSrc: string
  featured: boolean
}

export const PROJECTS: Project[] = [
  {
    slug: 'data-acquisition-platform',
    title: 'Secure Data Acquisition Platform',
    type: 'Firmware / Embedded Engineering',
    description:
      'Bare-metal Cortex-M33 sensor platform: register-level I2C drivers, an SPI microSD driver written from scratch, and authenticated encryption for data at rest.',
    summary:
      'Sole firmware developer on an embedded sensor-logging platform for a defense application. Brought the board up from first power-on — clock tree, peripheral init, runtime baseline — then built the full acquisition and storage path: register-level I2C drivers for inertial and thermal sensing, an SPI microSD driver written from scratch against a FAT filesystem, a self-describing wire format for the logged records, and authenticated encryption protecting data at rest. Validated through multi-hour continuous endurance runs.',
    year: '2026',
    tags: [
      'Embedded C',
      'ARM Cortex-M33',
      'Bare-metal',
      'I2C',
      'SPI',
      'FatFs',
      'Encryption',
    ],
    imageSrc: '/projects/data_acquisition_platform.jpeg',
    featured: true,
  },
  {
    slug: 'smart-environment-dashboard',
    title: 'Smart Environment Dashboard',
    type: 'Embedded Engineering',
    description:
      'ESP32-based firmware system that periodically samples temperature and humidity, logs readings to a microSD card over SPI, and renders live and historical data on a 16x2 I2C LCD with button navigation and auto-follow mode.',
    summary:
      'A modular ESP32 monitoring system that samples temperature and humidity on a fixed interval and persistently logs readings in CSV format to a microSD card over SPI. A 16x2 I2C LCD displays live and historical entries with physical button navigation and an auto-follow mode that tracks the latest entry unless overridden. The firmware is built in non-blocking cooperative layers with no delay() calls in the main loop.',
    year: '2025',
    tags: ['C++', 'ESP32', 'PlatformIO', 'I2C', 'SPI', 'DHT11'],
    imageSrc: '/projects/smart_environment_dashboard.jpg',
    featured: false,
  },
  {
    slug: 'led-control-panel',
    title: 'LED Control Panel',
    type: 'Firmware Engineering',
    description:
      'Arduino Mega 2560 firmware demonstrating interrupt-driven mode switching, a three-mode state machine, and non-blocking PWM control from analog input.',
    summary:
      'An interactive LED control system on the Arduino Mega 2560 built around hardware interrupts for deterministic mode switching, a three-mode state machine defining LED behavior, and non-blocking millis()-based timing throughout. Each mode maps potentiometer input to a different output: blink interval, PWM brightness, and direct RGB channel intensity.',
    year: '2025',
    tags: ['C++', 'PlatformIO', 'Arduino', 'GPIO', 'PWM', 'Interrupts'],
    imageSrc: '/projects/led_control_panel.png',
    featured: false,
  },
]
