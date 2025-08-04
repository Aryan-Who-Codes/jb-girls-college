'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin } from 'lucide-react'
import { ThemeConfig } from '@/types/theme'

interface FooterProps {
  currentTheme: ThemeConfig
}

export default function Footer({ currentTheme }: FooterProps) {
  const socialLinks = [
    { name: 'GitHub', icon: <Github className="w-6 h-6" /> },
    { name: 'Twitter', icon: <Twitter className="w-6 h-6" /> },
    { name: 'LinkedIn', icon: <Linkedin className="w-6 h-6" /> }
  ]

  return (
    <footer className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <div className={`text-2xl font-bold bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}>
            JB Girls College
          </div>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="opacity-75 hover:opacity-100 transition-opacity duration-300"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          <div className="opacity-75">
            © {new Date().getFullYear()} JB Girls College. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  )
}