"use client"

import PortfolioLogos from '@/components/PortfolioLogos'

export default function Portfolio() {
  const stats = {
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

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Portfolio</h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
        </div>

        {/* Stats card with more compact layout */}
        <div className="w-full lg:w-auto grid gap-3 rounded-xl p-3 bg-card/50 backdrop-blur-sm">
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
      </div>

      <div>
        <PortfolioLogos />
      </div>
    </div>
  )
}