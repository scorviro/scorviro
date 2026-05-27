'use client'

import React from 'react'
import { LenisProvider } from '@/hooks/useLenis'

interface AppProviderProps {
  children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <LenisProvider>
      {/* Main page content */}
      {children}
    </LenisProvider>
  )
}
