# Shammichalas — Creative Portfolio

A cinematic, interactive, and immersive developer portfolio built on a highly polished web tech stack. The website is crafted to offer an unforgettable first impression by blending standard portfolio details with high-end, responsive 3D physics and hardware-accelerated rendering.

---

## 🌌 The Cinematic Hero Section

The **Hero Section** (`HeroSection.jsx`) is designed to feel like an interactive video game entrance or a premium digital canvas. Rather than relying on simple CSS backgrounds or heavy, unoptimized video feeds, it implements a highly advanced **Frame-by-Frame Canvas Sequence Engine**.

### Core Architecture:
1. **Preloaded Canvas Sequence**: 
   - Preloads **40 high-resolution cinematic frames** (`ezgif-frame-001.jpg` to `040.jpg`) on load.
   - Tracks load progress dynamically through a custom visual preloader screen (`Loader.jsx`) which leverages `<AnimatePresence>` for elegant fadeouts.
   - Provides a safety timeout fallback mechanism to automatically resolve loading states in less-than-ideal network environments.
2. **Responsive Canvas Cover Rendering**:
   - Uses an HTML5 `<canvas>` that resizes responsively to match both mobile screens and ultra-wide desktop configurations.
   - Calculates custom scale ratios (similar to CSS `object-fit: cover`) to keep coordinates centered and cropped with maximum visual balance.
3. **Cursor-Reactive Spotlight Overlay**:
   - Captures cursor movement in real time and updates CSS variables (`--mouse-x` and `--mouse-y`).
   - Uses these coordinates to paint a soft spotlight glow overlay that dynamically tracks across the viewport, reacting to your every hover.
4. **Floating Interactive Tech Stack Node Net**:
   - Displays floating **Glassmorphic Tech Node Cards** representing core competencies (React, Python, AWS, Docker, OpenAI, etc.).
   - Integrates glowing connection lines (`ConnectionLines.jsx`) that form a living constellation linking the floating cards across the canvas space.

---

## 🎬 GSAP ScrollTrigger Integration

**GSAP (GreenSock Animation Platform)** serves as the high-precision timeline sequencer, driving all scroll-based changes with fluid, hardware-accelerated responsiveness.

### How GSAP is Used:
* **Frame Sequence Scrubbing**:
  - Leverages GSAP’s `ScrollTrigger` to bind the 40-frame sequence to the user's scrollbar.
  - As you scroll down, GSAP scrubs the timeline, drawing successive frames onto the `<canvas>` dynamically based on scroll depth.
* **Cinematic Camera Zoom**:
  - As the sequence advances, a GSAP timeline slowly scales the canvas element up (`scale(1.02)` to `scale(1.06)`).
  - This mimics a physical camera sliding forward, giving the user a deep 3D flying feel.
* **Staggered Entrance Animation**:
  - Coordinates a staggered load-in timeline (`gsap.timeline`) for the hero text components (small tags, headings, descriptions, call-to-actions, and social links).
  - Animates layout coordinates smoothly upward (`y: 25` to `0`) using a buttery ease (`ease: 'power3.out'`).
* **Sequential Fadeouts**:
  - Automatically fades out and lifts text blocks one-by-one as the user scrolls, clearing the viewport and maintaining clean contrast as the canvas frame transitions.

---

## ⚡ Framer Motion & Physics Engine

While GSAP orchestrates complex scroll timelines, **Framer Motion** powers individual component interactions, spring-based micro-animations, and fluid 3D transformations.

### How Framer Motion is Used:
* **Buttery Spring Physics**:
  - Floating tech cards (`FloatingCards.jsx`) monitor user mouse coordinates.
  - Coordinate inputs are mapped through Framer Motion’s `useSpring` hooks to smooth out abrupt mouse movements with custom mass, stiffness, and damping coefficients.
* **3D Mouse Parallax & Tilting**:
  - Uses `useTransform` to translate mouse movements into custom 3D rotations (`rotateX`, `rotateY`) and coordinates (`x`, `y`).
  - Assigns individual **depth coefficients** to each card (e.g. `0.24` for Docker, `0.10` for Python). Cards with higher depth translate further, generating a highly convincing **3D parallax effect** relative to cursor movement.
* **Slow Floating Oscillation**:
  - Every floating card runs a continuous, independent floating animation loop (`y: [0, -floatAmplitude, 0]`) with staggered delays and randomized durations, ensuring the UI always feels alive.
* **Accessibility First**:
  - Uses a window media query listener to check for `@media (prefers-reduced-motion: reduce)`.
  - Dynamically scales down or completely disables floating physics if the user's system preferences require reduced motion, ensuring premium accessibility compliance.
* **Immersive Skills Galaxy**:
  - Inside `SkillsGalaxy.jsx`, Framer Motion animates SVG path trace-out vectors, active orbital expansions, and glowing solar structures.
* **3D Patent Showcase Tilt**:
  - Inside `PatentShowcase.jsx`, cards tilt on hover using spring physics to catch simulated ceiling reflections.

---

## 🛠️ The Premium Tech Stack

The application relies on a modern, high-performance web development stack:

*   **Vite**: The next-generation frontend tool for blazing-fast local development and builds.
*   **React.js**: A component-based reactive framework driving UI state.
*   **Tailwind CSS**: Utility-first CSS framework for clean, responsive glassmorphic layouts.
*   **GSAP + ScrollTrigger**: Advanced canvas frame interpolation and scroll timeline coordination.
*   **Framer Motion**: Spring physics, custom vectors, interactive parallax, and motion transitions.
*   **Lucide Icons**: Crisp, vector-based SVG iconography.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/shammichalas/Shammichalas.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Shammichalas
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Launch the local development server:
   ```bash
   npm run dev
   ```
