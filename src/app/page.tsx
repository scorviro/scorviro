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

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoaded) return

    const video = videoRef.current
    if (video) {
      // Force play on load and prevent browser autoplay block
      video.play().catch(() => {})
    }

    // Ensure it keeps playing forever and doesn't freeze on scroll/visibility change
    const keepPlaying = () => {
      if (video && video.paused) {
        video.play().catch(() => {})
      }
    }

    const handleVisibility = () => {
      if (!document.hidden && video) {
        video.play().catch(() => {})
      }
    }

    document.addEventListener('scroll', keepPlaying, { passive: true })
    document.addEventListener('visibilitychange', handleVisibility)

    // GSAP reveal for page layout content
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.99 },
        { opacity: 1, scale: 1, duration: 1.8, ease: 'power3.out' }
      )
    }

    return () => {
      document.removeEventListener('scroll', keepPlaying)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [isLoaded])

  return (
    <main className="relative w-full min-h-[100dvh] bg-[#000000] overflow-x-hidden">
      {/* Cinematic preloader */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Fixed background elements (placed outside the animated scale container to preserve position: fixed context) */}
      {isLoaded && (
        <>
          <video
            ref={videoRef}
            src="/home_bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              zIndex: 0,
              opacity: 0.65,
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.38) 40%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.72) 100%)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        </>
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
