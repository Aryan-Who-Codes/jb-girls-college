'use client'

import { motion } from 'framer-motion'
import { features } from '@/lib/constants/landing'
import { ThemeConfig } from '@/types/theme'

interface FeaturesGridProps {
  currentTheme: ThemeConfig
}

export default function FeaturesGrid({ currentTheme }: FeaturesGridProps) {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={`group backdrop-blur-lg ${currentTheme.card} rounded-2xl p-8 transition-all duration-300 hover:shadow-xl`}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentTheme.accent} flex items-center justify-center mb-6 shadow-lg`}
            >
              {feature.icon}
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="opacity-75 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}