type StatItem = {
  label: string;
  value: string;
};

const statsData: StatItem[][] = [
  [
    { label: "# Investments", value: "32" },
    { label: "# Markups", value: "13" },
    { label: "# Acquisitions", value: "2" },
    { label: "# Busts", value: "4" }
  ],
  [
    { label: "TVPI", value: "1.44x" },
    { label: "Gross Multiple", value: "1.22x" },
    { label: "Net Multiple", value: "1.12x" },
    { label: "IRR", value: "10%" }
  ]
];

/**
 * StatsSection component displays portfolio metrics in a table layout
 * with 2 rows of 4 KPIs as requested
 */
export default function StatsSection() {
  return (
    <div className="w-full max-w-[800px] mb-8 bg-white rounded-lg border border-gray-100 shadow-sm p-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Render stats as a table with 2 rows of 4 columns */}
        {statsData.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {row.map((stat) => (
              <div 
                key={stat.label} 
                className="p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-200 
                       flex flex-col items-center text-center transform hover:-translate-y-0.5"
              >
                <h3 className="text-sm font-medium text-gray-600 mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {stat.label}
                </h3>
                <p className="text-2xl font-bold text-black m-0">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}