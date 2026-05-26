'use client'

import React from 'react'
import { useLenis } from '@/hooks/useLenis'

interface AppProviderProps {
  children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  // Initialize buttery smooth scrolling
  useLenis()

  return (
    <>
      {/* Main page content */}
      {children}
    </>
  )
}
