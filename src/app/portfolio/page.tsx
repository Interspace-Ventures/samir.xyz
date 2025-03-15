"use client"

import PortfolioLogos from '@/components/PortfolioLogos'

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
        <div 
          className="flex-1 space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold animate-in fade-in slide-in-from-bottom-4 duration-300">Portfolio</h1>
          <p className="text-lg md:text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-300 delay-150">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
        </div>

        <div 
          className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 border rounded-xl p-6 bg-card/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-300 delay-200"
        >
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="space-y-1 animate-in fade-in slide-in-from-bottom-4 duration-300"
              style={{ 
                animationDelay: `${300 + index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <dt className="text-sm text-muted-foreground font-medium">{stat.label}</dt>
              <dd className="text-lg font-semibold">{stat.value}</dd>
            </div>
          ))}
        </div>
      </div>

      <div
        className="animate-in fade-in duration-300 delay-400"
      >
        <PortfolioLogos />
      </div>
    </div>
  )
}