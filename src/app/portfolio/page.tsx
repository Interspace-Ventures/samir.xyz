import PortfolioLogos from '@/components/PortfolioLogos'

export default function Portfolio() {
  const stats = [
    { label: "# Investments", value: "32" },
    { label: "# Markups", value: "13" },
    { label: "# Busts | # Acquisitions", value: "4 | 2" },
    { label: "Gross Multiple", value: "1.22x" },
    { label: "TVPI", value: "1.44x" },
    { label: "Net Multiple, Net of Carry", value: "1.12x" },
    { label: "Return, net of fees", value: "32%" },
    { label: "IRR", value: "10%" }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">Portfolio</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
        </div>
        <div className="w-full lg:w-auto">
          <dl className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
            {stats.map((stat) => (
              <div key={stat.label} className="flex justify-between gap-8">
                <dt className="text-muted-foreground">{stat.label}</dt>
                <dd className="font-medium text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <PortfolioLogos />
    </div>
  )
}