// ─── Types ────────────────────────────────────────────────────────────────────

export type Metadata = {
  label: string
  value: string
}

export type Challenge = {
  title: string
  description: string
}

export type CaseStudy = {
  descriptor: string
  summary: string
  metadata: Metadata[]
  heroImageSrc: string
  codeUrl: string
  demoUrl: string
  overview: string
  technicalDesign: {
    description: string
    coreFeatures: string[]
    challenges: Challenge[]
  }
  outcomes: {
    results: string[]
    techStack: string[]
    nextSteps: string[]
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

  'embedded-systems-portfolio': {
    descriptor:
      'Structured multi-phase firmware portfolio covering MCU fundamentals and peripheral integration across Arduino Mega 2560 and ESP32 platforms.',
    summary:
      'A progressive firmware engineering portfolio organized into two phases: Phase 1 covering core embedded fundamentals (GPIO, ADC, PWM, UART, timers, and interrupts) and Phase 2 covering peripheral integration (I2C/SPI displays, sensor acquisition, actuator control, SD card logging, and embedded UI design). Each module contains a self-contained hardware project with documented firmware, reproducible wiring, and working demonstrations — built across Arduino Mega 2560 and ESP32 platforms using C and C++.',
    metadata: [
      {
        label: 'Role',
        value: 'Embedded Systems Engineer',
      },
      { label: 'Timeline', value: 'Started: March 2025' },
      {
        label: 'Status',
        value: 'In Progress, actively expanding',
      },
      { label: 'Platform', value: 'Arduino Mega 2560, ESP32 WROVER' },
    ],
    heroImageSrc: '/projects/embedded_systems.jpg',
    codeUrl: 'https://github.com/Agraw-Mindaye/Embedded-Systems',
    demoUrl: '#',
    overview:
      'A structured embedded firmware portfolio organized into two phases: Phase 1 covering MCU fundamentals (GPIO, ADC, PWM, UART, timers, interrupts) on Arduino Mega 2560, and Phase 2 covering peripheral integration (I2C/SPI displays, DHT11 sensor acquisition, servo control, SD card logging, and menu-driven UI) on ESP32 WROVER. Each module is a standalone PlatformIO project with working firmware and documented hardware setup, built to develop and demonstrate hands-on competency progressively — each phase introducing concepts the next applies in more complex, integrated contexts.',
    technicalDesign: {
      description:
        'All modules follow a consistent PlatformIO layout (include/, lib/, src/, test/) with non-blocking millis()-based timing and volatile-qualified ISR variables enforced as hard constraints across every module. Phase 1 modules are written in C++ with direct peripheral access; Phase 2 modules introduce driver abstractions for LCD, SD, and sensor peripherals with clear separation between initialization, data acquisition, and application logic. Hardware spans both platforms: Phase 1 uses Arduino Mega 2560 with LEDs, buttons, potentiometers, and UART; Phase 2 uses ESP32 WROVER integrating a DHT11 on GPIO, a 16x2 I2C LCD, an SPI microSD module, and a PWM-driven servo.',
      coreFeatures: [
        'Phase 1 — GPIO blink, interrupt-driven button input, potentiometer ADC to PWM LED brightness, UART serial control, and non-blocking timer/interrupt patterns.',
        'Phase 2 — I2C LCD UI with button and potentiometer navigation, DHT11 temperature/humidity acquisition with display output and menu system, servo motor control from analog input, and SPI SD card data logging.',
        'Cross-platform coverage: Arduino Mega 2560 (Phase 1) and ESP32 WROVER (Phase 2).',
      ],
      challenges: [
        {
          title: 'Maintaining Non-Blocking Behavior Across All Modules',
          description:
            'Enforcing non-blocking timing as a hard constraint across every module required restructuring several early implementations that used delay() for simplicity. This discipline became progressively easier as millis()-based state machines became the default mental model, and it paid off in Phase 2 where multiple concurrent tasks (sensor sampling, display updates, and button input) needed to coexist without interference.',
        },
        {
          title: 'Cross-Platform Peripheral Differences Between Arduino and ESP32',
          description:
            'Moving from the Arduino Mega to the ESP32 in Phase 2 introduced meaningful differences in pin capabilities, I2C/SPI initialization, and ADC resolution that required platform-specific adaptations rather than direct code reuse. Treating each platform on its own terms produced cleaner firmware and a better understanding of where platform differences actually matter.',
        },
      ],
    },
    outcomes: {
      results: [
        'All Phase 1 and Phase 2 modules are complete with working firmware and documented hardware setups.',
        'Firmware across all modules is non-blocking, no delay() calls in any main loop execution path.',
        'Cross-platform development demonstrated across Arduino Mega 2560 and ESP32 WROVER with correct peripheral initialization on each.',
      ],
      techStack: [
        'C',
        'C++',
        'PlatformIO',
        'Arduino CLI',
        'Arduino Mega 2560',
        'ESP32 WROVER',
        'I2C',
        'SPI',
        'UART',
        'GPIO',
        'PWM',
        'ADC',
        'Git',
      ],
      nextSteps: [
        'Begin Phase 3: RTOS fundamentals using FreeRTOS - task creation, semaphores, and queue-based inter-task communication.',
        'Add networking modules: Wi-Fi HTTP server and MQTT publishing on ESP32.',
        'Introduce STM32 as a third platform to cover bare-metal HAL development without an Arduino abstraction layer.',
      ],
    },
  },

  'embedded-thermal-management': {
    descriptor:
      'Closed-loop temperature controller with FSM-based logic, PWM fan actuation, and live UART telemetry dashboard.',
    summary:
      'Designed and implemented a dual-microcontroller thermal management system using an STM32 Nucleo F030R8 as the control node and an ESP32 WROVER as the UI node. The STM32 runs a formal three-state finite state machine (MONITORING, COOLING, FAULT) with hysteresis-based bang-bang control, driving a PWM-actuated fan in response to live sensor data. System telemetry is transmitted over UART to the ESP32, which renders real-time temperature, humidity, and system state on an LCD display, with a web dashboard planned for remote visualization.',
    metadata: [
      {
        label: 'Role',
        value:
          'Embedded Systems Engineering — firmware architecture, hardware integration, and system design',
      },
      { label: 'Timeline', value: 'Ongoing — started April 2026' },
      {
        label: 'Status',
        value: 'In Development',
      },
      { label: 'Platform', value: 'STM32 Nucleo F030R8 (ARM Cortex-M0), ESP32 WROVER' },
    ],
    heroImageSrc: '/projects/thermal_management.jpg',
    codeUrl: 'https://github.com/Agraw-Mindaye/thermal-management-system',
    demoUrl: '#',
    overview:
      'A dual-microcontroller thermal management system using an STM32 Nucleo F030R8 as the control node and an ESP32 WROVER as the UI node. The STM32 runs a formal three-state FSM (MONITORING, COOLING, FAULT) with hysteresis-based bang-bang control, driving a PWM-actuated fan based on live sensor data and transmitting structured ASCII telemetry over UART every 500ms. The ESP32 parses incoming frames and renders real-time temperature, humidity, and system state on an LCD. The system was designed to handle sensor faults gracefully with a defined FAULT state and fan shutdown, keeping the STM32 control loop fully decoupled from any UI-side latency.',
    technicalDesign: {
      description: 'In progress ...',
      coreFeatures: ['Expected Core Feature: ...'],
      challenges: [
        {
          title: 'Potential Challenge: Hysteresis Tuning and Control Stability',
          description: '',
        },
        {
          title: 'Potential Challenge: UART Frame Robustness Across MCU Boundaries',
          description: '',
        },
      ],
    },
    outcomes: {
      results: ['In progress ...'],
      techStack: [
        'Embedded C',
        'STM32CubeIDE',
        'ESP-IDF',
        'STM32 Nucleo F030R8',
        'ESP32 WROVER',
        'UART',
        'PWM',
        'I2C',
        'ARM Cortex-M0',
      ],
      nextSteps: [''],
    },
  },
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug]
}
