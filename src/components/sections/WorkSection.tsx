'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from '@/components/ui/Icons'
import { AnimatePresence, motion } from 'framer-motion'
import { X, RotateCw, ExternalLink, Laptop } from 'lucide-react'

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
  { num: '01', title: 'Web Development', category: '3D ANIMATION', aspect: 'h-[460px]', span: 'md:col-span-7', offset: '', parallaxClass: 'work-item-left' },
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
  
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  
  const [demoExists, setDemoExists] = useState<boolean | null>(null)
  const [checkingDemo, setCheckingDemo] = useState(false)

  const checkDemoStatus = async () => {
    setCheckingDemo(true)
    try {
      const res = await fetch('/demo/index.html', { method: 'HEAD' })
      if (res.ok) {
        setDemoExists(true)
      } else {
        const resRoot = await fetch('/demo/', { method: 'HEAD' })
        setDemoExists(resRoot.ok)
      }
    } catch {
      setDemoExists(false)
    } finally {
      setCheckingDemo(false)
    }
  }

  useEffect(() => {
    if (showDemoModal) {
      checkDemoStatus()
    }
  }, [showDemoModal])

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
              onClick={() => {
                if (project.num === '01') {
                  setShowDemoModal(true)
                }
              }}
              className={`work-item-frame ${project.parallaxClass} group relative flex flex-col justify-end overflow-hidden border border-white/20 rounded-[4px] bg-[#0c0c12]/95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-550 ease-out hover:border-white/45 cursor-pointer opacity-0 ${project.aspect} ${project.span} ${project.offset}`}
            >
              {/* Inner ambient placeholder icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-[0.06] group-hover:scale-105 group-hover:opacity-[0.12] transition-all duration-600">
                <span className="font-display text-[72px] text-white font-light uppercase">
                  {project.num}
                </span>
              </div>

              {/* Click instruction flag for Project 01 */}
              {project.num === '01' && (
                <span className="absolute top-18 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-3 py-1 text-[9px] tracking-widest rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 font-semibold text-white">
                  CLICK TO VIEW
                </span>
              )}

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

      {/* Pop-up Demo Modal Section with Card Blur Effect */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative w-full max-w-5xl h-[80vh] md:h-[85vh] bg-[#0c0c12]/80 backdrop-blur-2xl border border-white/10 rounded-xl flex flex-col overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Title and close button - kept clean and simple */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                <h3 className="font-display text-[14px] md:text-[16px] text-white font-medium flex items-center gap-2 tracking-wide">
                  <span>Web Development Presentation</span>
                </h3>

                <button
                  onClick={() => setShowDemoModal(false)}
                  className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-md transition-colors cursor-pointer"
                  title="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Main Content Pane */}
              <div className="flex-1 w-full h-full relative bg-[#06060a] overflow-hidden flex flex-col justify-center items-center">
                {checkingDemo && demoExists === null ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span className="text-xs text-white/60 tracking-wider font-mono">Checking connection...</span>
                  </div>
                ) : demoExists ? (
                  /* Active iframe that loads user's custom project */
                  <div className="w-full h-full relative flex flex-col">
                    <iframe
                      key={iframeKey}
                      ref={iframeRef}
                      src="/demo/index.html"
                      className="w-full h-full border-0 z-10 relative bg-transparent"
                      title="Web Development Work Preview"
                    />
                    
                    {/* Clean Minimal Floating Actions for the presentation iframe */}
                    <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                      <button
                        onClick={() => setIframeKey(prev => prev + 1)}
                        className="bg-black/60 hover:bg-black/80 border border-white/10 text-white/70 hover:text-white p-2.5 rounded-lg backdrop-blur-md transition-all shadow-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                        title="Reload Frame"
                      >
                        <RotateCw size={14} />
                        <span>Reload</span>
                      </button>
                      <a
                        href="/demo/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/60 hover:bg-black/80 border border-white/10 text-white/70 hover:text-white p-2.5 rounded-lg backdrop-blur-md transition-all shadow-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                        title="Open in new tab"
                      >
                        <ExternalLink size={14} />
                        <span>Open fullscreen</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Elegant static presentation card for fallback */
                  <div className="flex flex-col items-center justify-center p-8 w-full h-full select-none">
                    <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl p-8 py-12 flex flex-col items-center shadow-2xl">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                        <Laptop className="text-white/45 animate-pulse" size={20} />
                      </div>
                      
                      <h4 className="font-display text-[20px] font-medium text-white tracking-[0.1em] uppercase mb-3">
                        not uploaded right now
                      </h4>
                      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
                      
                      <p className="text-[11px] text-white/50 leading-relaxed text-center max-w-[240px]">
                        The interactive demo of this project is currently not active. Please check back later.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
