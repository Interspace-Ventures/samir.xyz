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
    <div className={`w-full grid gap-6 rounded-xl p-8 border transform-gpu shadow-lg backdrop-blur-sm
      ${isDark 
        ? 'border-purple-800/30 bg-gradient-to-br from-purple-950/20 to-black/60' 
        : 'border-purple-300/30 bg-gradient-to-br from-purple-100 to-white shadow-purple-200/40'}`}>
      
      {/* Decorative element */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full filter blur-3xl pointer-events-none
                     ${isDark ? 'bg-purple-700/10' : 'bg-purple-200/40'}`}></div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10">
        {stats.top.map((stat, index) => (
          <div 
            key={stat.label} 
            className={`
              px-5 py-5 rounded-xl border 
              transition-all duration-300 space-y-3 
              shadow-sm hover:-translate-y-0.5 backdrop-blur-sm
              ${isDark 
                ? 'bg-black/40 border-purple-900/30 hover:border-purple-600/40 hover:shadow-purple-900/20' 
                : 'bg-white/80 border-purple-200/50 hover:border-purple-400/40 hover:shadow-purple-300/20'}
              ${index === 0 && isDark ? 'from-purple-600/10 via-purple-800/5 to-transparent bg-gradient-to-br' : ''}
              ${index === 0 && !isDark ? 'from-purple-300/10 via-purple-200/5 to-transparent bg-gradient-to-br' : ''}
            `}
          >
            <dt className={`text-sm font-medium tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {stat.label}
            </dt>
            <dd className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}
            </dd>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10">
        {stats.bottom.map((stat) => (
          <div 
            key={stat.label} 
            className={`px-5 py-5 rounded-xl border transition-all duration-300 space-y-3 
                      shadow-sm hover:-translate-y-0.5 backdrop-blur-sm
                      ${isDark 
                        ? 'bg-black/40 border-purple-900/30 hover:border-purple-600/40 hover:shadow-purple-900/20' 
                        : 'bg-white/80 border-purple-200/50 hover:border-purple-400/40 hover:shadow-purple-300/20'}`}
          >
            <dt className={`text-sm font-medium tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {stat.label}
            </dt>
            <dd className={`text-2xl font-semibold ${
              isDark 
                ? 'bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent'
            }`}>
              {stat.value}
            </dd>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsSection;