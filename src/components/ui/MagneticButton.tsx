'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  href?: string
  'data-cursor-text'?: string
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
  href,
  'data-cursor-text': cursorText,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      x.set(deltaX)
      y.set(deltaY)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    button.addEventListener('mousemove', handleMouseMove as EventListener)
    button.addEventListener('mouseleave', handleMouseLeave as EventListener)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove as EventListener)
      button.removeEventListener('mouseleave', handleMouseLeave as EventListener)
    }
  }, [strength, x, y])

  if (href) {
    return (
      <motion.a
        ref={buttonRef as any}
        href={href}
        onClick={onClick}
        data-cursor-text={cursorText}
        className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
        style={{ x: springX, y: springY, willChange: 'transform' }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={buttonRef as any}
      onClick={onClick}
      data-cursor-text={cursorText}
      className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
      style={{ x: springX, y: springY, willChange: 'transform' }}
      whileTap={{ scale: 0.95 }}
      type="button"
    >
      {children}
    </motion.button>
  )
}
