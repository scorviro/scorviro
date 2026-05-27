'use client'

import React, { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface LenisContextType {
  scrollTo: (target: string | number | HTMLElement, options?: object) => void
}

const LenisContext = createContext<LenisContextType>({
  scrollTo: () => {}
})

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger)

    // Initialize Lenis with exact user parameters
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      wheelMultiplier: 0.72,
      touchMultiplier: 1.0,
      syncTouch: false,
      infinite: false,
    })

    lenisRef.current = lenis

    // Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Lenis RAF loop integrated with GSAP ticker
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafCallback)

    // Disable default lag smoothing
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
      gsap.ticker.remove(rafCallback)
    }
  }, [])

  const scrollTo = (target: string | number | HTMLElement, options?: object) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options)
    }
  }

  return (
    <LenisContext.Provider value={{ scrollTo }}>
      {children}
    </LenisContext.Provider>
  )
}

export function useLenis() {
  return useContext(LenisContext)
}
