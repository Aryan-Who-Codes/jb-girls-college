// File: /app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useAuth } from '@/lib/auth/AuthContext'
import Navbar from './component/layout/Navbar'
import HeroSection from './component/home/HeroSection'
import FeaturesGrid from './component/home/FeaturesGrid'
import StatsSection from './component/home/StatsSection'
import Footer from './component/layout/Footer'

export default function Home() {
  const { logout } = useAuth()
  const { theme, currentTheme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`min-h-screen ${currentTheme.background} ${currentTheme.text} transition-all duration-500`}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient} opacity-90`} />
      </div>

      <Navbar
        isScrolled={isScrolled}
        theme={theme}
        currentTheme={currentTheme}
        toggleTheme={toggleTheme}
        logout={logout}
      />

      <HeroSection currentTheme={currentTheme} />
      <FeaturesGrid currentTheme={currentTheme} />
      <StatsSection currentTheme={currentTheme} />
      <Footer currentTheme={currentTheme} />
    </div>
  )
}