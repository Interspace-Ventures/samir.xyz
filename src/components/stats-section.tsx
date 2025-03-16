"use client"

interface StatProps {
  label: string;
  value: string;
}

//This function is no longer needed as the edited code uses a different structure
// function Stat({ label, value }: StatProps) {
//   return (
//     <div className="text-center">
//       <div className="text-2xl font-bold">{value}</div>
//       <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
//     </div>
//   );
// }

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

export default function StatsSection() {
  return (
    <div className="w-full lg:w-auto grid gap-3 rounded-xl p-3 bg-card/50 backdrop-blur-sm transform-gpu">
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