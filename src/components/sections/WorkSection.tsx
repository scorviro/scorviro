'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from '@/components/ui/Icons'

interface Project {
  num: string
  title: string
  category: string
  aspect: string // height class
  span: string // Tailwind grid span class
  offset: string // Margin offset class
  parallaxClass: string // Custom parallax speed class
}

const projectsData: Project[] = [
  { num: '01', title: 'Brand Launch Reel', category: 'CINEMATOGRAPHY', aspect: 'h-[460px]', span: 'md:col-span-7', offset: '', parallaxClass: 'work-item-left' },
  { num: '02', title: 'Aurelia Watch Co.', category: 'COMMERCIAL FILM', aspect: 'h-[580px]', span: 'md:col-span-5', offset: 'md:mt-[80px]', parallaxClass: 'work-item-right' },
  { num: '03', title: 'Elysium Digital Platform', category: 'WEB DEV & SYSTEM', aspect: 'h-[400px]', span: 'md:col-span-12', offset: 'my-6', parallaxClass: 'work-item-wide' },
  { num: '04', title: 'Tactile Campaigns', category: 'BRAND STYLED LAB', aspect: 'h-[540px]', span: 'md:col-span-5', offset: '', parallaxClass: 'work-item-right' },
  { num: '05', title: 'Editorial Portfolios', category: 'PHOTOGRAPHY', aspect: 'h-[450px]', span: 'md:col-span-7', offset: 'md:-mt-[60px]', parallaxClass: 'work-item-left' },
  { num: '06', title: 'Aerial Drone Shoot', category: 'VIDEOGRAPHY', aspect: 'h-[420px]', span: 'md:col-span-12', offset: 'mt-6', parallaxClass: 'work-item-wide' }
]

export default function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const header = headerRef.current
    const grid = gridRef.current
    const container = containerRef.current
    const wrapper = wrapperRef.current

    if (header && grid && container && wrapper) {
      // 1. Entrance reveals (Triggered once)
      gsap.fromTo(header,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      const cards = grid.querySelectorAll('.work-item-frame')
      gsap.fromTo(cards,
        { opacity: 0, y: 80, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // 2. Continuous Asymmetrical Scroll Parallax/Motion Scrub
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

      // Select left-aligned cards for slower scroll
      const leftCards = grid.querySelectorAll('.work-item-left')
      gsap.to(leftCards, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      })

      // Select right-aligned cards for faster scroll
      const rightCards = grid.querySelectorAll('.work-item-right')
      gsap.to(rightCards, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      })

      // Select wide cards for intermediate scroll
      const wideCards = grid.querySelectorAll('.work-item-wide')
      gsap.to(wideCards, {
        y: -85,
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
      id="work"
      className="relative min-h-screen py-[150px] px-6 md:px-[80px] bg-transparent overflow-hidden select-none"
    >
      <div className="work-bg absolute inset-0 bg-transparent pointer-events-none z-0" />

      {/* Asymmetrical Off-Grid Layout Collage wrapped for exit scroll scrub */}
      <div
        ref={wrapperRef}
        className="relative z-10 max-w-[1280px] mx-auto w-full flex flex-col"
      >
        {/* Header Block */}
        <div
          ref={headerRef}
          className="flex flex-col items-start text-left mb-16 opacity-0"
        >
          <span className="font-body text-[9px] tracking-[0.45em] text-white uppercase mb-6 font-semibold">
            PORTFOLIO /
          </span>
          <h2
            className="font-display text-white font-light leading-[1.08] tracking-tight"
            style={{
              fontSize: 'clamp(36px, 5.2vw, 68px)',
            }}
          >
            Cinematic Artifacts.
          </h2>
        </div>

        {/* Asymmetrical Off-Grid Layout Collage */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-12 gap-8 md:gap-x-12 w-full items-start"
        >
          {projectsData.map((project) => (
            <div
              key={project.title}
              className={`work-item-frame ${project.parallaxClass} group relative flex flex-col justify-end overflow-hidden border border-white/20 rounded-[4px] bg-[#0c0c12]/95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-550 ease-out hover:border-white/45 cursor-pointer opacity-0 ${project.aspect} ${project.span} ${project.offset}`}
            >
              {/* Inner ambient placeholder icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-[0.06] group-hover:scale-105 group-hover:opacity-[0.12] transition-all duration-600">
                <span className="font-display text-[72px] text-white font-light uppercase">
                  {project.num}
                </span>
              </div>

              {/* Top Details (Num & Cat) */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-baseline z-10">
                <span className="font-display italic text-[14px] text-white font-semibold">
                  {project.num}
                </span>
                <span className="font-body text-[9px] tracking-[0.25em] text-white uppercase font-bold">
                  {project.category}
                </span>
              </div>

              {/* Bottom Details Overlay */}
              <div className="p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent w-full flex flex-col items-start text-left z-10">
                <h3 className="font-display text-[20px] md:text-[24px] text-white font-semibold group-hover:translate-x-1.5 transition-all duration-300">
                  {project.title}
                </h3>
                <span className="font-body text-[9px] tracking-[0.3em] text-white uppercase mt-3.5 flex items-center gap-1.5 font-semibold">
                  <span>EXPLORE CASE</span>
                  <ArrowRight size={10} className="text-white group-hover:translate-x-1 transition-all duration-300" />
                </span>
              </div>

              {/* Subtle hover background shift */}
              <div className="absolute inset-0 bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-0 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
