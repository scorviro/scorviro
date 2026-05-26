'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  decay: number
  color: string
}

interface Shockwave {
  x: number
  y: number
  radius: number
  maxRadius: number
  alpha: number
  speed: number
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // SVG refs
  const triangleRef = useRef<SVGPolygonElement>(null)
  const eyeContainerRef = useRef<SVGGElement>(null)
  const eyeLidUpperRef = useRef<SVGPathElement>(null)
  const eyeLidLowerRef = useRef<SVGPathElement>(null)
  const pupilRef = useRef<SVGCircleElement>(null)
  
  // Brand refs
  const brandTextRef = useRef<HTMLDivElement>(null)
  const logoLeftRef = useRef<SVGPathElement>(null)
  const logoRightRef = useRef<SVGPathElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  
  // State
  const [exitStarted, setExitStarted] = useState(false)
  
  // Particle & Shockwave arrays
  const particles = useRef<Particle[]>([])
  const shockwaves = useRef<Shockwave[]>([])

  useEffect(() => {
    // Lock scrolling on load
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Sizing canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * (window.devicePixelRatio || 1)
      canvas.height = window.innerHeight * (window.devicePixelRatio || 1)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle Spawning helper
    const spawnParticle = (x: number, y: number, isBurst = false) => {
      const angle = Math.random() * Math.PI * 2
      const speed = isBurst ? Math.random() * 4 + 2 : Math.random() * 0.4 + 0.1
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: isBurst ? Math.sin(angle) * speed : -speed - 0.2, // Drift up
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.5,
        decay: isBurst ? Math.random() * 0.02 + 0.015 : Math.random() * 0.005 + 0.002,
        color: Math.random() > 0.3 ? 'rgba(255, 255, 255, ' : 'rgba(200, 200, 200, ' // White / grey particles
      })
    }

    // Trigger shockwave helper
    const triggerShockwave = (x: number, y: number, maxRadius = 150) => {
      shockwaves.current.push({
        x,
        y,
        radius: 5,
        maxRadius,
        alpha: 0.8,
        speed: 3
      })
    }

    // Spawn ambient atmosphere particles
    for (let i = 0; i < 40; i++) {
      spawnParticle(Math.random() * canvas.width, Math.random() * canvas.height)
    }

    // Canvas animation loop
    let animationFrameId: number
    const render = () => {
      ctx.fillStyle = '#020202'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 1. Draw glowing volumetric center light (White/gray glow)
      const centerGrad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.6
      )
      centerGrad.addColorStop(0, 'rgba(255, 255, 255, 0.03)')
      centerGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.005)')
      centerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = centerGrad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 2. Draw & Update Shockwaves
      shockwaves.current.forEach((sw, idx) => {
        sw.radius += sw.speed
        sw.alpha = 1 - (sw.radius / sw.maxRadius)
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${sw.alpha * 0.25})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2)
        ctx.stroke()

        if (sw.radius >= sw.maxRadius) {
          shockwaves.current.splice(idx, 1)
        }
      })

      // 3. Draw & Update Particles
      particles.current.forEach((p, idx) => {
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay

        ctx.fillStyle = p.color + p.alpha + ')'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()

        // Delete dead particles
        if (p.alpha <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0) {
          particles.current.splice(idx, 1)
        }
      })

      // Spawn ambient particles continuously
      if (Math.random() < 0.25) {
        spawnParticle(Math.random() * canvas.width, canvas.height)
      }

      animationFrameId = requestAnimationFrame(render)
    }
    render()

    // ----------------------------------------------------
    // Motion Choreography Sequence (GSAP Timeline)
    // ----------------------------------------------------
    const masterTl = gsap.timeline({
      onComplete: () => {
        // Complete preloader and unmount
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
        onComplete()
      }
    })

    // Setup initial SVG states
    const tri = triangleRef.current
    if (tri) {
      const triLength = 260 // approx perimeter of triangle
      gsap.set(tri, {
        strokeDasharray: triLength,
        strokeDashoffset: triLength,
        opacity: 0
      })
    }

    gsap.set(eyeContainerRef.current, { opacity: 0, scale: 0.9 })
    gsap.set([eyeLidUpperRef.current, eyeLidLowerRef.current], { scaleY: 0, transformOrigin: 'center' })
    gsap.set(pupilRef.current, { scale: 0, opacity: 0, transformOrigin: 'center' })
    gsap.set(brandTextRef.current, { opacity: 0 })
    
    // Initial logo halves setup (separated)
    gsap.set(logoLeftRef.current, { x: -80, opacity: 0 })
    gsap.set(logoRightRef.current, { x: 80, opacity: 0 })

    // Step 1: Draw White Triangle
    masterTl.to(tri, {
      opacity: 1,
      strokeDashoffset: 0,
      duration: 2.0,
      ease: 'power2.inOut',
      onUpdate: () => {
        // Spawn subtle particles around triangle path
        const rect = canvas.getBoundingClientRect()
        const cx = (rect.left + rect.width / 2) * (window.devicePixelRatio || 1)
        const cy = (rect.top + rect.height / 2) * (window.devicePixelRatio || 1)
        if (Math.random() < 0.3) {
          spawnParticle(cx + (Math.random() - 0.5) * 60, cy + (Math.random() - 0.5) * 60)
        }
      }
    })

    // Step 2: Open Eye inside triangle
    masterTl.to(eyeContainerRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=0.6')

    masterTl.to([eyeLidUpperRef.current, eyeLidLowerRef.current], {
      scaleY: 1,
      duration: 1.5,
      ease: 'power4.inOut'
    }, '-=1.0')

    masterTl.to(pupilRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'back.out(1.5)',
      onComplete: () => {
        const rect = canvas.getBoundingClientRect()
        const cx = (rect.left + rect.width / 2) * (window.devicePixelRatio || 1)
        const cy = (rect.top + rect.height / 2) * (window.devicePixelRatio || 1)
        triggerShockwave(cx, cy - 8, 180)
      }
    }, '-=0.8')

    // Step 3: Blink 1 & 2 (Quick succession with shockwaves)
    const blinkEye = (duration: number) => {
      const tl = gsap.timeline()
      tl.to([eyeLidUpperRef.current, eyeLidLowerRef.current], {
        scaleY: 0.1,
        duration: duration * 0.3,
        ease: 'power2.in'
      })
      .to(pupilRef.current, {
        scaleY: 0.1,
        duration: duration * 0.3,
        ease: 'power2.in'
      }, '<')
      .to([eyeLidUpperRef.current, eyeLidLowerRef.current], {
        scaleY: 1,
        duration: duration * 0.7,
        ease: 'power2.out',
        onComplete: () => {
          const rect = canvas.getBoundingClientRect()
          const cx = (rect.left + rect.width / 2) * (window.devicePixelRatio || 1)
          const cy = (rect.top + rect.height / 2) * (window.devicePixelRatio || 1)
          // Trigger shockwave and particle burst
          triggerShockwave(cx, cy - 8, 220)
          for (let i = 0; i < 15; i++) {
            spawnParticle(cx, cy - 8, true)
          }
        }
      })
      .to(pupilRef.current, {
        scaleY: 1,
        duration: duration * 0.7,
        ease: 'power2.out'
      }, '<')
      return tl
    }

    masterTl.add(blinkEye(0.35), '+=0.6')
    masterTl.add(blinkEye(0.35), '+=0.8')

    // Step 4: Collision of the "S" Logo halves
    masterTl.set([logoLeftRef.current, logoRightRef.current], { opacity: 1 }, '+=0.5')
    
    masterTl.to(logoLeftRef.current, {
      x: 0,
      duration: 0.8,
      ease: 'power4.in'
    })
    masterTl.to(logoRightRef.current, {
      x: 0,
      duration: 0.8,
      ease: 'power4.in'
    }, '<')

    // Trigger flash, camera shake, and particle explosion upon collision
    masterTl.add(() => {
      const rect = canvas.getBoundingClientRect()
      const cx = (rect.left + rect.width / 2) * (window.devicePixelRatio || 1)
      const cy = (rect.top + rect.height / 2 + 100) * (window.devicePixelRatio || 1) // logo Y

      // 1. Flash effect
      if (flashRef.current) {
        gsap.fromTo(flashRef.current, 
          { opacity: 0.9 },
          { opacity: 0, duration: 0.6, ease: 'power2.out' }
        )
      }

      // 2. Camera shake container
      if (containerRef.current) {
        const shakeTl = gsap.timeline()
        shakeTl.to(containerRef.current, { x: -6, y: -4, duration: 0.05 })
               .to(containerRef.current, { x: 6, y: 4, duration: 0.05 })
               .to(containerRef.current, { x: -4, y: 2, duration: 0.05 })
               .to(containerRef.current, { x: 4, y: -2, duration: 0.05 })
               .to(containerRef.current, { x: -2, y: 2, duration: 0.05 })
               .to(containerRef.current, { x: 2, y: -2, duration: 0.05 })
               .to(containerRef.current, { x: 0, y: 0, duration: 0.05 })
      }

      // 3. Large shockwave and particle burst
      triggerShockwave(cx, cy, 350)
      for (let i = 0; i < 35; i++) {
        spawnParticle(cx, cy, true)
      }
    })

    // Step 5: Reveal SCORVIRO characters line-by-line / letter-by-letter
    masterTl.to(brandTextRef.current, {
      opacity: 1,
      duration: 0.4
    })
    
    if (brandTextRef.current) {
      const chars = brandTextRef.current.querySelectorAll('.char')
      masterTl.fromTo(chars,
        { opacity: 0, y: 15, filter: 'blur(3px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.05, ease: 'power3.out' },
        '-=0.2'
      )
    }

    // Step 6: Eye looks left to right
    masterTl.to(pupilRef.current, {
      x: -6,
      duration: 0.6,
      ease: 'power2.out'
    }, '+=0.5')
    
    masterTl.to(pupilRef.current, {
      x: 6,
      duration: 1.0,
      ease: 'power2.inOut'
    }, '+=0.4')

    masterTl.to(pupilRef.current, {
      x: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '+=0.3')

    // Step 7: Dissolve Eye & Triangle into particles, leaving only logo
    masterTl.add(() => {
      const rect = canvas.getBoundingClientRect()
      const cx = (rect.left + rect.width / 2) * (window.devicePixelRatio || 1)
      const cy = (rect.top + rect.height / 2) * (window.devicePixelRatio || 1)

      for (let i = 0; i < 40; i++) {
        spawnParticle(cx + (Math.random() - 0.5) * 80, cy + (Math.random() - 0.5) * 80, true)
      }
    }, '+=0.8')

    // Fade out Eye and Triangle
    masterTl.to([tri, eyeContainerRef.current], {
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      ease: 'power3.inOut'
    }, '<')

    // Smooth ambient pause at final state (Logo glowing)
    masterTl.to({}, { duration: 1.5 })

    // Exit preloader: Fade out entire screen
    masterTl.to(containerRef.current, {
      opacity: 0,
      scale: 1.03,
      filter: 'blur(8px)',
      duration: 1.0,
      ease: 'power2.inOut'
    })

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
      masterTl.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full z-[999] bg-[#020202] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Volumetric ambient particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      {/* Screen flash overlay for logo collision impact */}
      <div 
        ref={flashRef}
        className="absolute inset-0 bg-white/20 z-30 pointer-events-none mix-blend-screen opacity-0"
      />

      {/* Main volumetric motion graphic elements */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* SVG Wrapper for Triangle + Eye */}
        <svg
          className="w-48 h-48 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Illuminati-style Triangle in White */}
          <polygon
            ref={triangleRef}
            points="50,15 12,81 88,81"
            stroke="url(#whiteGradient)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Glowing Eye Group */}
          <g ref={eyeContainerRef} className="origin-center">
            {/* Eyelids Outer Shape */}
            <path
              ref={eyeLidUpperRef}
              d="M 28 52 C 35 34, 65 34, 72 52"
              stroke="url(#whiteGradient)"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
            <path
              ref={eyeLidLowerRef}
              d="M 28 52 C 35 70, 65 70, 72 52"
              stroke="url(#whiteGradient)"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
            {/* Iris Inner Ring - Solid white (no dasharray) */}
            <circle
              cx="50"
              cy="52"
              r="9.5"
              stroke="url(#whiteGradient)"
              strokeWidth="0.5"
              className="opacity-60 animate-[spin_25s_linear_infinite]"
              style={{ transformOrigin: '50px 52px' }}
            />
            {/* Pupil Center */}
            <circle
              ref={pupilRef}
              cx="50"
              cy="52"
              r="4.5"
              fill="url(#whiteGradient)"
            />
          </g>

          {/* Volumetric Gradients Definitions */}
          <defs>
            <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#a0a0a0" />
              <stop offset="100%" stopColor="#e0e0e0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Logo and Brand Reveal Container */}
        <div className="absolute top-[135px] flex flex-col items-center gap-6">
          
          {/* Interlocking S Logo Animation (slides and collides) in White */}
          <svg
            className="w-12 h-12 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Left Curve Half of "S" */}
            <path
              ref={logoLeftRef}
              d="M 50 18 C 30 18, 25 38, 45 50 C 49 52, 50 54, 50 55"
              stroke="url(#whiteGradient)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Right Curve Half of "S" */}
            <path
              ref={logoRightRef}
              d="M 50 45 C 50 46, 51 48, 55 50 C 75 62, 70 82, 50 82"
              stroke="url(#whiteGradient)"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>

          {/* Cinematic Letter-by-Letter "SCORVIRO" Reveal */}
          <div
            ref={brandTextRef}
            className="font-display text-white text-3xl tracking-[0.4em] uppercase font-light flex items-center pl-[0.4em]"
          >
            {Array.from("SCORVIRO").map((char, index) => (
              <span key={index} className="char inline-block select-none">
                {char}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
