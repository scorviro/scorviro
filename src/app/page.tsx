'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Preloader from '@/components/ui/Preloader'
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import WorkSection from '@/components/sections/WorkSection'
import QuotationSection from '@/components/sections/QuotationSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/layout/Footer'

const backgroundVideoStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  objectFit: 'cover',
  zIndex: 0,
  pointerEvents: 'none',
  willChange: 'opacity',
}

const backgroundOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.38) 40%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.72) 100%)',
  zIndex: 1,
  pointerEvents: 'none',
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Effect 1: Handle video autoplay, visibility, and scroll playing strategies
  useEffect(() => {
    const initialVideo = videoRef.current
    if (initialVideo) {
      initialVideo.play().catch(() => {})
    }

    const keepPlaying = () => {
      const video = videoRef.current
      if (video && video.paused) {
        video.play().catch(() => {})
      }
    }

    const handleVisibility = () => {
      const video = videoRef.current
      if (video && !document.hidden) {
        video.play().catch(() => {})
      }
    }

    document.addEventListener('scroll', keepPlaying, { passive: true })
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      document.removeEventListener('scroll', keepPlaying)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  // Effect 2: GSAP reveal for page layout content
  useEffect(() => {
    if (!isLoaded) return

    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      )
    }
  }, [isLoaded])

  return (
    <main className="relative w-full min-h-[100dvh] bg-[#000000] overflow-x-hidden">
      {/* Cinematic preloader */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Fixed background elements (placed outside the animated scale container to preserve position: fixed context) */}
      <video
        ref={videoRef}
        src="/home_bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          ...backgroundVideoStyle,
          opacity: isLoaded ? 0.65 : 0,
          transition: 'opacity 1s ease',
        }}
      />

      {isLoaded && (
        <div style={backgroundOverlayStyle} />
      )}

      {/* Page Content once loaded */}
      {isLoaded && (
        <>
          {/* zIndex 100: Fixed Top Navigation Bar outside transformed container */}
          <Navbar visible={isLoaded} />

          <div ref={contentRef} className="w-full opacity-0 relative z-[2]">
            {/* Page sections wrapper */}
            <div className="relative w-full bg-transparent flex flex-col">
              <HeroSection />
              <AboutSection />
              <ServicesSection />
              <WorkSection />
              <QuotationSection />
              <ContactSection />
              <Footer />
            </div>
          </div>
        </>
      )}
    </main>
  )
}
