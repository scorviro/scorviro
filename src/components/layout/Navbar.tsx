'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollTo } from '@/hooks/useLenis'

interface NavbarProps {
  visible: boolean
}

export default function Navbar({ visible }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleIntersection = () => {
      const sections = ['home', 'about', 'services', 'work', 'quotation', 'contact']
      const scrollPos = window.scrollY + 120
      
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleIntersection, { passive: true })
    handleIntersection()
    return () => window.removeEventListener('scroll', handleIntersection)
  }, [])

  const navLinks = [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT', id: 'about' },
    { label: 'SERVICES', id: 'services' },
    { label: 'WORK', id: 'work' },
    { label: 'QUOTATION', id: 'quotation' },
    { label: 'CONTACT', id: 'contact' },
  ]

  const handleNav = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    scrollTo(el, {
      offset: -80,
      duration: 1.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 4)
    })
    setMobileMenuOpen(false)
  }

  if (!visible) return null

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] h-[72px] flex items-center justify-between transition-all duration-400 ease px-6 md:px-12"
        style={{
          background: scrolled ? 'rgba(0, 0, 0, 0.75)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid transparent',
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          {/* Logo Badge with White Background */}
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105 shadow-md shadow-white/10">
            <img
              src="/favicon.png"
              alt="Scorviro Logo"
              className="w-5.5 h-5.5 object-contain"
            />
          </div>
          <span
            className="font-display text-white text-[17px] font-normal tracking-[0.32em] uppercase transition-colors duration-300 group-hover:text-white/80"
          >
            SCORVIRO
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-[40px]" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="relative font-body text-[11px] tracking-[0.18em] uppercase transition-colors duration-250 ease cursor-pointer select-none bg-transparent border-none outline-none py-1"
                style={{
                  color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== link.id) e.currentTarget.style.color = '#FFFFFF'
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== link.id) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)'
                }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#FFFFFF]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        {/* Mobile Hamburger Menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-6 h-6 gap-1.5 focus:outline-none z-50 cursor-pointer bg-transparent border-none"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span
            className="w-5 h-[1.5px] bg-white transition-transform duration-300"
            style={{
              transform: mobileMenuOpen ? 'rotate(45deg) translateY(5px)' : 'none'
            }}
          />
          <span
            className="w-5 h-[1.5px] bg-white transition-transform duration-300"
            style={{
              transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-5px)' : 'none'
            }}
          />
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[99] bg-black/95 backdrop-blur-md flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-8" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    className="font-body text-[15px] tracking-[0.2em] uppercase transition-colors duration-300 bg-transparent border-none outline-none"
                    style={{
                      color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {link.label}
                  </button>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
