"use client"

import { useState } from 'react'

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

  return (
    <div className="w-full grid gap-6 rounded-xl p-8 border border-purple-800/30 bg-gradient-to-br from-purple-950/20 to-black/60 transform-gpu shadow-lg backdrop-blur-sm">
      {/* Decorative element */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-700/10 rounded-full filter blur-3xl pointer-events-none"></div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10">
        {stats.top.map((stat, index) => (
          <div 
            key={stat.label} 
            className={`
              px-5 py-5 bg-black/40 rounded-xl border border-purple-900/30 
              hover:border-purple-600/40 transition-all duration-300 space-y-3 
              shadow-sm hover:shadow-purple-900/20 hover:-translate-y-0.5
              backdrop-blur-sm
              ${index === 0 ? 'from-purple-600/10 via-purple-800/5 to-transparent bg-gradient-to-br' : ''}
            `}
          >
            <dt className="text-sm text-gray-400 font-medium tracking-wide">{stat.label}</dt>
            <dd className="text-2xl font-semibold text-white">{stat.value}</dd>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10">
        {stats.bottom.map((stat) => (
          <div 
            key={stat.label} 
            className="px-5 py-5 bg-black/40 rounded-xl border border-purple-900/30 hover:border-purple-600/40 transition-all duration-300 space-y-3 shadow-sm hover:shadow-purple-900/20 hover:-translate-y-0.5 backdrop-blur-sm"
          >
            <dt className="text-sm text-gray-400 font-medium tracking-wide">{stat.label}</dt>
            <dd className="text-2xl font-semibold bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
              {stat.value}
            </dd>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsSection;