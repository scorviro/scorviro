'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const centerColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  const team = [
    {
      index: '01',
      name: 'Dhaval Chavda',
      role: 'Creative Director',
      desc: 'Artistic direction & visual narrative design.'
    },
    {
      index: '02',
      name: 'Dhanraj Chavda',
      role: 'Technical Head',
      desc: 'High-performance creative engineering.'
    },
    {
      index: '03',
      name: 'Mohit Chudasama',
      role: 'Design Strategist',
      desc: 'Brand positioning & conceptual art.'
    }
  ]

  const credo = [
    {
      num: 'I',
      title: 'Uncompromising Depth',
      text: 'We design for impact, rejecting superficial trends to focus on authentic visual storytelling.'
    },
    {
      num: 'II',
      title: 'Structural Synergy',
      text: 'Every frame, pixel, and transition exists in choreography with the overarching digital rhythm.'
    },
    {
      num: 'III',
      title: 'Tactile Precision',
      text: 'Merging classic design discipline with cutting-edge technology for premium feel.'
    }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const leftCol = leftColRef.current
    const centerCol = centerColRef.current
    const rightCol = rightColRef.current
    const container = containerRef.current
    const wrapper = wrapperRef.current

    if (leftCol && centerCol && rightCol && container && wrapper) {
      // 1. Entrance reveals (Triggered once)
      gsap.fromTo(leftCol,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: leftCol,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo(centerCol,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: centerCol,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo(rightCol,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: rightCol,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      const teamItems = centerCol.querySelectorAll('.team-item')
      gsap.fromTo(teamItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: centerCol,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      const credoItems = rightCol.querySelectorAll('.credo-item')
      gsap.fromTo(credoItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightCol,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // 2. Continuous Scroll Parallax/Motion Scrub
      gsap.to(leftCol, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      })

      gsap.to(centerCol, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      })

      gsap.to(rightCol, {
        y: -90,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      })

      // 3. Unified Cinematic Entrance & Exit Scroll Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        }
      })

      tl.fromTo(wrapper,
        { opacity: 0, scale: 0.98, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'none' }
      )
      .to(wrapper, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 3,
        ease: 'none'
      })
      .to(wrapper, {
        opacity: 0,
        scale: 0.98,
        y: -50,
        duration: 1,
        ease: 'none'
      })
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen py-[150px] px-6 md:px-[80px] bg-transparent overflow-hidden"
    >
      <div className="about-bg absolute inset-0 bg-transparent pointer-events-none z-0" />

      {/* Asymmetrical 3-Column Editorial Layout wrapped for exit scroll scrub */}
      <div
        ref={wrapperRef}
        className="relative z-10 max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-y-[80px] lg:gap-x-[64px]"
      >
        
        {/* Column 1: Philosophy Headline */}
        <div
          ref={leftColRef}
          className="lg:col-span-5 flex flex-col items-start text-left opacity-0"
        >
          <span className="font-body text-[9px] tracking-[0.45em] text-white uppercase mb-6 font-semibold">
            ABOUT US /
          </span>

          <h2
            className="font-display text-white font-light leading-[1.08] tracking-tight mb-8"
            style={{
              fontSize: 'clamp(36px, 5.2vw, 68px)',
            }}
          >
            Architects of <br />
            High-Fidelity <br />
            Visual Design.
          </h2>

          <p className="font-body font-light text-[15px] text-white/90 leading-[1.8] max-w-[420px]">
            Scorviro is a multidisciplinary creative collective. We translate complex conceptual models into cinematic photography, digital architecture, and fluid codebases. Built on structure, precision, and raw digital minimalism.
          </p>
        </div>

        {/* Column 2: The Collective */}
        <div
          ref={centerColRef}
          className="lg:col-span-4 flex flex-col items-stretch opacity-0"
        >
          <span className="font-body text-[9px] tracking-[0.45em] text-white uppercase mb-10 text-left font-semibold">
            THE COLLECTIVE /
          </span>

          <div className="flex flex-col border-t border-white/20">
            {team.map((member) => (
              <div
                key={member.name}
                className="team-item group flex flex-col items-start py-7 border-b border-white/20 text-left transition-all duration-300 ease-out cursor-pointer opacity-0"
              >
                <div className="flex items-baseline w-full gap-4">
                  <span className="font-display italic text-[14px] text-white/50">
                    {member.index}
                  </span>
                  <span className="font-body text-[18px] text-white font-medium group-hover:text-white transition-colors duration-250">
                    {member.name}
                  </span>
                </div>
                <div className="pl-8 mt-2.5">
                  <span className="font-body text-[11px] text-white tracking-[0.1em] uppercase font-semibold">
                    {member.role}
                  </span>
                  <p className="font-body text-[13px] text-white/90 mt-2 leading-relaxed max-w-[280px]">
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Philosophy / Credo */}
        <div
          ref={rightColRef}
          className="lg:col-span-3 flex flex-col items-start text-left opacity-0"
        >
          <span className="font-body text-[9px] tracking-[0.45em] text-white uppercase mb-10 font-semibold">
            STUDIO CREDO /
          </span>

          <div className="flex flex-col gap-9">
            {credo.map((item) => (
              <div
                key={item.title}
                className="credo-item flex flex-col items-start opacity-0"
              >
                <div className="flex items-baseline gap-3.5 mb-2">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white font-semibold">
                    {item.num}
                  </span>
                  <h4 className="font-display text-[16px] text-white font-medium">
                    {item.title}
                  </h4>
                </div>
                <p className="font-body text-[13px] text-white/90 leading-[1.7] pl-5">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
