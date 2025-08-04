'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { ThemeConfig } from '@/types/theme'

interface HeroSectionProps {
  currentTheme: ThemeConfig
}

export default function HeroSection({ currentTheme }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 max-w-4xl mx-auto"
      >
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className={`block bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}>
            Welcome to JB Girls College
          </span>
          <span className="block mt-4 text-2xl sm:text-3xl lg:text-4xl opacity-90">
            Fee Management Portal
          </span>
        </h1>
        <p className="text-lg sm:text-xl opacity-75 max-w-2xl mx-auto leading-relaxed">
          Experience seamless educational payments with our cutting-edge portal.
          Secure, fast, and designed for the modern education system.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <motion.a
            href="/dashboard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full ${currentTheme.button} text-white shadow-lg flex items-center gap-2 text-lg`}
          >
            Get Started
            <ChevronRight className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="/students"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full backdrop-blur-lg bg-white/10 hover:bg-white/20 transition-colors duration-300 flex items-center gap-2 text-lg"
          >
            Learn More
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}