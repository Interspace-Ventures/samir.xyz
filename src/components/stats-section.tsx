"use client"

interface StatProps {
  label: string;
  value: string;
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    { label: "Portfolio Companies", value: "30+" },
    { label: "Gross Multiple", value: "3.2x" },
    { label: "Net Multiple", value: "2.8x" }
  ];

  return (
    <div className="w-full lg:w-auto grid grid-cols-3 gap-3 rounded-xl p-3 bg-card">
      {stats.map((stat) => (
        <Stat key={stat.label} {...stat} />
      ))}
    </div>
  );
}
