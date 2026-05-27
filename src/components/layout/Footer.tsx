'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollTo } from '@/hooks/useLenis'
import { Instagram, YouTube, LinkedIn, Mail } from '@/components/ui/Icons'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const columnsRef = useRef<HTMLDivElement>(null)
  const tickerText = "CAPTURING MOMENTS · CRAFTING STORIES · CREATING IMPACT · SCORVIRO VIDEOGRAPHY · "

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const columns = columnsRef.current
    if (columns) {
      const cols = columns.querySelectorAll('.footer-col')
      gsap.fromTo(cols,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: columns,
            start: 'top 92%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, [])

  const handleNav = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    scrollTo(el, {
      offset: -80,
      duration: 1.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 4)
    })
  }

  return (
    <footer
      ref={footerRef}
      className="relative z-10 bg-[#020202] border-t border-white/10 w-full select-none"
    >
      {/* Self-contained CSS keyframes for infinite marquee */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-track {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee 26s linear infinite;
        }
      `}</style>

      {/* Infinite Text Ticker in Luxury White */}
      <div className="py-[20px] border-b border-white/5 overflow-hidden w-full flex">
        <div className="marquee-track">
          <span className="font-body text-[11px] tracking-[0.45em] text-white/20 uppercase pr-4 font-light">
            {tickerText}{tickerText}{tickerText}{tickerText}
          </span>
          <span className="font-body text-[11px] tracking-[0.45em] text-white/20 uppercase pr-4 font-light">
            {tickerText}{tickerText}{tickerText}{tickerText}
          </span>
        </div>
      </div>

      {/* Premium Columns Layout */}
      <div
        ref={columnsRef}
        className="max-w-[1280px] mx-auto py-[80px] px-6 md:px-[80px] grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-[48px] text-left"
      >
        {/* Column 1: Brand Info */}
        <div className="footer-col col-span-2 md:col-span-1 flex flex-col items-start gap-4 opacity-0">
          <div className="flex items-center gap-3">
            {/* Logo Badge with White Background */}
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center overflow-hidden shadow-md shadow-white/10">
              <img
                src="/favicon.png"
                alt="Scorviro Logo"
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="font-display text-[22px] text-white tracking-[0.25em] uppercase">
              SCORVIRO
            </span>
          </div>
          <p className="font-body text-[13px] text-white/45 leading-[1.8] max-w-[220px]">
            Bespoke digital design, high-fidelity engineering, and cinematic narratives.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-col flex flex-col items-start gap-3.5 opacity-0">
          <span className="font-body text-[9px] tracking-[0.3em] text-white/45 uppercase mb-1">
            INDEX
          </span>
          <button onClick={() => handleNav('home')} className="font-body text-[13px] text-white/60 hover:text-white transition-colors duration-250 cursor-pointer bg-transparent border-none p-0 outline-none">
            Home
          </button>
          <button onClick={() => handleNav('about')} className="font-body text-[13px] text-white/60 hover:text-white transition-colors duration-250 cursor-pointer bg-transparent border-none p-0 outline-none">
            About
          </button>
          <button onClick={() => handleNav('services')} className="font-body text-[13px] text-white/60 hover:text-white transition-colors duration-250 cursor-pointer bg-transparent border-none p-0 outline-none">
            Services
          </button>
          <button onClick={() => handleNav('work')} className="font-body text-[13px] text-white/60 hover:text-white transition-colors duration-250 cursor-pointer bg-transparent border-none p-0 outline-none">
            Work
          </button>
          <button onClick={() => handleNav('quotation')} className="font-body text-[13px] text-white/60 hover:text-white transition-colors duration-250 cursor-pointer bg-transparent border-none p-0 outline-none">
            Quotation
          </button>
          <button onClick={() => handleNav('contact')} className="font-body text-[13px] text-white/60 hover:text-white transition-colors duration-250 cursor-pointer bg-transparent border-none p-0 outline-none">
            Contact
          </button>
        </div>

        {/* Column 3: Capabilities */}
        <div className="footer-col flex flex-col items-start gap-3.5 opacity-0">
          <span className="font-body text-[9px] tracking-[0.3em] text-white/45 uppercase mb-1">
            CAPABILITIES
          </span>
          <span className="font-body text-[13px] text-white/40">Videography</span>
          <span className="font-body text-[13px] text-white/40">Web Development</span>
          <span className="font-body text-[13px] text-white/40">Graphic Design</span>
          <span className="font-body text-[13px] text-white/40">Photography</span>
        </div>

        {/* Column 4: Connect */}
        <div className="footer-col flex flex-col items-start gap-3.5 opacity-0">
          <span className="font-body text-[9px] tracking-[0.3em] text-white/45 uppercase mb-1">
            CONNECT
          </span>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-2.5 font-body text-[13px] text-white/60 hover:text-white transition-colors duration-250">
            <Instagram size={14} className="text-white/40 group-hover/link:text-white group-hover/link:scale-105 transition-all duration-250" />
            <span>Instagram</span>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-2.5 font-body text-[13px] text-white/60 hover:text-white transition-colors duration-250">
            <YouTube size={14} className="text-white/40 group-hover/link:text-white group-hover/link:scale-105 transition-all duration-250" />
            <span>YouTube</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-2.5 font-body text-[13px] text-white/60 hover:text-white transition-colors duration-250">
            <LinkedIn size={14} className="text-white/40 group-hover/link:text-white group-hover/link:scale-105 transition-all duration-250" />
            <span>LinkedIn</span>
          </a>
          <a href="mailto:scorviro@gmail.com" className="group/link flex items-center gap-2.5 font-body text-[13px] text-white/60 hover:text-white transition-colors duration-250">
            <Mail size={14} className="text-white/40 group-hover/link:text-white group-hover/link:scale-105 transition-all duration-250" />
            <span>Email</span>
          </a>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-white/5 py-8 px-6 md:px-[80px] flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-body text-[11px] text-white/30 tracking-[0.05em]">
          &copy; 2026 Scorviro Videography. All rights reserved.
        </span>
        <span className="font-body text-[11px] text-white/30 tracking-[0.05em]">
          Designed with intentional depth.
        </span>
      </div>
    </footer>
  )
}
