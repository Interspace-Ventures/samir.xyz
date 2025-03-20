"use client"

import { useEffect, useState } from 'react'

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
  const [mounted, setMounted] = useState(false)
  const [stats] = useState<StatsGroup>(defaultStats)

  useEffect(() => {
    try {
      console.log('StatsSection mounting');
      setMounted(true)
      console.log('StatsSection mounted successfully');
    } catch (error) {
      console.error('Error mounting StatsSection:', error);
    }
  }, []);

  if (!mounted) {
    console.log('StatsSection rendering loading state');
    return (
      <div className="w-full grid gap-3 rounded-xl p-3 bg-card/50 backdrop-blur-sm animate-pulse">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`top-${i}`} className="space-y-1">
              <div className="h-4 bg-purple-100 dark:bg-purple-900/30 rounded w-16" />
              <div className="h-6 bg-purple-50 dark:bg-purple-900/20 rounded w-12" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`bottom-${i}`} className="space-y-1">
              <div className="h-4 bg-purple-100 dark:bg-purple-900/30 rounded w-16" />
              <div className="h-6 bg-purple-50 dark:bg-purple-900/20 rounded w-12" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  console.log('StatsSection rendering with data');
  return (
    <div className="w-full grid gap-3 rounded-xl p-3 bg-card/50 backdrop-blur-sm transform-gpu">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.top.map((stat) => (
          <div key={stat.label} className="space-y-1">
            <dt className="text-sm text-muted-foreground font-medium">{stat.label}</dt>
            <dd className="text-lg font-semibold">{stat.value}</dd>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.bottom.map((stat) => (
          <div key={stat.label} className="space-y-1">
            <dt className="text-sm text-muted-foreground font-medium">{stat.label}</dt>
            <dd className="text-lg font-semibold">{stat.value}</dd>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsSection;