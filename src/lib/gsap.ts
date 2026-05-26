'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)

  // Global GSAP defaults for cinematic feel
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  })

  // ScrollTrigger global config
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    ignoreMobileResize: true,
  })
}

export { gsap, ScrollTrigger }
export const EASE_CINEMATIC = 'power4.out'
export const EASE_BOUNCE    = 'elastic.out(1, 0.3)'
export const EASE_SMOOTH    = 'power2.inOut'
export const EASE_SHARP     = 'expo.out'

export const DURATION_FAST    = 0.4
export const DURATION_MEDIUM  = 0.8
export const DURATION_SLOW    = 1.2
export const DURATION_CINEMATIC = 1.8
