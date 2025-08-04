/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Theme, ThemeConfig } from '@/types/theme'

interface NavbarProps {
  isScrolled: boolean
  theme: Theme
  currentTheme: ThemeConfig
  toggleTheme: () => void
  logout: () => void
}

export default function Navbar({ isScrolled, theme, currentTheme, toggleTheme, logout }: NavbarProps) {
  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.1)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none'
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}
          >
            JB Girls College
          </motion.div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 sm:p-3 rounded-full backdrop-blur-lg bg-white/10 hover:bg-white/20 transition-colors duration-300"
            >
              <span className="text-xl sm:text-2xl">{currentTheme.emoji}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className={`px-4 sm:px-6 py-2 rounded-full ${currentTheme.button} text-white shadow-lg transition-colors duration-300 flex items-center gap-2`}
            >
              <span>Logout</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}