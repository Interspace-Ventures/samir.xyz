"use client"

import PortfolioLogos from '@/components/PortfolioLogos'
import { motion } from 'framer-motion'

export default function Portfolio() {
  const stats = [
    { label: "# Investments", value: "32" },
    { label: "# Markups", value: "13" },
    { label: "# Busts", value: "4" },
    { label: "TVPI", value: "1.44x" },
    { label: "IRR", value: "10%" }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
        <motion.div 
          className="flex-1 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold">Portfolio</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
        </motion.div>

        <motion.div 
          className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 border rounded-xl p-6 bg-card/50 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label} 
              className="space-y-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              <dt className="text-sm text-muted-foreground font-medium">{stat.label}</dt>
              <dd className="text-lg font-semibold">{stat.value}</dd>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <PortfolioLogos />
      </motion.div>
    </div>
  )
}