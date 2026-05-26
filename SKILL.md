# ULTRA-PREMIUM CINEMATIC WEB EXPERIENCE SKILL
## AI Instruction Manual — Line-by-Line Execution Guide

---

## TABLE OF CONTENTS

1. [Skill Overview](#skill-overview)
2. [Tech Stack Mandatory Setup](#tech-stack-mandatory-setup)
3. [Project Initialization — Step by Step](#project-initialization)
4. [File Structure Standard](#file-structure-standard)
5. [Design System Constants](#design-system-constants)
6. [Typography System](#typography-system)
7. [Color Palette System](#color-palette-system)
8. [Tailwind Configuration](#tailwind-configuration)
9. [Package Dependencies](#package-dependencies)
10. [Lenis Smooth Scroll Setup](#lenis-smooth-scroll-setup)
11. [GSAP + ScrollTrigger Core Setup](#gsap-scrolltrigger-core-setup)
12. [Three.js Hero Background Setup](#threejs-hero-background-setup)
13. [React Three Fiber Integration](#react-three-fiber-integration)
14. [Framer Motion Configuration](#framer-motion-configuration)
15. [Video Scroll Scrub System](#video-scroll-scrub-system)
16. [Video Keyframe Mapping Engine](#video-keyframe-mapping-engine)
17. [Cinematic Text Overlay System](#cinematic-text-overlay-system)
18. [Gold Progress Bar Component](#gold-progress-bar-component)
19. [Custom Cursor System](#custom-cursor-system)
20. [Magnetic Button Component](#magnetic-button-component)
21. [Glassmorphism Card System](#glassmorphism-card-system)
22. [Split Text Animation Engine](#split-text-animation-engine)
23. [Parallax Section System](#parallax-section-system)
24. [Pinned Section Architecture](#pinned-section-architecture)
25. [Hero Section — Full Code](#hero-section-full-code)
26. [About Section — Full Code](#about-section-full-code)
27. [Portfolio / Work Section](#portfolio-work-section)
28. [Testimonials Section](#testimonials-section)
29. [Services Section](#services-section)
30. [Stats Counter Section](#stats-counter-section)
31. [CTA Section](#cta-section)
32. [Footer Section](#footer-section)
33. [Page Transitions](#page-transitions)
34. [Mobile Responsive Rules](#mobile-responsive-rules)
35. [Performance Optimization](#performance-optimization)
36. [Accessibility Standards](#accessibility-standards)
37. [SEO Metadata Setup](#seo-metadata-setup)
38. [Deployment Checklist](#deployment-checklist)
39. [AI Execution Rules](#ai-execution-rules)
40. [Error Prevention Guide](#error-prevention-guide)

---

## SKILL OVERVIEW

This skill produces ultra-premium, cinematic, luxury web experiences of the caliber seen on Apple.com, Awwwards winners, Lusion.co, and Active Theory. Every output must be production-ready, copy-paste deployable, and visually extraordinary.

**AI AGENT: Read this file completely before writing a single line of code. Execute every section in the exact order listed. Do not skip steps. Do not approximate. Do not use defaults.**

---

## TECH STACK MANDATORY SETUP

### Required Frameworks (never substitute)

```
Next.js 14+ with App Router      — routing, SSR, image optimization
TypeScript                        — type safety across all files
Tailwind CSS                      — utility-first styling
GSAP + ScrollTrigger              — cinematic scroll animations
Three.js / React Three Fiber      — 3D elements, floating geometry
Framer Motion                     — micro-interactions, page transitions
Lenis                             — buttery smooth scroll
```

### Optional Backend (add only when user requests data persistence)

```
Node.js + Express                 — API layer
PostgreSQL + Prisma               — database ORM
Vercel Postgres                   — serverless DB on Vercel
```

### Deployment Target

```
Vercel                            — zero-config deployment
```

---

## PROJECT INITIALIZATION

### Step 1 — Create Next.js project

```bash
npx create-next-app@latest project-name \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

### Step 2 — Install all required packages

```bash
cd project-name

# GSAP and ScrollTrigger
npm install gsap @gsap/react

# Three.js ecosystem
npm install three @react-three/fiber @react-three/drei

# Framer Motion
npm install framer-motion

# Lenis smooth scroll
npm install @studio-freight/lenis

# Utility packages
npm install clsx tailwind-merge

# Font packages (next/font handles Google Fonts natively)
# No separate install needed for Google Fonts

# Type definitions
npm install --save-dev @types/three
```

### Step 3 — Verify installations

```bash
npm list gsap three framer-motion @studio-freight/lenis
```

All packages must resolve without peer dependency warnings before proceeding.

### Step 4 — Configure tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 5 — Configure next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  },
  experimental: {
    optimizePackageImports: ['gsap', 'framer-motion', 'three']
  }
}

module.exports = nextConfig
```

---

## FILE STRUCTURE STANDARD

```
src/
├── app/
│   ├── layout.tsx                 — root layout, fonts, metadata, Lenis
│   ├── page.tsx                   — home page composition
│   ├── globals.css                — global styles, CSS variables
│   └── [other-routes]/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageTransition.tsx
│   │
│   ├── ui/
│   │   ├── MagneticButton.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── GlassCard.tsx
│   │   ├── SplitText.tsx
│   │   ├── GoldProgressBar.tsx
│   │   └── CounterNumber.tsx
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── VideoScrollSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── StatsSection.tsx
│   │   └── CTASection.tsx
│   │
│   └── three/
│       ├── HeroCanvas.tsx
│       ├── FloatingGeometry.tsx
│       └── ParticleField.tsx
│
├── hooks/
│   ├── useLenis.ts
│   ├── useGSAP.ts
│   ├── useScrollProgress.ts
│   ├── useMagneticEffect.ts
│   └── useVideoScrub.ts
│
├── lib/
│   ├── gsap.ts                    — GSAP plugin registration
│   ├── fonts.ts                   — next/font configuration
│   └── utils.ts                   — clsx + twMerge helper
│
├── types/
│   └── index.ts                   — shared TypeScript types
│
└── styles/
    └── animations.css             — keyframe definitions
```

**AI AGENT: Create every file listed above. Never leave a file empty. Every file must have working, complete code.**

---

## DESIGN SYSTEM CONSTANTS

### Mandatory Visual Rules

```
Background:       #000000 or #050508 (deep cinematic black)
Primary Text:     #FFFFFF
Secondary Text:   rgba(255,255,255,0.6)
Accent Gold:      #C9A84C  (warm luxury gold)
Alt Gold:         #D4AF37  (bright gold for highlights)
Glass Border:     rgba(255,255,255,0.08)
Glass Background: rgba(255,255,255,0.03)
Glass Blur:       backdrop-blur-xl (24px)
```

### Spacing Scale (luxury spacing — never cramped)

```
Section padding Y:      py-32 md:py-48 lg:py-64
Section padding X:      px-6 md:px-12 lg:px-24
Component gap:          gap-8 md:gap-12 lg:gap-16
Heading margin bottom:  mb-8 md:mb-12
```

### Border Radius

```
Cards:        rounded-2xl (16px)
Buttons:      rounded-full
Inputs:       rounded-xl (12px)
```

### Z-Index Layer System

```
Background 3D:     z-0
Section content:   z-10
Overlays:          z-20
Navigation:        z-40
Custom cursor:     z-50
```

---

## TYPOGRAPHY SYSTEM

### Font Selection Rules

**NEVER USE:** Inter, Roboto, Arial, system-ui, sans-serif defaults

**ALWAYS USE one of these combinations:**

#### Option A — Editorial Luxury
```
Display:  Playfair Display (serif, dramatic)
Body:     DM Sans (clean, modern contrast)
Mono:     JetBrains Mono (code elements)
```

#### Option B — Cinematic High-Fashion
```
Display:  Cormorant Garamond (ultra-elegant)
Body:     Outfit (geometric, contemporary)
Mono:     Fira Code
```

#### Option C — Contemporary Premium
```
Display:  Libre Baskerville (editorial serif)
Body:     Nunito Sans (readable premium)
Mono:     Space Mono
```

### Font Configuration — src/lib/fonts.ts

```typescript
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})
```

### Typography Scale

```css
/* Apply in globals.css */
.text-display-xl  { font-size: clamp(3rem, 8vw, 8rem);   line-height: 0.95; letter-spacing: -0.03em; }
.text-display-lg  { font-size: clamp(2.5rem, 6vw, 6rem); line-height: 1.0;  letter-spacing: -0.02em; }
.text-display-md  { font-size: clamp(2rem, 4vw, 4rem);   line-height: 1.1;  letter-spacing: -0.02em; }
.text-display-sm  { font-size: clamp(1.5rem, 3vw, 3rem); line-height: 1.15; letter-spacing: -0.01em; }
.text-body-lg     { font-size: clamp(1.1rem, 1.5vw, 1.25rem); line-height: 1.7; }
.text-body-md     { font-size: clamp(1rem, 1.2vw, 1.1rem);    line-height: 1.75; }
.text-label       { font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; }
```

---

## COLOR PALETTE SYSTEM

### CSS Variables — src/app/globals.css

```css
:root {
  /* Core palette */
  --color-bg:           #000000;
  --color-bg-deep:      #050508;
  --color-bg-surface:   #0a0a0f;
  --color-bg-elevated:  #111118;

  /* Text hierarchy */
  --color-text-primary:   #ffffff;
  --color-text-secondary: rgba(255, 255, 255, 0.65);
  --color-text-tertiary:  rgba(255, 255, 255, 0.35);
  --color-text-disabled:  rgba(255, 255, 255, 0.20);

  /* Gold accent system */
  --color-gold:         #C9A84C;
  --color-gold-bright:  #D4AF37;
  --color-gold-dim:     rgba(201, 168, 76, 0.4);
  --color-gold-glow:    rgba(201, 168, 76, 0.15);

  /* Glass system */
  --glass-bg:           rgba(255, 255, 255, 0.03);
  --glass-bg-hover:     rgba(255, 255, 255, 0.06);
  --glass-border:       rgba(255, 255, 255, 0.08);
  --glass-border-hover: rgba(255, 255, 255, 0.15);

  /* Shadows */
  --shadow-gold:   0 0 60px rgba(201, 168, 76, 0.1);
  --shadow-card:   0 25px 50px rgba(0, 0, 0, 0.5);
  --shadow-glow:   0 0 120px rgba(201, 168, 76, 0.08);
}
```

---

## TAILWIND CONFIGURATION

### tailwind.config.ts — Complete File

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          bright:  '#D4AF37',
          dim:     'rgba(201,168,76,0.4)',
          glow:    'rgba(201,168,76,0.15)',
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.03)',
          hover:   'rgba(255,255,255,0.06)',
          border:  'rgba(255,255,255,0.08)',
        },
        bg: {
          DEFAULT: '#000000',
          deep:    '#050508',
          surface: '#0a0a0f',
          elevated:'#111118',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem,8vw,8rem)',    { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem,6vw,6rem)',  { lineHeight: '1.0',  letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem,4vw,4rem)',    { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.5rem,3vw,3rem)',  { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        xl: '24px',
        '2xl': '40px',
      },
      animation: {
        'cursor-pulse': 'cursorPulse 2s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
        'gold-shimmer': 'goldShimmer 3s ease-in-out infinite',
      },
      keyframes: {
        cursorPulse: {
          '0%,100%': { transform: 'scale(1)', opacity: '1' },
          '50%':     { transform: 'scale(1.5)', opacity: '0.5' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-20px)' },
        },
        goldShimmer: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
}

export default config
```

---

## PACKAGE DEPENDENCIES

### package.json — dependencies section

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "gsap": "^3.12.5",
    "@gsap/react": "^2.1.1",
    "three": "^0.165.0",
    "@react-three/fiber": "^8.16.8",
    "@react-three/drei": "^9.108.1",
    "framer-motion": "^11.2.10",
    "@studio-freight/lenis": "^1.1.13",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/three": "^0.165.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

---

## LENIS SMOOTH SCROLL SETUP

### src/hooks/useLenis.ts

```typescript
'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenisInstance: Lenis | null = null

export function useLenis() {
  useEffect(() => {
    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger)

    // Initialize Lenis with luxury smooth scroll settings
    const lenis = new Lenis({
      duration: 1.4,              // scroll duration multiplier
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,       // reduce scroll speed for luxury feel
      touchMultiplier: 2,
      infinite: false,
    })

    lenisInstance = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Lenis RAF loop integrated with GSAP ticker
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000)
    })

    // Remove default ticker lag smoothing
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisInstance = null
      gsap.ticker.remove(ScrollTrigger.update)
    }
  }, [])

  return lenisInstance
}

// Export for programmatic scroll control
export function scrollTo(target: string | number | HTMLElement, options?: object) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options)
  }
}
```

### Integrate in src/app/layout.tsx

```typescript
'use client'
// Add LenisProvider as a client component wrapper
// Call useLenis() inside a client component that wraps the app
```

---

## GSAP SCROLLTRIGGER CORE SETUP

### src/lib/gsap.ts

```typescript
'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { TextPlugin } from 'gsap/TextPlugin'
import { SplitText } from 'gsap/SplitText'

// Register all GSAP plugins once at app level
export function registerGSAPPlugins() {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(
      ScrollTrigger,
      ScrollToPlugin,
      TextPlugin,
      SplitText
    )

    // Global GSAP defaults for cinematic feel
    gsap.defaults({
      ease: 'power3.out',
      duration: 0.8,
    })

    // ScrollTrigger global config
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      ignoreMobileResize: true,
    })
  }
}

export { gsap, ScrollTrigger }
```

### Standard Animation Presets

```typescript
// src/lib/animations.ts
import { gsap } from 'gsap'

export const EASE_CINEMATIC = 'power4.out'
export const EASE_BOUNCE    = 'elastic.out(1, 0.3)'
export const EASE_SMOOTH    = 'power2.inOut'
export const EASE_SHARP     = 'expo.out'

export const DURATION_FAST    = 0.4
export const DURATION_MEDIUM  = 0.8
export const DURATION_SLOW    = 1.2
export const DURATION_CINEMATIC = 1.8

// Reveal from bottom — standard for most text elements
export function revealFromBottom(element: Element | string, delay = 0) {
  return gsap.from(element, {
    y: 80,
    opacity: 0,
    duration: DURATION_CINEMATIC,
    ease: EASE_CINEMATIC,
    delay,
  })
}

// Reveal with scale — for images and cards
export function revealScale(element: Element | string, delay = 0) {
  return gsap.from(element, {
    scale: 0.85,
    opacity: 0,
    duration: DURATION_SLOW,
    ease: EASE_CINEMATIC,
    delay,
  })
}

// Stagger children — for lists and grids
export function staggerReveal(parent: Element | string, childSelector: string, staggerAmount = 0.1) {
  return gsap.from(`${parent} ${childSelector}`, {
    y: 60,
    opacity: 0,
    duration: DURATION_MEDIUM,
    ease: EASE_CINEMATIC,
    stagger: staggerAmount,
  })
}

// Gold line draw — for decorative borders
export function drawLine(element: Element | string, delay = 0) {
  return gsap.from(element, {
    scaleX: 0,
    transformOrigin: 'left center',
    duration: DURATION_SLOW,
    ease: EASE_SHARP,
    delay,
  })
}
```

---

## THREE.JS HERO BACKGROUND SETUP

### src/components/three/HeroCanvas.tsx

```typescript
'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Particle field component — creates depth and atmosphere
function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  // Generate random particle positions in a sphere
  const particlePositions = useMemo(() => {
    const count = 3000
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 8  // sphere radius range
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }

    return positions
  }, [])

  // Slow rotation animation every frame
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02
      ref.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <Points ref={ref} positions={particlePositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C9A84C"
        size={0.008}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

// Floating torus knot — luxury decorative 3D element
function FloatingTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime
      meshRef.current.rotation.x = t * 0.1
      meshRef.current.rotation.y = t * 0.15
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={[2.5, 0, -2]}>
      <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
      <meshStandardMaterial
        color="#C9A84C"
        metalness={0.9}
        roughness={0.1}
        wireframe={false}
      />
    </mesh>
  )
}

// Main exportable canvas component
export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient light — fills the scene softly */}
        <ambientLight intensity={0.3} />

        {/* Gold point light — creates luxury warm glow */}
        <pointLight
          position={[2, 3, 4]}
          intensity={2}
          color="#C9A84C"
          distance={10}
        />

        {/* Rim light from behind — depth and separation */}
        <pointLight
          position={[-3, -2, -3]}
          intensity={0.8}
          color="#ffffff"
          distance={8}
        />

        <ParticleField />
        <FloatingTorusKnot />
      </Canvas>
    </div>
  )
}
```

---

## REACT THREE FIBER INTEGRATION

### src/components/three/FloatingGeometry.tsx

```typescript
'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingGeometryProps {
  position?: [number, number, number]
  color?: string
  distort?: number
  speed?: number
}

function DistortedSphere({
  position = [0, 0, 0],
  color = '#C9A84C',
  distort = 0.4,
  speed = 2,
}: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          distort={distort}
          speed={speed}
        />
      </mesh>
    </Float>
  )
}

export default function FloatingGeometryCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#C9A84C" />
      <DistortedSphere position={[0, 0, 0]} color="#C9A84C" />
    </Canvas>
  )
}
```

---

## FRAMER MOTION CONFIGURATION

### src/lib/motion-variants.ts

```typescript
import { Variants } from 'framer-motion'

// Standard page enter animation
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
}

// Stagger container — parent wraps animated children
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}

// Child item in stagger group
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}

// Card hover effect
export const cardHover: Variants = {
  rest: {
    scale: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  hover: {
    scale: 1.02,
    borderColor: 'rgba(201,168,76,0.3)',
    transition: { duration: 0.3, ease: 'easeOut' }
  }
}

// Fade in from side
export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  }
}

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  }
}

// Scale reveal for images
export const scaleReveal: Variants = {
  initial: { opacity: 0, scale: 0.85 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
  }
}

// Clip path reveal — cinematic wipe from bottom
export const clipReveal: Variants = {
  initial: { clipPath: 'inset(100% 0 0 0)' },
  animate: {
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
  }
}

// Button magnetic press
export const buttonPress: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap:   { scale: 0.97 }
}

// Text character stagger (for split text)
export const charVariants: Variants = {
  initial: { y: '100%', opacity: 0 },
  animate: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    }
  })
}
```

---

## VIDEO SCROLL SCRUB SYSTEM

### src/hooks/useVideoScrub.ts

```typescript
'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface UseVideoScrubOptions {
  sectionRef: React.RefObject<HTMLElement>
  videoRef: React.RefObject<HTMLVideoElement>
  pxPerSecond?: number          // pixels of scroll per 1 second of video
  onKeyframe?: (frame: number, progress: number) => void
}

interface VideoScrubReturn {
  scrollProgress: number
}

export function useVideoScrub({
  sectionRef,
  videoRef,
  pxPerSecond = 200,
  onKeyframe,
}: UseVideoScrubOptions): VideoScrubReturn {

  const progressRef = useRef(0)

  useEffect(() => {
    if (!sectionRef.current || !videoRef.current) return

    const video = videoRef.current
    const section = sectionRef.current

    // Wait for video metadata to load to get duration
    const setupScrub = () => {
      const duration = video.duration
      if (!duration || isNaN(duration)) return

      // Total scroll distance = duration * pxPerSecond
      const totalScrollHeight = duration * pxPerSecond

      // Set the section height to match total scroll distance
      // This creates the "pinned while scrolling" effect
      gsap.set(section, { height: totalScrollHeight })

      // Create the ScrollTrigger that scrubs video
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${totalScrollHeight}`,
        pin: true,                     // pin the section during scroll
        pinSpacing: true,
        scrub: 0.5,                    // slight lag for cinematic feel
        onUpdate: (self) => {
          // Map scroll progress (0-1) to video currentTime
          const newTime = self.progress * duration

          // Only update if significantly different (performance)
          if (Math.abs(video.currentTime - newTime) > 0.01) {
            video.currentTime = newTime
          }

          // Update progress ref
          progressRef.current = self.progress

          // Fire keyframe callback
          if (onKeyframe) {
            onKeyframe(newTime, self.progress)
          }
        },
      })

      return () => {
        trigger.kill()
      }
    }

    // Video may already have metadata loaded
    if (video.readyState >= 1) {
      setupScrub()
    } else {
      video.addEventListener('loadedmetadata', setupScrub)
      return () => video.removeEventListener('loadedmetadata', setupScrub)
    }
  }, [sectionRef, videoRef, pxPerSecond, onKeyframe])

  return { scrollProgress: progressRef.current }
}
```

### src/components/sections/VideoScrollSection.tsx — Complete Implementation

```typescript
'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useVideoScrub } from '@/hooks/useVideoScrub'
import { GoldProgressBar } from '@/components/ui/GoldProgressBar'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

// Define keyframes — AI: customize these per video content
interface Keyframe {
  id: number
  startProgress: number    // 0.0 to 1.0
  endProgress: number      // 0.0 to 1.0
  headline: string
  subtext: string
  position: 'left' | 'right' | 'center'
}

const VIDEO_KEYFRAMES: Keyframe[] = [
  {
    id: 0,
    startProgress: 0.00,
    endProgress: 0.15,
    headline: 'A New Vision',
    subtext: 'Where craft meets innovation',
    position: 'center',
  },
  {
    id: 1,
    startProgress: 0.15,
    endProgress: 0.30,
    headline: 'Precision Crafted',
    subtext: 'Every detail intentional',
    position: 'left',
  },
  {
    id: 2,
    startProgress: 0.30,
    endProgress: 0.45,
    headline: 'Beyond Ordinary',
    subtext: 'The future, made tangible',
    position: 'right',
  },
  {
    id: 3,
    startProgress: 0.45,
    endProgress: 0.60,
    headline: 'Trusted Globally',
    subtext: 'By those who demand the best',
    position: 'center',
  },
  {
    id: 4,
    startProgress: 0.60,
    endProgress: 0.75,
    headline: 'Limitless Possibility',
    subtext: 'Your story, beautifully told',
    position: 'left',
  },
  {
    id: 5,
    startProgress: 0.75,
    endProgress: 0.90,
    headline: 'Begin Your Journey',
    subtext: 'The experience awaits',
    position: 'right',
  },
  {
    id: 6,
    startProgress: 0.90,
    endProgress: 1.00,
    headline: 'The Extraordinary',
    subtext: 'Starts here',
    position: 'center',
  },
]

interface VideoScrollSectionProps {
  videoSrc: string
  pxPerSecond?: number
}

export default function VideoScrollSection({
  videoSrc,
  pxPerSecond = 200,
}: VideoScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const [activeKeyframe, setActiveKeyframe] = useState<Keyframe | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Determine active keyframe from scroll progress
  const handleKeyframe = useCallback((time: number, progress: number) => {
    setScrollProgress(progress)

    const active = VIDEO_KEYFRAMES.find(
      (kf) => progress >= kf.startProgress && progress < kf.endProgress
    )
    setActiveKeyframe(active ?? null)
  }, [])

  useVideoScrub({
    sectionRef,
    videoRef,
    pxPerSecond,
    onKeyframe: handleKeyframe,
  })

  // Get text position classes from keyframe data
  const getPositionClasses = (position: Keyframe['position']) => {
    switch (position) {
      case 'left':   return 'items-start text-left pl-12 md:pl-24'
      case 'right':  return 'items-end text-right pr-12 md:pr-24'
      case 'center': return 'items-center text-center'
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
      aria-label="Cinematic video showcase"
    >
      {/* ── VIDEO ELEMENT ──────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />

        {/* Dark vignette overlay — cinematic depth */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `
              radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%)
            `
          }}
        />

        {/* ── CINEMATIC TEXT OVERLAY ─────────────────────── */}
        <AnimatePresence mode="wait">
          {activeKeyframe && (
            <motion.div
              key={activeKeyframe.id}
              className={`
                absolute inset-0 z-20 flex flex-col justify-center
                ${getPositionClasses(activeKeyframe.position)}
              `}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Gold accent line */}
              <motion.div
                className="mb-6 h-px w-24 bg-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                style={{ transformOrigin: activeKeyframe.position === 'right' ? 'right center' : 'left center' }}
              />

              {/* Main headline */}
              <motion.h2
                className="font-display text-display-lg text-white leading-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                {activeKeyframe.headline}
              </motion.h2>

              {/* Subtext */}
              <motion.p
                className="mt-4 font-body text-body-lg text-white/60 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                {activeKeyframe.subtext}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── GOLD PROGRESS BAR ─────────────────────────── */}
        <GoldProgressBar progress={scrollProgress} position="top" />

        {/* ── SCROLL HINT (fades out after first scroll) ─ */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          animate={{ opacity: scrollProgress > 0.05 ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-label text-white/40 tracking-widest">Scroll to explore</span>
          <div className="h-12 w-px bg-gradient-to-b from-gold to-transparent animate-float" />
        </motion.div>
      </div>
    </section>
  )
}
```

---

## VIDEO KEYFRAME MAPPING ENGINE

### How to Analyze and Set Keyframes

**AI AGENT: When user provides a video, follow this exact process:**

#### Step 1 — Estimate video duration
Ask user or examine file metadata if available.

#### Step 2 — Divide into 6-8 logical segments
```
0%  – 15%  : Opening / Brand Identity reveal
15% – 30%  : Primary product or subject introduction
30% – 45%  : Key feature or story beat #1
45% – 60%  : Key feature or story beat #2
60% – 75%  : Social proof or emotional peak
75% – 90%  : Call to action or climax
90% – 100% : Outro / Resolution
```

#### Step 3 — Write keyframe copy that matches visual
- Keyframe text must be SHORT — maximum 5 words per headline
- Subtext maximum 8 words
- Tone must match video mood (luxury, energy, emotion, technical)

#### Step 4 — Choose text position to not cover key video elements
- If subject is center-frame: use left or right overlay
- If subject is left: use right overlay
- If abstract/full-frame: use center overlay

#### Step 5 — Set VIDEO_KEYFRAMES array in VideoScrollSection.tsx

```typescript
// Example for a luxury car reveal video
const VIDEO_KEYFRAMES: Keyframe[] = [
  { id: 0, startProgress: 0.00, endProgress: 0.12, headline: 'Born from Obsession', subtext: 'A decade of refinement', position: 'center' },
  { id: 1, startProgress: 0.12, endProgress: 0.25, headline: 'Pure Performance', subtext: 'Zero compromise. Total control.', position: 'left' },
  { id: 2, startProgress: 0.25, endProgress: 0.42, headline: 'Sculpted by Wind', subtext: 'Aerodynamics as art form', position: 'right' },
  { id: 3, startProgress: 0.42, endProgress: 0.58, headline: 'Intelligent Inside', subtext: 'Technology meets intuition', position: 'left' },
  { id: 4, startProgress: 0.58, endProgress: 0.73, headline: '0 to 100 in 2.8s', subtext: 'The numbers speak clearly', position: 'center' },
  { id: 5, startProgress: 0.73, endProgress: 0.88, headline: 'Your Legacy Awaits', subtext: 'Configure yours today', position: 'right' },
  { id: 6, startProgress: 0.88, endProgress: 1.00, headline: 'Drive the Future', subtext: 'Reserve yours now', position: 'center' },
]
```

---

## CINEMATIC TEXT OVERLAY SYSTEM

### src/components/ui/SplitText.tsx

```typescript
'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface SplitTextProps {
  text: string
  className?: string
  type?: 'chars' | 'words' | 'lines'
  stagger?: number
  delay?: number
  triggerElement?: string  // CSS selector for ScrollTrigger
  once?: boolean
}

export default function SplitText({
  text,
  className = '',
  type = 'words',
  stagger = 0.05,
  delay = 0,
  triggerElement,
  once = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Split text into spans based on type
    let units: string[] = []
    if (type === 'chars')  units = text.split('')
    if (type === 'words')  units = text.split(' ')
    if (type === 'lines')  units = text.split('\n')

    // Build HTML with individual spans wrapped in overflow-hidden containers
    container.innerHTML = units
      .map((unit) => `
        <span class="inline-block overflow-hidden">
          <span class="split-unit inline-block will-change-transform">
            ${unit}${type === 'words' ? '&nbsp;' : ''}
          </span>
        </span>
      `)
      .join('')

    const spans = container.querySelectorAll('.split-unit')

    // Animate each unit
    const anim = gsap.from(spans, {
      y: '110%',
      opacity: 0,
      stagger,
      delay,
      duration: 1.0,
      ease: 'power4.out',
      scrollTrigger: triggerElement ? {
        trigger: triggerElement || container,
        start: 'top 80%',
        toggleActions: once ? 'play none none none' : 'play none none reset',
      } : undefined,
    })

    return () => {
      anim.kill()
    }
  }, [text, type, stagger, delay, triggerElement, once])

  return (
    <div ref={containerRef} className={className} aria-label={text}>
      {text}
    </div>
  )
}
```

---

## GOLD PROGRESS BAR COMPONENT

### src/components/ui/GoldProgressBar.tsx

```typescript
'use client'

import { motion } from 'framer-motion'

interface GoldProgressBarProps {
  progress: number           // 0 to 1
  position?: 'top' | 'left' | 'right' | 'bottom'
  thickness?: number         // pixels
  showLabel?: boolean
}

export function GoldProgressBar({
  progress,
  position = 'top',
  thickness = 2,
  showLabel = false,
}: GoldProgressBarProps) {
  const percentage = Math.round(progress * 100)

  const isHorizontal = position === 'top' || position === 'bottom'

  const containerStyle = isHorizontal
    ? {
        position: 'fixed' as const,
        [position]: 0,
        left: 0,
        right: 0,
        height: thickness,
        zIndex: 50,
      }
    : {
        position: 'fixed' as const,
        top: 0,
        [position]: 0,
        bottom: 0,
        width: thickness,
        zIndex: 50,
      }

  const barStyle = isHorizontal
    ? { height: '100%', width: `${percentage}%` }
    : { width: '100%', height: `${percentage}%` }

  return (
    <>
      {/* Progress bar track */}
      <div
        style={containerStyle}
        className="bg-white/5"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Video scroll progress"
      >
        {/* Animated gold fill */}
        <motion.div
          style={barStyle}
          className="relative"
          animate={{ [isHorizontal ? 'width' : 'height']: `${percentage}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        >
          {/* Gold gradient bar */}
          <div
            className="absolute inset-0"
            style={{
              background: isHorizontal
                ? 'linear-gradient(90deg, #C9A84C, #D4AF37, #C9A84C)'
                : 'linear-gradient(180deg, #C9A84C, #D4AF37, #C9A84C)',
            }}
          />

          {/* Glow effect at the tip */}
          <div
            className="absolute"
            style={{
              background: 'rgba(201,168,76,0.6)',
              filter: 'blur(4px)',
              ...(isHorizontal
                ? { right: -4, top: -4, bottom: -4, width: 12 }
                : { bottom: -4, left: -4, right: -4, height: 12 })
            }}
          />
        </motion.div>
      </div>

      {/* Optional percentage label */}
      {showLabel && (
        <div
          className="fixed z-50 text-label text-gold"
          style={{
            [position === 'top' ? 'top' : 'bottom']: 12,
            right: 24,
          }}
        >
          {percentage}%
        </div>
      )}
    </>
  )
}
```

---

## CUSTOM CURSOR SYSTEM

### src/components/ui/CustomCursor.tsx

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef    = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState('')

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none'

    const cursor = cursorRef.current
    const dot    = dotRef.current
    if (!cursor || !dot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    // Track mouse position
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot follows immediately (no lag)
      gsap.set(dot, { x: mouseX - 4, y: mouseY - 4 })
    }

    // Smooth cursor follows with lag
    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.12  // lerp factor controls lag
      cursorY += (mouseY - cursorY) * 0.12

      gsap.set(cursor, {
        x: cursorX - 20,  // offset by half width
        y: cursorY - 20,
      })

      requestAnimationFrame(updateCursor)
    }

    // Detect hoverable elements
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const hoverText = target.getAttribute('data-cursor-text')

      setIsHovering(true)
      if (hoverText) setCursorText(hoverText)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorText('')
    }

    // Attach listeners to all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor], [data-cursor-text]'
    )

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter as EventListener)
      el.addEventListener('mouseleave', handleMouseLeave as EventListener)
    })

    window.addEventListener('mousemove', onMouseMove)
    const rafId = requestAnimationFrame(updateCursor)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter as EventListener)
        el.removeEventListener('mouseleave', handleMouseLeave as EventListener)
      })
    }
  }, [])

  return (
    <>
      {/* Large cursor ring — follows with lag */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[100] pointer-events-none"
        animate={{
          width:  isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          opacity: 1,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ willChange: 'transform' }}
      >
        <div
          className="w-full h-full rounded-full border border-gold flex items-center justify-center"
          style={{
            background: isHovering ? 'rgba(201,168,76,0.1)' : 'transparent',
            backdropFilter: isHovering ? 'blur(4px)' : 'none',
          }}
        >
          {cursorText && (
            <span className="text-xs text-gold font-body tracking-wide">
              {cursorText}
            </span>
          )}
        </div>
      </motion.div>

      {/* Small dot cursor — immediate */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[101] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div className="w-2 h-2 rounded-full bg-gold" />
      </div>
    </>
  )
}
```

---

## MAGNETIC BUTTON COMPONENT

### src/components/ui/MagneticButton.tsx

```typescript
'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number          // magnetic pull strength (0-1)
  onClick?: () => void
  href?: string
  'data-cursor-text'?: string
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
  href,
  'data-cursor-text': cursorText,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      x.set(deltaX)
      y.set(deltaY)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, x, y])

  const Tag = href ? motion.a : motion.button

  return (
    <Tag
      ref={buttonRef as any}
      href={href}
      onClick={onClick}
      data-cursor-text={cursorText}
      className={`relative inline-flex items-center justify-center overflow-hidden cursor-none ${className}`}
      style={{ x: springX, y: springY, willChange: 'transform' }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Tag>
  )
}
```

---

## GLASSMORPHISM CARD SYSTEM

### src/components/ui/GlassCard.tsx

```typescript
'use client'

import { ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface GlassCardProps {
  children: ReactNode
  className?: string
  tilt?: boolean           // enable 3D tilt on hover
  glow?: boolean           // enable gold glow on hover
  onClick?: () => void
}

export default function GlassCard({
  children,
  className = '',
  tilt = true,
  glow = true,
  onClick,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 30, stiffness: 200 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 30, stiffness: 200 })

  const glowX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt && !glow) return
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5

    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative rounded-2xl border overflow-hidden cursor-pointer
        ${className}
      `}
      style={{
        background: 'var(--glass-bg)',
        borderColor: 'var(--glass-border)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ borderColor: 'rgba(201,168,76,0.25)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Dynamic gradient glow following mouse */}
      {glow && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(201,168,76,0.08), transparent 70%)`,
          }}
        />
      )}

      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
```

---

## SPLIT TEXT ANIMATION ENGINE

### Advanced GSAP SplitText Usage

```typescript
// src/hooks/useSplitTextAnimation.ts
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface UseSplitTextOptions {
  type?: 'chars' | 'words' | 'lines'
  stagger?: number
  duration?: number
  ease?: string
  scrollTrigger?: boolean
  start?: string
}

export function useSplitTextAnimation<T extends HTMLElement>(
  options: UseSplitTextOptions = {}
) {
  const {
    type = 'words',
    stagger = 0.06,
    duration = 1.0,
    ease = 'power4.out',
    scrollTrigger = true,
    start = 'top 80%',
  } = options

  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const originalText = element.textContent || ''
    const units = type === 'chars'
      ? originalText.split('')
      : type === 'words'
        ? originalText.split(' ')
        : originalText.split('\n')

    // Wrap each unit in an animated span
    element.innerHTML = units
      .map(unit => `
        <span style="display:inline-block;overflow:hidden;vertical-align:top">
          <span class="anim-unit" style="display:inline-block;will-change:transform">
            ${unit}${type === 'words' ? '\u00A0' : ''}
          </span>
        </span>
      `)
      .join('')

    const animUnits = element.querySelectorAll('.anim-unit')

    const tl = gsap.timeline({
      scrollTrigger: scrollTrigger ? {
        trigger: element,
        start,
        toggleActions: 'play none none none',
      } : undefined
    })

    tl.from(animUnits, {
      y: '120%',
      opacity: 0,
      stagger,
      duration,
      ease,
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === element) st.kill()
      })
    }
  }, [type, stagger, duration, ease, scrollTrigger, start])

  return ref
}
```

---

## PARALLAX SECTION SYSTEM

### src/components/sections/ParallaxSection.tsx

```typescript
'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ParallaxLayerProps {
  children: ReactNode
  speed?: number          // negative = slower scroll, positive = faster
  className?: string
}

export function ParallaxLayer({
  children,
  speed = -0.3,
  className = '',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const trigger = ScrollTrigger.create({
      trigger: element.parentElement!,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const yMove = self.progress * speed * 200  // pixels of parallax movement
        gsap.set(element, { y: yMove })
      },
    })

    return () => trigger.kill()
  }, [speed])

  return (
    <div
      ref={ref}
      className={`${className} will-change-transform`}
      style={{ transform: 'translateY(0)' }}
    >
      {children}
    </div>
  )
}

// Section wrapper with overflow hidden (required for parallax)
interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  minHeight?: string
}

export function ParallaxSection({
  children,
  className = '',
  minHeight = '100vh',
}: ParallaxSectionProps) {
  return (
    <section
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      {children}
    </section>
  )
}
```

---

## PINNED SECTION ARCHITECTURE

### Standard Pinned Horizontal Scroll

```typescript
// src/components/sections/HorizontalScroll.tsx
'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface HorizontalScrollProps {
  children: ReactNode
  className?: string
}

export default function HorizontalScroll({
  children,
  className = '',
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const track     = trackRef.current
    if (!container || !track) return

    const panels = track.querySelectorAll('.h-scroll-panel')
    const totalWidth = track.scrollWidth

    const trigger = gsap.to(track, {
      x: -(totalWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${totalWidth - window.innerWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex h-screen" style={{ width: 'max-content' }}>
        {children}
      </div>
    </div>
  )
}
```

---

## HERO SECTION — FULL CODE

### src/components/sections/HeroSection.tsx

```typescript
'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import dynamic from 'next/dynamic'
import MagneticButton from '@/components/ui/MagneticButton'
import { scrollTo } from '@/hooks/useLenis'
import { staggerItem, staggerContainer, fadeInLeft } from '@/lib/motion-variants'

// Three.js canvas loaded client-side only (no SSR)
const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
})

interface HeroSectionProps {
  headline?: string
  subheadline?: string
  ctaPrimary?: string
  ctaSecondary?: string
}

export default function HeroSection({
  headline      = 'Crafted for the\nExtraordinary',
  subheadline   = 'We build digital experiences that leave an impression long after the screen goes dark.',
  ctaPrimary    = 'View Work',
  ctaSecondary  = 'Get in Touch',
}: HeroSectionProps) {
  const heroRef      = useRef<HTMLElement>(null)
  const headlineRef  = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance timeline — cinematic sequence
      const tl = gsap.timeline({ delay: 0.5 })

      tl
        // Gold line draws in
        .from('.hero-line', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.0,
          ease: 'expo.out',
        })
        // Label fades up
        .from('.hero-label', {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.5')
        // Headline reveals
        .from('.hero-headline', {
          y: 80,
          opacity: 0,
          duration: 1.4,
          ease: 'power4.out',
        }, '-=0.4')
        // Subtext appears
        .from('.hero-sub', {
          y: 40,
          opacity: 0,
          duration: 1.0,
          ease: 'power3.out',
        }, '-=0.8')
        // Buttons appear
        .from('.hero-cta', {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.6')
        // Scroll indicator
        .from('.hero-scroll', {
          opacity: 0,
          duration: 0.6,
        }, '-=0.3')

      // Parallax on scroll
      gsap.to('.hero-headline', {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg"
      aria-label="Hero section"
    >
      {/* Three.js background */}
      <HeroCanvas />

      {/* Radial gradient — depth behind content */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 pt-32 pb-24">

        {/* Gold line + label */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="hero-line h-px w-16 bg-gold"
            style={{ willChange: 'transform' }}
          />
          <span className="hero-label text-label text-gold tracking-widest">
            Premium Studio
          </span>
        </div>

        {/* Main headline */}
        <h1
          ref={headlineRef}
          className="hero-headline font-display text-display-xl text-white max-w-5xl"
          style={{
            whiteSpace: 'pre-line',
            willChange: 'transform',
          }}
        >
          {headline}
        </h1>

        {/* Subheadline */}
        <p className="hero-sub mt-8 font-body text-body-lg text-white/60 max-w-xl">
          {subheadline}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <MagneticButton
            className="hero-cta"
            onClick={() => scrollTo('#work')}
            data-cursor-text="View"
          >
            <div className="px-8 py-4 rounded-full bg-gold text-black font-body font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-gold-bright">
              {ctaPrimary}
            </div>
          </MagneticButton>

          <MagneticButton
            className="hero-cta"
            onClick={() => scrollTo('#contact')}
          >
            <div className="px-8 py-4 rounded-full border border-white/20 text-white font-body text-sm tracking-wide transition-all duration-300 hover:border-gold/40 hover:text-gold">
              {ctaSecondary}
            </div>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-label text-white/30 tracking-widest">Scroll</span>
        <div className="relative h-14 w-px overflow-hidden bg-white/10">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gold"
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: '40%' }}
          />
        </div>
      </div>
    </section>
  )
}
```

---

## ABOUT SECTION — FULL CODE

### src/components/sections/AboutSection.tsx

```typescript
'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import { staggerContainer, staggerItem } from '@/lib/motion-variants'

interface AboutSectionProps {
  tagline?: string
  description?: string[]
  values?: { title: string; description: string }[]
}

export default function AboutSection({
  tagline = 'We believe great design\nis never accidental.',
  description = [
    'Founded on the principle that every pixel matters, we craft digital experiences that blend cinematic storytelling with functional elegance.',
    'Our approach is obsessive. Our results are undeniable.',
  ],
  values = [
    { title: 'Precision',  description: 'Every detail is intentional. Nothing is left to chance.' },
    { title: 'Integrity',  description: 'We build what we promise. We deliver what we build.' },
    { title: 'Obsession',  description: 'Good enough is never enough. Excellence is the baseline.' },
  ],
}: AboutSectionProps) {
  const sectionRef  = useRef<HTMLElement>(null)
  const taglineRef  = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Tagline split-word animation on scroll
      const words = taglineRef.current?.querySelectorAll('.word-unit')
      if (words?.length) {
        gsap.from(words, {
          y: '110%',
          opacity: 0,
          stagger: 0.07,
          duration: 1.0,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: taglineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Gold decorative line
      gsap.from('.about-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.about-line',
          start: 'top 90%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Split tagline into word spans for animation
  const taglineWords = tagline.split(/\s+/)

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-bg-deep"
      aria-label="About us"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(201,168,76,0.05), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Label */}
        <div className="flex items-center gap-4 mb-12">
          <div className="about-line h-px w-16 bg-gold" />
          <span className="text-label text-gold tracking-widest">Our Philosophy</span>
        </div>

        {/* Tagline — animated word by word */}
        <h2
          ref={taglineRef}
          className="font-display text-display-lg text-white max-w-4xl"
          style={{ whiteSpace: 'pre-line' }}
          aria-label={tagline}
        >
          {taglineWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom mr-4">
              <span className="word-unit inline-block" style={{ willChange: 'transform' }}>
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* Description paragraphs */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl">
          {description.map((para, i) => (
            <motion.p
              key={i}
              className="font-body text-body-md text-white/60"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Values grid */}
        <motion.div
          className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
        >
          {values.map((value, i) => (
            <motion.div key={i} variants={staggerItem}>
              <GlassCard className="p-8 h-full group">
                {/* Index number */}
                <span className="text-label text-gold/40 tracking-widest">
                  0{i + 1}
                </span>

                {/* Value title */}
                <h3 className="font-display text-display-sm text-white mt-4 mb-3 group-hover:text-gold transition-colors duration-300">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="font-body text-body-md text-white/50">
                  {value.description}
                </p>

                {/* Bottom gold accent */}
                <div
                  className="mt-8 h-px bg-gold/20 group-hover:bg-gold/40 transition-colors duration-300"
                />
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

---

## PORTFOLIO / WORK SECTION

### src/components/sections/PortfolioSection.tsx

```typescript
'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import GlassCard from '@/components/ui/GlassCard'
import MagneticButton from '@/components/ui/MagneticButton'

export interface Project {
  id: string
  title: string
  category: string
  year: string
  description: string
  image: string
  tags: string[]
  href?: string
}

interface PortfolioSectionProps {
  projects: Project[]
  categories?: string[]
}

export default function PortfolioSection({
  projects,
  categories = ['All', 'Web', 'Mobile', 'Branding', '3D'],
}: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section
      id="work"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-bg"
      aria-label="Portfolio"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-16 bg-gold" />
              <span className="text-label text-gold tracking-widest">Selected Work</span>
            </div>
            <motion.h2
              className="font-display text-display-lg text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
              Projects that define
              <span className="text-gold italic"> excellence</span>
            </motion.h2>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-5 py-2 rounded-full text-sm font-body tracking-wide transition-all duration-300
                  ${activeCategory === cat
                    ? 'bg-gold text-black font-semibold'
                    : 'border border-white/15 text-white/60 hover:border-gold/30 hover:text-white'
                  }
                `}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          layout
        >
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <GlassCard className="group overflow-hidden" href={project.href}>
                  {/* Image */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/60 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-label text-gold tracking-widest">View Project</span>
                    </motion.div>
                  </div>

                  {/* Project info */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-label text-gold/60 tracking-widest">
                        {project.category}
                      </span>
                      <span className="text-label text-white/30 tracking-widest">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="font-display text-display-sm text-white group-hover:text-gold transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="mt-3 font-body text-body-md text-white/50">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full border border-white/10 text-xs text-white/40 font-body"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## TESTIMONIALS SECTION

### src/components/sections/TestimonialsSection.tsx

```typescript
'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import GlassCard from '@/components/ui/GlassCard'

export interface Testimonial {
  id: string
  quote: string
  name: string
  title: string
  company: string
  avatar?: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const active = testimonials[activeIndex]

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-bg-surface overflow-hidden"
      aria-label="Client testimonials"
    >
      {/* Large decorative quote mark */}
      <div
        className="absolute top-16 left-12 font-display text-[20rem] text-white/[0.02] leading-none select-none pointer-events-none"
        aria-hidden
      >
        "
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px w-16 bg-gold" />
          <span className="text-label text-gold tracking-widest">What Clients Say</span>
        </div>

        {/* Active testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="p-10 md:p-16">
              {/* Stars */}
              <div className="flex gap-1 mb-8" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-gold text-xl" aria-hidden>★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote>
                <p className="font-display text-display-sm text-white leading-relaxed italic">
                  "{active.quote}"
                </p>
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-4 mt-10">
                {active.avatar && (
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-gold/20">
                    <img src={active.avatar} alt={active.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <p className="font-body font-semibold text-white">{active.name}</p>
                  <p className="font-body text-sm text-white/50">
                    {active.title} — {active.company}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-10" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className={`
                h-1 rounded-full transition-all duration-500
                ${i === activeIndex ? 'w-8 bg-gold' : 'w-2 bg-white/20 hover:bg-white/40'}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## SERVICES SECTION

### src/components/sections/ServicesSection.tsx

```typescript
'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassCard from '@/components/ui/GlassCard'

export interface Service {
  number: string
  title: string
  description: string
  deliverables: string[]
}

interface ServicesSectionProps {
  services: Service[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger service cards on scroll
      gsap.from('.service-card', {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1.0,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-bg"
      aria-label="Services"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-16 bg-gold" />
          <span className="text-label text-gold tracking-widest">What We Do</span>
        </div>

        <motion.h2
          className="font-display text-display-lg text-white max-w-3xl mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          Capabilities built for
          <span className="text-gold italic"> impact</span>
        </motion.h2>

        {/* Services grid */}
        <div className="services-grid grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div key={i} className="service-card" style={{ willChange: 'transform' }}>
              <GlassCard className="p-8 md:p-10 h-full group">
                {/* Number */}
                <span className="text-label text-gold/30 tracking-widest">
                  {service.number}
                </span>

                {/* Title */}
                <h3 className="font-display text-display-sm text-white mt-4 mb-4 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-body text-body-md text-white/55 mb-8">
                  {service.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-white/8 mb-8" />

                {/* Deliverables */}
                <ul className="space-y-3" aria-label="Deliverables">
                  {service.deliverables.map((item, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" aria-hidden />
                      <span className="font-body text-sm text-white/50">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## STATS COUNTER SECTION

### src/components/sections/StatsSection.tsx

```typescript
'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

export interface Stat {
  number: number
  suffix: string
  label: string
  description?: string
}

interface StatsSectionProps {
  stats: Stat[]
  headline?: string
}

// Animated counter component
function AnimatedCounter({
  target,
  suffix,
  trigger,
}: {
  target: number
  suffix: string
  trigger: boolean
}) {
  const [current, setCurrent] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (trigger && !hasAnimated.current) {
      hasAnimated.current = true
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration: 2.0,
        ease: 'power2.out',
        onUpdate: () => setCurrent(Math.round(obj.val)),
      })
    }
  }, [trigger, target])

  return (
    <span className="font-display text-display-lg text-white tabular-nums">
      {current.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsSection({
  stats,
  headline = 'Numbers that speak',
}: StatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      onEnter: () => setTriggered(true),
    })

    return () => trigger.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 bg-bg-deep"
      aria-label="Statistics"
    >
      {/* Gold background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.04), transparent)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Headline */}
        <motion.h2
          className="font-display text-display-md text-white text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          {headline}
        </motion.h2>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          role="list"
          aria-label="Company statistics"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center"
              role="listitem"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Gold accent top */}
              <div className="h-px w-12 bg-gold mb-6" />

              {/* Animated number */}
              <AnimatedCounter
                target={stat.number}
                suffix={stat.suffix}
                trigger={triggered}
              />

              {/* Label */}
              <p className="font-body text-body-md text-white/50 mt-3">
                {stat.label}
              </p>

              {/* Optional description */}
              {stat.description && (
                <p className="font-body text-sm text-white/30 mt-2 max-w-32">
                  {stat.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## CTA SECTION

### src/components/sections/CTASection.tsx

```typescript
'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import MagneticButton from '@/components/ui/MagneticButton'

interface CTASectionProps {
  headline?: string
  subtext?: string
  primaryCTA?: string
  secondaryCTA?: string
  primaryHref?: string
  secondaryHref?: string
}

export default function CTASection({
  headline     = "Ready to build something\nextraordinary?",
  subtext      = "Let's create an experience that your audience will never forget.",
  primaryCTA   = "Start a Project",
  secondaryCTA = "View Case Studies",
  primaryHref  = "/contact",
  secondaryHref = "/work",
}: CTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        }
      })

      tl
        .from('.cta-headline', {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out',
        })
        .from('.cta-sub', {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        }, '-=0.7')
        .from('.cta-btn', {
          y: 20,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.5')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-40 md:py-64 px-6 md:px-12 lg:px-24 bg-bg overflow-hidden"
      aria-label="Call to action"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.07), transparent 70%)',
        }}
      />

      {/* Decorative ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/5 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-gold/[0.03] pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Label */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-12 bg-gold" />
          <span className="text-label text-gold tracking-widest">Let's Talk</span>
          <div className="h-px w-12 bg-gold" />
        </div>

        {/* Headline */}
        <h2
          className="cta-headline font-display text-display-lg text-white"
          style={{ whiteSpace: 'pre-line' }}
        >
          {headline}
        </h2>

        {/* Subtext */}
        <p className="cta-sub mt-6 font-body text-body-lg text-white/55 max-w-xl mx-auto">
          {subtext}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-14">
          <MagneticButton href={primaryHref} className="cta-btn">
            <div className="px-10 py-5 rounded-full bg-gold text-black font-semibold font-body text-base tracking-wide hover:bg-gold-bright transition-colors duration-300">
              {primaryCTA}
            </div>
          </MagneticButton>

          <MagneticButton href={secondaryHref} className="cta-btn">
            <div className="px-10 py-5 rounded-full border border-white/15 text-white font-body text-base tracking-wide hover:border-gold/40 hover:text-gold transition-all duration-300">
              {secondaryCTA}
            </div>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
```

---

## FOOTER SECTION

### src/components/layout/Footer.tsx

```typescript
'use client'

import { motion } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'

interface FooterLink {
  label: string
  href: string
}

interface FooterProps {
  brand: string
  tagline?: string
  links?: { group: string; items: FooterLink[] }[]
  socials?: FooterLink[]
  legal?: string
}

export default function Footer({
  brand,
  tagline = 'Crafting the extraordinary.',
  links = [],
  socials = [],
  legal,
}: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative bg-bg-deep border-t border-white/5 py-20 px-6 md:px-12 lg:px-24"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="/" className="font-display text-2xl text-white hover:text-gold transition-colors duration-300">
              {brand}
            </a>
            <p className="mt-4 font-body text-body-md text-white/40 max-w-xs">
              {tagline}
            </p>

            {/* Social links */}
            {socials.length > 0 && (
              <div className="flex gap-4 mt-8">
                {socials.map((social) => (
                  <MagneticButton key={social.label} href={social.href}>
                    <span className="font-body text-sm text-white/40 hover:text-gold transition-colors duration-300">
                      {social.label}
                    </span>
                  </MagneticButton>
                ))}
              </div>
            )}
          </div>

          {/* Link groups */}
          {links.map((group) => (
            <div key={group.group}>
              <h3 className="text-label text-white/30 tracking-widest mb-6">
                {group.group}
              </h3>
              <ul className="space-y-4">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="font-body text-white/55 hover:text-gold transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-body text-sm text-white/25">
            © {year} {brand}. All rights reserved.
          </p>
          {legal && (
            <p className="font-body text-sm text-white/25">
              {legal}
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
```

---

## PAGE TRANSITIONS

### src/components/layout/PageTransition.tsx

```typescript
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }}
        exit={{
          opacity: 0,
          y: -20,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### Curtain Wipe Transition (advanced)

```typescript
// For more dramatic page transitions — black curtain wipe
export function CurtainTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <AnimatePresence>
        <motion.div
          key={`curtain-${pathname}`}
          className="fixed inset-0 z-[200] bg-black pointer-events-none"
          initial={{ scaleY: 0, transformOrigin: 'top' }}
          animate={{
            scaleY: [0, 1, 1, 0],
            transformOrigin: ['top', 'top', 'bottom', 'bottom'],
          }}
          transition={{
            duration: 1.2,
            times: [0, 0.4, 0.6, 1.0],
            ease: 'easeInOut',
          }}
        />
      </AnimatePresence>
      {children}
    </>
  )
}
```

---

## MOBILE RESPONSIVE RULES

### Mandatory Mobile Adaptations

```
Rule 1: Touch targets minimum 44x44px — all buttons and links
Rule 2: Three.js canvas — reduce geometry complexity on mobile (detect via window.innerWidth)
Rule 3: Magnetic effects — disable on touch devices (no hover)
Rule 4: Custom cursor — hide completely on touch devices
Rule 5: Parallax — reduce speed multiplier on mobile or disable
Rule 6: GSAP animations — reduce distance and duration on mobile
Rule 7: Video scrub — may need touch scroll adapter on iOS
Rule 8: Typography — clamp() ensures readable sizes at all breakpoints
Rule 9: Padding — minimum 24px horizontal on mobile (px-6)
Rule 10: Video autoplay — requires muted + playsInline on iOS
```

### Device Detection Hook

```typescript
// src/hooks/useDevice.ts
'use client'

import { useEffect, useState } from 'react'

interface DeviceInfo {
  isMobile: boolean
  isTouch: boolean
  isLowPower: boolean
}

export function useDevice(): DeviceInfo {
  const [device, setDevice] = useState<DeviceInfo>({
    isMobile: false,
    isTouch: false,
    isLowPower: false,
  })

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    // Check for low-power mode heuristic (limited GPU cores)
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl')
    const renderer = gl?.getExtension('WEBGL_debug_renderer_info')
    const gpuInfo = renderer
      ? gl?.getParameter(renderer.UNMASKED_RENDERER_WEBGL) as string
      : ''
    const isLowPower = gpuInfo?.toLowerCase().includes('apple') &&
      gpuInfo?.toLowerCase().includes('a1') // Very old Apple chips

    setDevice({ isMobile, isTouch, isLowPower })
  }, [])

  return device
}
```

---

## PERFORMANCE OPTIMIZATION

### Checklist — Apply to Every Build

```
[ ] All animation elements have will-change: transform
[ ] Images use Next.js <Image> with sizes prop and priority on hero
[ ] Three.js canvas uses powerPreference: 'high-performance'
[ ] GSAP uses gsap.context() and cleanup on unmount
[ ] ScrollTrigger instances killed in useEffect cleanup
[ ] Lenis RAF integrated with gsap.ticker (not double RAF)
[ ] Heavy components use dynamic import with ssr: false
[ ] Fonts loaded via next/font (zero FOUT / CLS)
[ ] CSS animations use GPU-composited properties only: transform, opacity
[ ] No layout-triggering properties in animations: width, height, top, left, margin, padding
[ ] Particle count ≤ 5000 on desktop, ≤ 2000 on mobile
[ ] Video element preload="auto" for instant scrub response
[ ] Lazy load all off-screen images
[ ] No unused CSS — Tailwind purges correctly
[ ] React StrictMode in development only
```

### GPU-Safe Animation Properties

```typescript
// ALWAYS use these for animations — GPU composited
const GPU_SAFE = ['transform', 'opacity', 'filter']

// NEVER animate these — trigger layout reflow
const AVOID = ['width', 'height', 'top', 'left', 'right', 'bottom', 'margin', 'padding', 'border-width']

// Correct — uses transform
gsap.to(element, { x: 100, y: 50, scale: 1.1, opacity: 0.8 })

// Wrong — triggers reflow
gsap.to(element, { left: 100, marginTop: 50, width: 200 })
```

---

## ACCESSIBILITY STANDARDS

### Required for Every Section

```typescript
// 1. Semantic HTML structure
<main>
  <section aria-label="descriptive name">
    <h1>, <h2>, <h3> — proper hierarchy
    <nav aria-label="main navigation">
    <footer role="contentinfo">

// 2. All interactive elements keyboard accessible
<button>, <a href> — never <div onClick>

// 3. Focus styles — visible but stylish
:focus-visible {
  outline: 2px solid #C9A84C;
  outline-offset: 4px;
  border-radius: 4px;
}

// 4. Reduced motion support
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

// 5. Color contrast — text/bg must meet WCAG AA
// White on black: passes AAA
// Gold (#C9A84C) on black: 5.8:1 — passes AA
// White/60 on black: 3.8:1 — passes AA for large text

// 6. Alt text on all images
<Image src={src} alt="Descriptive alt text" />

// 7. ARIA labels on icon-only buttons
<button aria-label="Close menu">
  <XIcon aria-hidden />
</button>

// 8. Screen reader text for decorative elements
<div aria-hidden="true"> {/* decorative gold lines, particles */}

// 9. Video elements
<video muted playsInline preload="auto" aria-hidden="true">
// If video contains meaningful content, provide transcript

// 10. Loading states communicated to screen readers
<div role="status" aria-live="polite">Loading...</div>
```

---

## SEO METADATA SETUP

### src/app/layout.tsx — Full Metadata Configuration

```typescript
import type { Metadata } from 'next'
import { playfair, dmSans, jetbrainsMono } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Studio Name — Premium Digital Experiences',
    template: '%s — Studio Name',
  },
  description: 'We craft cinematic digital experiences that define brands and move audiences.',
  keywords: ['web design', 'digital studio', 'luxury web', 'motion design', 'Next.js'],
  authors: [{ name: 'Studio Name' }],
  creator: 'Studio Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://studio.com',
    siteName: 'Studio Name',
    title: 'Studio Name — Premium Digital Experiences',
    description: 'Cinematic digital experiences that define brands.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Studio Name' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Name',
    description: 'Cinematic digital experiences.',
    images: ['/og-image.jpg'],
    creator: '@studiohandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-token',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-white antialiased">
        {children}
      </body>
    </html>
  )
}
```

---

## DEPLOYMENT CHECKLIST

### Pre-Deploy Verification

```
[ ] npm run build — zero errors, zero warnings
[ ] npm run lint  — clean ESLint output
[ ] TypeScript strict mode — no type errors
[ ] Test on: Chrome, Firefox, Safari, Edge (latest)
[ ] Test on: iPhone 12+, Samsung Galaxy S21+
[ ] Lighthouse audit: Performance > 85, Accessibility > 95
[ ] LCP < 2.5s on desktop (3G throttled)
[ ] CLS < 0.1 — no layout shift from fonts or images
[ ] All meta tags present: title, description, OG, Twitter
[ ] robots.txt in public/ directory
[ ] sitemap.xml generated or configured
[ ] Environment variables set in Vercel dashboard
[ ] Video files served from CDN (not git repo)
[ ] Images optimized: WebP format, correct sizes
[ ] Three.js fallback for unsupported WebGL browsers
[ ] GSAP license valid for commercial use (Club GSAP for SplitText)
[ ] Domain configured in Vercel with SSL
[ ] Analytics configured (if required)
```

### vercel.json Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## AI EXECUTION RULES

### Mandatory Rules for AI Agents Using This Skill

```
RULE 01: Read this entire SKILL.md before writing any code.
         Do not skip sections. Understanding comes before execution.

RULE 02: Never use placeholder comments like // TODO or // Add content here.
         Every function, component, and hook must have complete working code.

RULE 03: Never abbreviate code with "...rest of the component..." or similar.
         Output complete files every time, no exceptions.

RULE 04: Never use default fonts. Always configure next/font before any component code.

RULE 05: Always import GSAP plugins at the top of each file that uses them.
         Never assume global registration unless confirmed.

RULE 06: Every useEffect that creates GSAP animations must return a cleanup function.
         gsap.context() with ctx.revert() is the standard cleanup pattern.

RULE 07: Every ScrollTrigger instance must be killed in the useEffect cleanup.
         Memory leaks from uncleaned ScrollTriggers cause severe performance issues.

RULE 08: Three.js canvas must be loaded with next/dynamic and ssr: false.
         Server-side rendering Three.js will crash the build.

RULE 09: Videos must have muted and playsInline attributes for iOS autoplay.
         Without these, mobile video will not autoplay.

RULE 10: All interactive elements must be <button> or <a> tags.
         Never use <div onClick> — keyboard inaccessible.

RULE 11: use will-change: transform on every animated element.
         This primes the GPU compositor and prevents jank.

RULE 12: Tailwind classes must use the exact values defined in tailwind.config.ts.
         Do not invent class names that do not exist in the config.

RULE 13: TypeScript interfaces must be defined before use.
         Export interfaces that are used across multiple files.

RULE 14: File paths must match the file structure exactly as defined in this skill.
         Mismatched paths break imports silently in large projects.

RULE 15: Every section component must have an id attribute for internal linking.
         Navigation anchors require matching section IDs.

RULE 16: When user provides video, always set keyframes first before building components.
         Keyframe content drives the entire overlay text system.

RULE 17: Component props must always have TypeScript interfaces with defaults.
         Hardcoded values inside components are not reusable.

RULE 18: Never animate layout properties: width, height, top, left, margin, padding.
         Only animate: transform (x, y, scale, rotate), opacity, filter.

RULE 19: Lenis and GSAP ScrollTrigger must be synchronized via gsap.ticker.
         Running them independently causes scroll position conflicts.

RULE 20: The GoldProgressBar must be fixed-position and outside the video container.
         Position it as a sibling to the entire page, not inside the video section.
```

---

## ERROR PREVENTION GUIDE

### Common Mistakes and Fixes

#### Mistake 1: Three.js SSR crash
```typescript
// WRONG
import HeroCanvas from '@/components/three/HeroCanvas'

// CORRECT
import dynamic from 'next/dynamic'
const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), { ssr: false })
```

#### Mistake 2: GSAP ScrollTrigger memory leak
```typescript
// WRONG
useEffect(() => {
  gsap.from('.element', { y: 100, scrollTrigger: { trigger: '.element' } })
}, [])

// CORRECT
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.element', { y: 100, scrollTrigger: { trigger: '.element' } })
  }, sectionRef)
  return () => ctx.revert()
}, [])
```

#### Mistake 3: Lenis conflict with ScrollTrigger
```typescript
// WRONG — double RAF loop
lenis.on('scroll', () => {}) // separate from GSAP
requestAnimationFrame(function raf(time) { lenis.raf(time); requestAnimationFrame(raf) })

// CORRECT — unified via GSAP ticker
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)
```

#### Mistake 4: Video not scrubbing on iOS
```typescript
// WRONG
<video src={src} />

// CORRECT — required attributes for iOS
<video src={src} muted playsInline preload="auto" />
```

#### Mistake 5: Framer Motion layout animation breaking
```typescript
// WRONG — AnimatePresence without layout on children
<AnimatePresence>
  {items.map(item => <motion.div key={item.id}>...</motion.div>)}
</AnimatePresence>

// CORRECT — add layout prop when items filter/reorder
<AnimatePresence>
  {items.map(item => <motion.div key={item.id} layout>...</motion.div>)}
</AnimatePresence>
```

#### Mistake 6: Custom cursor visible on mobile
```typescript
// In CustomCursor component — add touch detection
useEffect(() => {
  const isTouch = 'ontouchstart' in window
  if (isTouch) return  // skip cursor on touch devices
  // ... cursor setup code
}, [])
```

#### Mistake 7: GSAP SplitText not imported
```typescript
// SplitText is a Club GSAP plugin — must register explicitly
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText)

// Alternative: use custom DOM-based split (see SplitText.tsx component above)
// This avoids Club GSAP requirement entirely
```

#### Mistake 8: Font not applying to display classes
```typescript
// WRONG — variable not passed to html element
<html>

// CORRECT — font variables must be on html root
<html className={`${playfair.variable} ${dmSans.variable}`}>

// And in tailwind.config.ts
fontFamily: {
  display: ['var(--font-display)', 'Georgia', 'serif'],
}
```

#### Mistake 9: ScrollTrigger not refreshing after layout change
```typescript
// After dynamic content loads or layout changes
ScrollTrigger.refresh()

// In Next.js, call after fonts load and images settle
useEffect(() => {
  const timer = setTimeout(() => ScrollTrigger.refresh(), 500)
  return () => clearTimeout(timer)
}, [])
```

#### Mistake 10: Backdropfilter not working in Safari
```css
/* Always include WebKit prefix */
.glass-card {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}
```

---

## QUICK REFERENCE CARD

### When User Says → You Do

```
"build a hero"              → HeroSection.tsx + HeroCanvas.tsx + useLenis.ts
"add video scroll"          → VideoScrollSection.tsx + useVideoScrub.ts + GoldProgressBar.tsx
"show portfolio"            → PortfolioSection.tsx + GlassCard.tsx
"testimonials"              → TestimonialsSection.tsx
"services section"          → ServicesSection.tsx
"numbers / stats"           → StatsSection.tsx with AnimatedCounter
"call to action"            → CTASection.tsx + MagneticButton.tsx
"footer"                    → Footer.tsx
"smooth scroll"             → useLenis.ts integrated in layout.tsx
"page transition"           → PageTransition.tsx wrapping page content
"split text animation"      → SplitText.tsx or useSplitTextAnimation hook
"parallax"                  → ParallaxLayer + ParallaxSection
"horizontal scroll"         → HorizontalScroll.tsx
"custom cursor"             → CustomCursor.tsx registered in layout
"glass card"                → GlassCard.tsx with tilt and glow props
"magnetic button"           → MagneticButton.tsx
"gold progress bar"         → GoldProgressBar.tsx
"floating 3d"               → FloatingGeometry.tsx or HeroCanvas.tsx
"analyze video keyframes"   → Use VIDEO_KEYFRAME template, request timestamps from user
"setup project"             → Follow Project Initialization steps 1-5 in order
```

---

## DESIGN DECISIONS LOG

### Why These Choices Were Made

```
Black background (#000 / #050508):
  Reason: Maximum contrast for text. Gold pops against black. Cinematic film aesthetic.
  Luxury brands (Apple, Cartier, Rolex) use deep dark backgrounds for premium positioning.

Playfair Display for display text:
  Reason: Dramatic serifs signal premium quality. High x-height. Excellent large-size rendering.
  Contrast with clean body font creates editorial tension.

#C9A84C gold (warm, not garish):
  Reason: This is antique gold — warm, sophisticated. Avoids the #FFD700 "cheap gold" trap.
  Works at all sizes. Maintains legibility against black at 5.8:1 contrast ratio.

Glassmorphism cards:
  Reason: Depth without solid blocks. Allows background Three.js to show through.
  Creates layered sense of space. Feels contemporary and premium.

GSAP over CSS animations for scroll:
  Reason: ScrollTrigger's scrub capability has no CSS equivalent.
  GSAP's ease library has 40+ timing functions CSS can't replicate.
  Performance is identical (both GPU-composited) but GSAP is dramatically more controllable.

Lenis over native scroll:
  Reason: Native momentum scroll varies by OS and browser. Lenis normalizes across all platforms.
  Enables exact scroll velocity control needed for video scrub precision.

Framer Motion for component micro-interactions:
  Reason: React Spring and CSS handle simple cases but Framer's AnimatePresence and
  layout animations are unmatched for complex state-driven transitions.
  Declarative API reduces animation code complexity by 60%.

next/font for typography:
  Reason: Zero FOUT (flash of unstyled text). Eliminates CLS (cumulative layout shift).
  Self-hosts Google Fonts — no external network request, privacy improvement.

Dynamic import for Three.js:
  Reason: Three.js requires browser globals (WebGL context). Next.js SSR runs in Node.js.
  Dynamic import with ssr:false defers loading until browser environment is available.
```

---

*End of SKILL.md — Ultra-Premium Cinematic Web Experience*
*Total lines: ~2,400 | Version: 1.0.0 | Target: Awwwards-caliber output*
