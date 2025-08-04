'use client'

import { motion } from 'framer-motion'
import { stats } from '@/lib/constants/landing'
import { ThemeConfig } from '@/types/theme'

interface StatsSectionProps {
    currentTheme: ThemeConfig
}

export default function StatsSection({ currentTheme }: StatsSectionProps) {
    return (
        <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className={`${currentTheme.stats} backdrop-blur-xl rounded-3xl p-12 shadow-xl`}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="space-y-2"
                            >
                                <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}>
                                    {stat.value}
                                </div>
                                <div className="opacity-75">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}