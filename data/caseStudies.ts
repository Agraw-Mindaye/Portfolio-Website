// ─── Types ────────────────────────────────────────────────────────────────────

export type Metadata = {
  label: string
  value: string
}

export type Challenge = {
  title: string
  description: string
}

/** A measured result from bench work. Never estimated — see the note below. */
export type Measurement = {
  label: string // "ISR latency"
  value: string // "4.2 µs"
  method?: string // "logic analyzer, 100 samples"
}

/**
 * A text excerpt. Graphical PLC languages (ladder, FBD) are not text — those
 * belong in `figures`.
 *
 * `language` accepts any Shiki language id plus the aliases in CodeBlock;
 * Structured Text ('st' / 'structured-text') maps to Pascal. An unrecognized
 * value degrades to unhighlighted text rather than failing the build.
 */
export type CodeExcerpt = {
  title: string // "Timer ISR — sample trigger"
  language: string // "c", "st", "python"
  code: string
  caption: string // why this excerpt matters
  sourceUrl?: string // deep link to the line range on GitHub
}

export type Figure = {
  src: string
  alt: string
  caption: string
  kind: 'block' | 'state' | 'schematic' | 'capture' | 'photo'
  /**
   * Intrinsic pixel dimensions. Optional, and only needed when the image isn't
   * roughly 16:9 — a tall wiring diagram or ladder rung would otherwise be
   * letterboxed inside the default aspect box. Pass the real dimensions and the
   * frame follows the image.
   */
  width?: number
  height?: number
}

/**
 * Tabular data: I/O lists, tag tables, pin assignments, register maps.
 *
 * Every row must have the same number of cells as `columns` — mismatches are
 * dropped at render time rather than producing a ragged table.
 */
export type Table = {
  title: string // "Digital I/O assignments"
  caption?: string
  columns: string[] // ["Tag", "Address", "Type", "Description"]
  rows: string[][]
}

/**
 * Every content field below the hero is optional. A study renders only the
 * sections it actually has, so an in-progress project reads as a short finished
 * page rather than a template with empty slots. Section numbering is derived at
 * render time, so gaps never produce a "01, 03" sequence.
 *
 * `measurements`, `excerpts`, and `figures` are authored from real bench work
 * and real repos. Leave them absent until that evidence exists — invented
 * numbers are worse than no numbers.
 *
 * Convention (not enforced by the type): a study without measurements doesn't
 * go in the featured slot. Thermal is a standing exception while its content is
 * being written; the rule applies from the next featured project onward.
 */
export type CaseStudy = {
  descriptor: string
  summary: string
  metadata: Metadata[]
  heroImageSrc?: string
  codeUrl?: string
  demoUrl?: string
  /**
   * One paragraph, or several. Pass an array for multi-paragraph copy — a
   * single string with embedded newlines will collapse to one block, since the
   * rendered element uses normal whitespace handling.
   */
  overview?: string | string[]
  technicalDesign?: {
    description?: string
    coreFeatures?: string[]
    challenges?: Challenge[]
  }
  measurements?: Measurement[]
  figures?: Figure[]
  tables?: Table[]
  excerpts?: CodeExcerpt[]
  outcomes?: {
    results?: string[]
    techStack?: string[]
    nextSteps?: string[]
  }
}

// ─── Case study registry ──────────────────────────────────────────────────────

export const CASE_STUDIES: Record<string, CaseStudy> = {
  'smart-environment-dashboard': {
    descriptor:
      'ESP32 environmental monitoring system with SPI data logging to microSD, I2C LCD display, and interrupt-driven button navigation.',
    summary:
      'Built a modular embedded monitoring system on the ESP32 that periodically samples temperature and humidity via a DHT11 sensor and persistently logs readings in CSV format to a microSD card over SPI. A 16x2 I2C LCD provides real-time display of live and historical entries, with physical button navigation and an auto-follow mode that automatically tracks the latest log entry unless overridden by the user. The firmware is architected in non-blocking, cooperative layers, demonstrating deterministic task scheduling through interval-based timing.',
    metadata: [
      {
        label: 'Role',
        value: 'Embedded Systems Engineer',
      },
      { label: 'Timeline', value: 'March 2025 – May 2025' },
      {
        label: 'Status',
        value: 'Complete',
      },
      { label: 'Platform', value: 'ESP32' },
    ],
    heroImageSrc: '/projects/smart_environment_dashboard.jpg',
    codeUrl: 'https://github.com/Agraw-Mindaye/Smart-Environment-Dashboard',
    demoUrl: 'https://www.youtube.com/watch?v=qR6wuf3IQvo&ab_channel=Agraw',
    overview:
      'An ESP32-based firmware system that continuously samples temperature and humidity via a DHT11 sensor, logs readings in CSV format to a microSD card over SPI, and displays live and historical data on a 16x2 I2C LCD with physical button navigation.',
    technicalDesign: {
      description:
        'Hardware is wired with the DHT11 on a GPIO pin, the microSD module on SPI, the LCD on I2C, and two buttons on pull-up inputs — all initialized and validated in setup() before the main loop begins. Correctness was verified by confirming log entries on SD matched expected sensor output at the correct intervals, and that button navigation and auto-follow transitions produced no missed or duplicated entries under continuous logging.',
      coreFeatures: [
        'Periodic DHT11 temperature and humidity sampling.',
        'Persistent CSV log to microSD card.',
        '16x2 I2C LCD displaying live or historical sensor readings with auto-follow mode that tracks the latest entry by default.',
        'Physical button navigation allowing the user to scroll backward through stored log entries, with auto-follow pausing on manual scroll and resuming on return to the latest entry.',
      ],
      challenges: [
        {
          title: 'Non-Blocking UI During Concurrent SD Writes',
          description:
            'SD card write operations on the ESP32 can introduce brief blocking delays that, if not handled carefully, cause the LCD to stutter or miss button input. Structuring writes as fire-and-forget operations within a timed interval isolated the latency and kept the UI consistently responsive. This reinforced the importance of treating each peripheral as an independent timed task rather than a sequential step.',
        },
      ],
    },
    outcomes: {
      results: [
        'System logs temperature and humidity readings to microSD at consistent intervals with no missed samples observed during continuous bench runs.',
        'Button navigation correctly pauses auto-follow and allows full backward scroll through stored log entries without interrupting background logging.',
        'Auto-follow resumes correctly on return to the latest entry in all tested interaction sequences.',
        'Firmware operates fully non-blocking — no delay() calls in the main loop.',
      ],
      techStack: ['C++', 'PlatformIO', 'ESP32', 'DHT11', 'I2C', 'SPI', 'microSD', 'GPIO'],
      nextSteps: [
        'Add RTC or NTP-based timestamping to replace index-based log entries.',
        'Migrate periodic task scheduling to FreeRTOS for more deterministic multi-task timing.',
        'Add SD card error detection and graceful recovery on write failure.',
      ],
    },
  },

  'led-control-panel': {
    descriptor:
      'Arduino Mega 2560 firmware demonstrating interrupt-driven input handling, mode-based state machine, and real-time PWM control from analog input.',
    summary:
      'Implemented an interactive LED control system on an Arduino Mega 2560 using a push button, potentiometer, and RGB LED to demonstrate foundational embedded firmware concepts. The firmware uses hardware interrupts for deterministic mode switching, a three-mode state machine to define LED behavior, and non-blocking millis()-based timing throughout. Each mode maps potentiometer input to a different output behavior: blink interval control, PWM brightness control, and direct RGB channel intensity mapping.',
    metadata: [
      {
        label: 'Role',
        value: 'Embedded Systems Engineer',
      },
      { label: 'Timeline', value: 'Jan 2025 – Feb 2025' },
      {
        label: 'Status',
        value: 'Complete',
      },
      { label: 'Platform', value: 'Arduino Mega 2560' },
    ],
    heroImageSrc: '/projects/led_control_panel.png',
    codeUrl: 'https://github.com/Agraw-Mindaye/LED-Control-Panel',
    demoUrl: 'https://www.youtube.com/watch?v=vhHJIunVW4I&ab_channel=Agraw',
    overview:
      'An Arduino Mega 2560 firmware project demonstrating interrupt-driven input handling, state machine design, and non-blocking execution on a bare-metal MCU. A push button cycles between three operating modes while a potentiometer provides continuous analog input that drives a different LED output behavior in each mode.',
    technicalDesign: {
      description:
        'The main loop reads the flag, applies millis()-based debounce, samples the potentiometer, and dispatches to the active mode handler. Each mode is a standalone function — Mode 0 maps potentiometer value to blink interval, Mode 1 maps it to PWM duty cycle, Mode 2 maps it to the RGB red channel. ADC values are mapped to PWM output using the Arduino map() function.',
      coreFeatures: [
        'Hardware interrupt for immediate, asynchronous mode switching independent of main loop state.',
        'Three-mode state machine: blink interval control, PWM brightness control, and RGB red channel intensity mapping.',
        'Non-blocking timing throughout using millis() — no delay() calls in any execution path.',
      ],
      challenges: [
        {
          title: 'Debounce Without Blocking',
          description:
            'Mechanical button bounce caused multiple ISR triggers per physical press, resulting in mode skips. Implementing a millis()-based debounce check in the main loop resolved this while keeping the ISR minimal and fast.',
        },
      ],
    },
    outcomes: {
      results: [
        'Mode switching responds immediately to button input at any point in program execution with no missed transitions observed.',
        'All three modes produce correct output behavior across the full potentiometer range.',
        'Firmware operates entirely non-blocking — no delay() calls in any code path.',
        'ISR-to-main communication is reliable across all tested interaction sequences with no observed race conditions.',
      ],
      techStack: [
        'C++',
        'PlatformIO',
        'Arduino Mega 2560',
        'GPIO',
        'PWM',
        'Interrupts',
        'Analog Input',
        'millis()',
      ],
      nextSteps: [
        'Expand to full RGB channel control with independent potentiometer mapping per channel.',
        'Add configurable software debouncing with adjustable threshold.',
        'Extend mode logic into a more formal FSM with defined transition conditions and entry/exit actions.',
      ],
    },
  },

  'data-acquisition-platform': {
  descriptor:
    'Bare-metal Cortex-M33 sensor platform with SD storage and authenticated encryption',
  summary:
    'Sole firmware developer on an embedded sensor-logging platform for a defense application. Brought the board up from first power-on (clock tree, peripheral init, runtime baseline) then built the full acquisition and storage path: register-level I2C drivers for inertial and thermal sensing, an SPI microSD driver written from scratch against a FAT filesystem, a self-describing wire format for the logged records, and authenticated encryption protecting data at rest. Validated through multi-hour continuous endurance runs.',
  metadata: [
    {
      label: 'Role',
      value: 'Sole firmware engineer –– bring-up, drivers, storage, encryption, validation',
    },
    { label: 'Timeline', value: 'In development — 2026' },
    { label: 'Status', value: 'Active development' },
    { label: 'Platform', value: 'ARM Cortex-M33, bare-metal C' },
    { label: 'Context', value: 'Stukes Defense' },
  ],
  heroImageSrc: '/projects/data_acquisition_platform.jpeg',
  overview: [
    'A bare-metal firmware platform that acquires inertial and thermal sensor data, encodes it into a self-describing record format, and writes it to removable storage under authenticated encryption. The system is built to log continuously for hours without intervention, survive interruption without corrupting the record, and make tampering with stored data detectable rather than silent.',
    'I joined at first power-on and built the stack as the sole firmware developer: clock and peripheral configuration, sensor drivers written directly against register maps with explicit device validation and error handling, a block-level SPI storage driver implemented from scratch rather than pulled from a vendor example, the encoding and block-assembly pipeline, and the cryptographic layer. The architecture separates drivers, sensor abstraction, encoding, and application flow so the same firmware carries forward across hardware revisions.',
  ],
  technicalDesign: {
    description:
      'Three design constraints shaped the system. Acquisition had to stay deterministic while storage writes contended for time on the same core, so the sampling path is decoupled from the write path rather than sharing a call stack. The record format had to be self-describing, so a reader can parse a session without out-of-band knowledge of what was logged or in what order. And storage had to be resilient to interruption, since a session that ends unexpectedly still has to leave a readable record behind rather than a truncated one.',
    coreFeatures: [
      'Board bring-up from first power-on: clock configuration, peripheral initialization, validated runtime baseline',
      'Register-level I2C drivers for inertial and thermal sensing with device identity checks and structured error handling',
      'SPI block storage driver written from scratch against a FAT filesystem — initialization sequence, block read/write, session-based file management',
      'Self-describing record encoding and block assembly against a formal wire-format specification',
      'Authenticated encryption for data at rest, including nonce construction and key handling',
      'Layered architecture separating drivers, sensor abstraction, encoding, and application flow',
    ],
    challenges: [
      // TODO — Agraw fills these in. Pick the two or three that actually cost
      // the most days. This section is where the case study earns the featured
      // slot, and it's fully publishable: how you found a bug reveals your
      // process, not the product's design.
      //
      // Format for each: what broke, what the symptom looked like, how you
      // instrumented it, what the fix turned out to be. Describe the problem
      // class generically ("writes were stalling the sample loop") rather than
      // the system's internals.
    ],
  },
  outcomes: {
    results: [
      'Verified end-to-end: real session data decrypts and parses correctly, and deliberately tampered records are rejected rather than silently accepted',
      'Sustained continuous logging across multi-hour endurance runs with storage integrity and encryption reliability intact',
      // TODO — add relative figures if you have them. Ratios and bounds rather
      // than absolutes: "logged at Nx the required sample rate", "N hours
      // continuous with zero corrupted records", "worst-case loop time stayed
      // under budget across the full run". Avoid figures precise enough to
      // characterize the system.
    ],
    techStack: [
      'Embedded C',
      'ARM Cortex-M33',
      'Bare-metal firmware',
      'I2C',
      'SPI',
      'FatFs / FAT32',
      'Authenticated encryption',
      'Endurance & stress testing',
    ],
  },
  // Deliberately absent, not missing: figures, excerpts, measurements, codeUrl,
  // demoUrl, heroImageSrc. This case study ships without diagrams, code, or
  // hardware photos because the work is under a confidentiality constraint.
  // Do not populate these — their absence is the point.
}
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug]
}
