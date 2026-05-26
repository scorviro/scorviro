'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenisInstance: Lenis | null = null

export function useLenis() {
  useEffect(() => {
    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger)

    // Initialize Lenis with exact user parameters (casted to any to prevent Type check errors on smoothTouch)
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      wheelMultiplier: 0.72,
      touchMultiplier: 1.0,
      smoothTouch: false,
      infinite: false,
    } as any)

    lenisInstance = lenis

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
      lenisInstance = null
      gsap.ticker.remove(rafCallback)
    }
  }, [])

  return lenisInstance
}

// Export for programmatic scroll control
export function scrollTo(target: string | number | HTMLElement, options?: object) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options)
  }
}
