import React from 'react';

// Stats data structure
interface Stat {
  label: string;
  value: string;
}

export default function StatsDisplay() {
  // Organized stats in 2 rows of 4 for cleaner rendering
  const topRowStats: Stat[] = [
    { label: "# Investments", value: "32" },
    { label: "# Markups", value: "13" },
    { label: "# Acquisitions", value: "2" },
    { label: "# Busts", value: "4" }
  ];
  
  const bottomRowStats: Stat[] = [
    { label: "TVPI", value: "1.44x" },
    { label: "Gross Multiple", value: "1.22x" },
    { label: "Net Multiple", value: "1.12x" },
    { label: "IRR", value: "10%" }
  ];
  
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Top Row - 4 KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-700">
          {topRowStats.map((stat) => (
            <div key={stat.label} className="p-4 text-center">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </div>
        
        {/* Border between rows */}
        <div className="h-px w-full bg-gray-100 dark:bg-gray-700"></div>
        
        {/* Bottom Row - 4 KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-700">
          {bottomRowStats.map((stat) => (
            <div key={stat.label} className="p-4 text-center">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}