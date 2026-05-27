'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin, ArrowRight } from '@/components/ui/Icons'

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    const handleQuoteEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ service: string; summary: string }>
      if (customEvent.detail) {
        setSelectedService(customEvent.detail.service)
        setMessageText(customEvent.detail.summary)
      }
    }

    window.addEventListener('scorviro:select-quote', handleQuoteEvent)
    return () => {
      window.removeEventListener('scorviro:select-quote', handleQuoteEvent)
    }
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const leftCol = leftColRef.current
    const rightCol = rightColRef.current
    const container = containerRef.current
    const wrapper = wrapperRef.current

    if (leftCol && rightCol && container && wrapper) {
      // 1. Entrance reveals (Triggered once for items inside)
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

      const fields = rightCol.querySelectorAll('.form-field')
      gsap.fromTo(fields,
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

      // 2. Parallax Motion Scrub
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

      gsap.to(rightCol, {
        y: -60,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')?.toString().trim() || ''
    const email = formData.get('email')?.toString().trim() || ''
    const service = formData.get('service')?.toString().trim() || ''
    const message = formData.get('message')?.toString().trim() || ''

    // 1. Presence check
    if (!name || !email || !service || !message) {
      setStatus('error')
      setErrorMessage("All fields are required.")
      return
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('error')
      setErrorMessage("Please enter a valid email address.")
      return
    }

    // 3. Length limits
    if (name.length < 2 || name.length > 100) {
      setStatus('error')
      setErrorMessage("Name must be between 2 and 100 characters.")
      return
    }

    if (message.length < 10 || message.length > 5000) {
      setStatus('error')
      setErrorMessage("Message must be between 10 and 5000 characters.")
      return
    }

    // 4. Capability domain validation
    const validServices = ['videography', 'webdev', 'design', 'photography']
    if (!validServices.includes(service)) {
      setStatus('error')
      setErrorMessage("Please select a valid capability.")
      return
    }

    try {
      // Mock API latency
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      e.currentTarget.reset()
      setSelectedService('')
      setMessageText('')
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage("An unexpected error occurred. Please try again.")
    }
  }

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative min-h-screen py-[100px] md:py-[150px] px-6 md:px-[80px] bg-transparent overflow-hidden"
    >
      <div className="contact-bg absolute inset-0 bg-transparent pointer-events-none z-0" />

      {/* Asymmetrical 2-Column Grid wrapped for exit scroll scrub */}
      <div
        ref={wrapperRef}
        className="relative z-10 max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-y-[64px] lg:gap-x-[80px] items-start"
      >
        
        {/* Left Column: Heading and Info Block */}
        <div
          ref={leftColRef}
          className="lg:col-span-5 flex flex-col items-start text-left opacity-0"
        >
          <span className="font-body text-[9px] tracking-[0.45em] text-white uppercase mb-6 font-semibold">
            INQUIRIES /
          </span>

          <h2
            className="font-display text-white font-light leading-[1.08] tracking-tight mb-8"
            style={{
              fontSize: 'clamp(36px, 5.2vw, 68px)',
            }}
          >
            Let&apos;s Build <br />
            Something <br />
            Extraordinary.
          </h2>

          <p className="font-body font-light text-[15px] text-white/90 leading-[1.8] max-w-[380px] mb-10">
            Whether you have a fully formed creative brief or simply an initial concept, we are ready to collaborate and architect your narrative.
          </p>

          {/* Clean Contact Details List */}
          <div className="flex flex-col gap-6 text-[14px] font-body text-white">
            <div className="flex flex-col items-start">
              <span className="text-[9px] tracking-[0.25em] text-white uppercase mb-1.5 font-semibold">EMAIL /</span>
              <a href="mailto:scorviro@gmail.com" className="group/detail flex items-center gap-2 hover:text-white transition-colors duration-250 font-medium">
                <Mail size={14} className="text-white group-hover/detail:scale-105 transition-all duration-250" />
                <span>scorviro@gmail.com</span>
              </a>
            </div>

            <div className="flex flex-col items-start">
              <span className="text-[9px] tracking-[0.25em] text-white uppercase mb-1.5 font-semibold">PHONE /</span>
              <a href="tel:+918511102774" className="group/detail flex items-center gap-2 hover:text-white transition-colors duration-250 font-medium">
                <Phone size={14} className="text-white group-hover/detail:scale-105 transition-all duration-250" />
                <span>+91 85111 02774</span>
              </a>
            </div>

            <div className="flex flex-col items-start">
              <span className="text-[9px] tracking-[0.25em] text-white uppercase mb-1.5 font-semibold">STUDIO /</span>
              <div className="flex items-center gap-2 font-medium text-white/90">
                <MapPin size={14} className="text-white" />
                <span>Gujarat, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Custom Rounded Boundary Outline Form */}
        <div
          ref={rightColRef}
          className="lg:col-span-7 w-full opacity-0"
        >
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-8 text-left"
          >
            {/* Field 1: Name */}
            <div className="form-field flex flex-col gap-2.5 opacity-0">
              <label className="font-body text-[10px] tracking-[0.3em] text-white uppercase pl-1 font-semibold">
                01 / WHAT IS YOUR NAME?
              </label>
              <input
                type="text"
                name="name"
                placeholder="Full name"
                required
                className="bg-[#0c0c12]/95 border border-white/20 rounded-[10px] text-white font-body text-[15px] px-5 py-4 w-full outline-none transition-all duration-300 focus:border-white focus:bg-[#12121b]/95 focus:shadow-[0_0_15px_rgba(255,255,255,0.06)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] placeholder:text-white/35 font-medium"
              />
            </div>

            {/* Field 2: Email */}
            <div className="form-field flex flex-col gap-2.5 opacity-0">
              <label className="font-body text-[10px] tracking-[0.3em] text-white uppercase pl-1 font-semibold">
                02 / WHERE CAN WE REACH YOU?
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="bg-[#0c0c12]/95 border border-white/20 rounded-[10px] text-white font-body text-[15px] px-5 py-4 w-full outline-none transition-all duration-300 focus:border-white focus:bg-[#12121b]/95 focus:shadow-[0_0_15px_rgba(255,255,255,0.06)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] placeholder:text-white/35 font-medium"
              />
            </div>

            {/* Field 3: Service Dropdown */}
            <div className="form-field flex flex-col gap-2.5 relative opacity-0">
              <label className="font-body text-[10px] tracking-[0.3em] text-white uppercase pl-1 font-semibold">
                03 / SELECT A CAPABILITY
              </label>
              <div className="relative w-full">
                <select
                  name="service"
                  required
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="bg-[#0c0c12]/95 border border-white/20 rounded-[10px] text-white font-body text-[15px] px-5 py-4 w-full outline-none transition-all duration-300 focus:border-white focus:bg-[#12121b]/95 focus:shadow-[0_0_15px_rgba(255,255,255,0.06)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] appearance-none pr-10 cursor-pointer font-medium"
                >
                  <option value="" disabled className="bg-[#0d0d14] text-white/30">Choose service</option>
                  <option value="videography" className="bg-[#0d0d14] text-white">Videography</option>
                  <option value="webdev" className="bg-[#0d0d14] text-white">Web Development</option>
                  <option value="design" className="bg-[#0d0d14] text-white">Graphic Design</option>
                  <option value="photography" className="bg-[#0d0d14] text-white">Photography</option>
                </select>
                {/* Custom Arrow */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Field 4: Message */}
            <div className="form-field flex flex-col gap-2.5 opacity-0">
              <label className="font-body text-[10px] tracking-[0.3em] text-white uppercase pl-1 font-semibold">
                04 / DETAIL YOUR MISSION
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us about the project objectives..."
                required
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="bg-[#0c0c12]/95 border border-white/20 rounded-[10px] text-white font-body text-[15px] px-5 py-4 w-full outline-none transition-all duration-300 focus:border-white focus:bg-[#12121b]/95 focus:shadow-[0_0_15px_rgba(255,255,255,0.06)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] placeholder:text-white/35 font-medium resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="group mt-4 py-4.5 px-[52px] bg-transparent border border-white/30 hover:border-white text-white font-body text-[11px] tracking-[0.3em] rounded-[10px] cursor-pointer uppercase transition-all duration-350 ease-out hover:bg-white hover:text-black w-full sm:w-max text-center flex items-center justify-center gap-2 font-bold shadow-[0_4px_15px_rgba(255,255,255,0.08)] disabled:opacity-55 disabled:cursor-not-allowed"
            >
              <span>{status === 'submitting' ? 'SENDING...' : 'SEND INQUIRY'}</span>
              <ArrowRight size={12} className="text-white group-hover:text-black group-hover:translate-x-1.5 transition-all duration-350" />
            </button>

            {status === 'success' && (
              <div className="font-body text-[13px] text-green-400 mt-2 tracking-[0.05em]">
                Your message has been sent successfully. We will be in touch shortly.
              </div>
            )}

            {status === 'error' && (
              <div className="font-body text-[13px] text-red-400 mt-2 tracking-[0.05em]">
                {errorMessage}
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
  )
}
