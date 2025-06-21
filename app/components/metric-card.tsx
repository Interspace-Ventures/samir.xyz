'use client';

interface MetricCardProps {
  label: string;
  value: string | number;
}

/**
 * Reusable MetricCard component for displaying portfolio metrics
 */
export default function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="neo-card bg-[#7f54dc] p-4 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
      <div className="text-xs sm:text-sm text-white/80 mb-2 font-bold uppercase tracking-wider">{label}</div>
      <div className="text-xl sm:text-2xl font-bold text-white">{value}</div>
    </div>
  );
}