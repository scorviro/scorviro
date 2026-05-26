'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const wrapper = wrapperRef.current
    const title = titleRef.current
    const line = lineRef.current
    const subtitle = subtitleRef.current
    const tagline = taglineRef.current
    const indicator = scrollIndicatorRef.current

    // 1. Entrance timeline on load
    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo(title,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'power4.out' }
    )
    .fromTo(line,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.9'
    )
    .fromTo(subtitle,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
      '-=0.7'
    )
    .fromTo(tagline,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power1.out' },
      '-=0.5'
    )
    .fromTo(indicator,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
      '-=0.8'
    )

    // 2. Parallax effect on scroll
    if (containerRef.current && wrapper) {
      gsap.to(wrapper, {
        y: 120,
        opacity: 0,
        scale: 0.95,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom 40%',
          scrub: 1,
        }
      })
    }

    if (containerRef.current && indicator) {
      gsap.to(indicator, {
        opacity: 0,
        y: 30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '20% top',
          scrub: true,
        }
      })
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-transparent select-none pt-[72px]"
    >
      {/* Scroll-scrub Wrapper */}
      <div
        ref={wrapperRef}
        className="relative z-10 flex flex-col items-center justify-center max-w-4xl px-6"
      >
        {/* Element A: Main Title */}
        <h1
          ref={titleRef}
          className="font-display text-white font-normal leading-none tracking-[0.28em] uppercase opacity-0"
          style={{
            fontSize: 'clamp(28px, 10vw, 175px)',
          }}
        >
          SCORVIRO
        </h1>

        {/* Element B: White Divider Line */}
        <div
          ref={lineRef}
          className="w-[48px] h-[1px] bg-white my-5 origin-center opacity-0"
        />

        {/* Element C: Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-[9px] sm:text-[11px] text-white/80 tracking-[0.4em] sm:tracking-[0.55em] uppercase opacity-0"
        >
          CINEMATIC DIGITAL STUDIO
        </p>

        {/* Element D: Tagline */}
        <p
          ref={taglineRef}
          className="font-body font-light text-[13px] sm:text-[15px] text-white/45 tracking-[0.04em] mt-5 opacity-0 px-4 sm:px-0"
        >
          Capturing Moments. Crafting Stories. Creating Impact.
        </p>
      </div>

      {/* Bottom of section - scroll indicator in White */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none opacity-0"
      >
        <span className="font-body text-[10px] tracking-[0.35em] text-white/55 uppercase">
          SCROLL
        </span>
        <div className="w-[1px] h-[40px] overflow-hidden relative">
          <div
            className="w-full h-full bg-gradient-to-b from-white to-transparent origin-top animate-[pulseScroll_1.8s_ease-in-out_infinite_alternate]"
            style={{
              transformOrigin: 'top'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes pulseScroll {
          0% { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </section>
  )
}
