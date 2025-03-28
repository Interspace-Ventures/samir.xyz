"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

interface Stat {
  label: string
  value: string
}

interface StatsGroup {
  top: Stat[]
  bottom: Stat[]
}

const defaultStats: StatsGroup = {
  top: [
    { label: "# Investments", value: "32" },
    { label: "# Markups", value: "13" },
    { label: "# Acquisitions", value: "2" },
    { label: "# Busts", value: "4" },
  ],
  bottom: [
    { label: "TVPI", value: "1.44x" },
    { label: "Gross Multiple", value: "1.22x" },
    { label: "Net Multiple", value: "1.12x" },
    { label: "IRR", value: "10%" },
  ]
}

const StatsSection = () => {
  const [stats] = useState<StatsGroup>(defaultStats)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Handle client side mounting for theme detection
  useEffect(() => {
    setMounted(true)
  }, [])

  // Detect if we're in dark mode for proper styling
  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <div className="w-full transform-gpu bg-black p-6 mb-8 rounded-lg">
      <div className="grid grid-rows-2 gap-10">
        {/* Top Row - Investments & Stats */}
        <div className="grid grid-cols-4 gap-4">
          {stats.top.map((stat) => (
            <div key={stat.label} className="flex flex-col space-y-2">
              <div className="text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
              <div className="text-white text-3xl font-semibold">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Row - Performance Metrics */}
        <div className="grid grid-cols-4 gap-4">
          {stats.bottom.map((stat) => (
            <div key={stat.label} className="flex flex-col space-y-2">
              <div className="text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
              <div className="text-white text-3xl font-semibold">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatsSection;