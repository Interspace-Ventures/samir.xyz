"use client"

import PortfolioLogos from '@/components/PortfolioLogos'

export default function Portfolio() {
  const leftColumnStats = [
    { label: "# Investments", value: "32" },
    { label: "# Markups", value: "13" },
    { label: "# Busts | # Acquisitions", value: "4 | 2" },
    { label: "Return, net of fees", value: "32%" },
  ]

  const rightColumnStats = [
    { label: "TVPI", value: "1.44x" },
    { label: "Gross Multiple", value: "1.22x" },
    { label: "Net Multiple, Net of Carry", value: "1.12x" },
    { label: "IRR", value: "10%" }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">Portfolio</h1>
          <p className="text-lg md:text-xl max-w-3xl text-muted-foreground">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
        </div>
        <div className="w-full lg:w-auto grid grid-cols-2 gap-x-12 gap-y-6 border rounded-xl p-8 bg-card/50 backdrop-blur-sm shadow-sm">
          {/* Left Column */}
          <div className="space-y-6">
            {leftColumnStats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <dt className="text-sm text-muted-foreground font-medium">{stat.label}</dt>
                <dd className="text-lg font-semibold text-foreground">{stat.value}</dd>
              </div>
            ))}
          </div>
          {/* Right Column */}
          <div className="space-y-6">
            {rightColumnStats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <dt className="text-sm text-muted-foreground font-medium">{stat.label}</dt>
                <dd className="text-lg font-semibold text-foreground">{stat.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PortfolioLogos />
    </div>
  )
}