'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Service {
  number: string
  title: string
  desc: string
  subServices: string[]
}

const servicesData: Service[] = [
  {
    number: '01',
    title: 'Videography & Direction',
    desc: 'Cinematic storytelling, drone cinematography, and high-fidelity camera direction for digital campaigns.',
    subServices: ['Drone Cinematography', 'Social Reels & Shorts', 'Commercial Advertising']
  },
  {
    number: '02',
    title: 'Digital Architecture & Dev',
    desc: 'Tailored web platforms built with optimized loading, custom layouts, and fluid motion systems.',
    subServices: ['Bespoke Web Applications', 'Visual Re-engineering', 'Ongoing Optimization']
  },
  {
    number: '03',
    title: 'Conceptual Brand Design',
    desc: 'Graphic systems, event collateral, and visual identities crafted to define digital presence.',
    subServices: ['Festival & Campaign Collateral', 'Social Media Identity', 'Brand Graphics']
  },
  {
    number: '04',
    title: 'High-Contrast Photography',
    desc: 'Editorial event coverage, studio product shoots, and portraits captured with intentional light planning.',
    subServices: ['Event & Studio Shoots', 'Product Styling', 'Art Portraits']
  }
]

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [activeRow, setActiveRow] = useState<number | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = headerRef.current
    const list = listRef.current
    const container = containerRef.current
    const wrapper = wrapperRef.current

    if (header && list && container && wrapper) {
      // 1. Entrance reveals (Triggered once)
      gsap.fromTo(header,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      const rows = list.querySelectorAll('.service-row')
      gsap.fromTo(rows,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // 2. Continuous Scroll Parallax/Motion Scrub
      gsap.to(header, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      })

      gsap.to(list, {
        y: -100,
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
      id="services"
      className="relative min-h-screen py-[150px] px-6 md:px-[80px] bg-transparent overflow-hidden"
    >
      <div className="services-bg absolute inset-0 bg-transparent pointer-events-none z-0" />

      {/* Asymmetrical Layout wrapped for exit scroll scrub */}
      <div
        ref={wrapperRef}
        className="relative z-10 max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-y-[64px] lg:gap-x-[64px] items-start"
      >
        
        {/* Left Column: Heading and Intro */}
        <div
          ref={headerRef}
          className="lg:col-span-4 flex flex-col items-start text-left opacity-0"
        >
          <span className="font-body text-[9px] tracking-[0.45em] text-white uppercase mb-6 font-semibold">
            CAPABILITIES /
          </span>
          <h2
            className="font-display text-white font-light leading-[1.08] tracking-tight mb-8"
            style={{
              fontSize: 'clamp(36px, 5.2vw, 68px)',
            }}
          >
            Digital &amp; <br />
            Cinematic <br />
            Systems.
          </h2>
          <p className="font-body font-normal text-[15px] text-white leading-[1.8] max-w-[340px]">
            We deploy highly integrated strategies, merging moving frames, performance coding, and print graphic systems.
          </p>
        </div>

        {/* Right Column: Premium Table Accordion List */}
        <div
          ref={listRef}
          className="lg:col-span-8 flex flex-col w-full border-t border-white/20"
        >
          {servicesData.map((service, index) => {
            const isOpen = activeRow === index
            return (
              <div
                key={service.number}
                className="service-row group flex flex-col py-8 border-b border-white/20 transition-all duration-400 ease cursor-pointer opacity-0"
                onClick={() => setActiveRow(isOpen ? null : index)}
                onMouseEnter={() => setActiveRow(index)}
                onMouseLeave={() => setActiveRow(null)}
              >
                {/* Row Header */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-6 md:gap-[40px]">
                    <span className="font-display italic text-[14px] text-white font-semibold">
                      {service.number}
                    </span>
                    <h3 className="font-display text-[22px] md:text-[30px] text-white font-medium group-hover:translate-x-2 transition-all duration-300">
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Plus/Minus Indicator */}
                  <div className="w-[18px] h-[18px] relative flex items-center justify-center">
                    <span className="absolute w-[14px] h-[1px] bg-white group-hover:bg-white transition-colors" />
                    <span
                      className="absolute w-[1px] h-[14px] bg-white group-hover:bg-white transition-all duration-300"
                      style={{
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                        opacity: isOpen ? 0 : 1,
                      }}
                    />
                  </div>
                </div>

                {/* Expanded Drawer Content */}
                <div
                  className="overflow-hidden transition-all duration-455 ease-in-out pl-[54px] md:pl-[64px]"
                  style={{
                    maxHeight: isOpen ? '240px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    marginTop: isOpen ? '24px' : '0px'
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-6 items-start text-left">
                    <p className="font-body text-[14px] text-white/90 leading-[1.7] max-w-[340px]">
                      {service.desc}
                    </p>
                    <ul className="list-none p-0 m-0 flex flex-col gap-2">
                      {service.subServices.map((sub) => (
                        <li
                          key={sub}
                          className="font-body text-[12px] text-white tracking-wider flex items-center"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white mr-3" />
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
