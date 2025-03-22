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
    <div className="w-full grid gap-6 rounded-xl p-6 border border-purple-800/40 bg-gradient-to-br from-purple-950/30 to-black/40 transform-gpu shadow-lg">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {stats.top.map((stat) => (
          <div key={stat.label} className="px-4 py-3 bg-black/30 rounded-lg border border-purple-800/20 hover:border-purple-800/40 transition-colors space-y-2 shadow-sm">
            <dt className="text-sm text-gray-400 font-medium">{stat.label}</dt>
            <dd className="text-2xl font-semibold text-white">{stat.value}</dd>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {stats.bottom.map((stat) => (
          <div key={stat.label} className="px-4 py-3 bg-black/30 rounded-lg border border-purple-800/20 hover:border-purple-800/40 transition-colors space-y-2 shadow-sm">
            <dt className="text-sm text-gray-400 font-medium">{stat.label}</dt>
            <dd className="text-2xl font-semibold text-white">{stat.value}</dd>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsSection;