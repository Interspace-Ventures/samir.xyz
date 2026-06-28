'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  index?: number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  direction?: 'up' | 'down' | 'flat';
  tooltip?: string;
}

/**
 * Reusable MetricCard component for displaying portfolio metrics
 * Uses neobrutalist design with proper hover states. Optionally shows a
 * year-over-year change badge and an explanation tooltip on hover.
 */
export default function MetricCard({
  label,
  value,
  index = 0,
  change,
  direction = 'flat',
  tooltip,
}: MetricCardProps) {
  // Change badges are intentionally uncolored (always white), regardless of
  // whether the year-over-year move was good or bad.
  const changeColor = 'text-white';

  const Arrow =
    direction === 'up' ? ArrowUpRight : direction === 'down' ? ArrowDownRight : Minus;

  const tooltipId = tooltip ? `metric-tip-${index}` : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      tabIndex={tooltip ? 0 : undefined}
      aria-describedby={tooltipId}
      className="group relative bg-gradient-to-br from-purple-500 to-purple-700 p-4 neobrutalist-shadow hover:neobrutalist-shadow-hover hover:neobrutalist-transform-hover transition-all duration-200 min-h-[80px] flex flex-col justify-center outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#332452]"
    >
      <div className="text-[11px] sm:text-xs text-white/80 mb-2 font-bold uppercase tracking-wide whitespace-nowrap">
        {label}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-xl sm:text-2xl font-bold text-white">{value}</div>
        {change && (
          <div
            className={`flex items-center gap-0.5 text-[11px] sm:text-xs font-bold ${changeColor}`}
          >
            <Arrow className="w-3 h-3 shrink-0" />
            <span className="whitespace-nowrap">{change}</span>
          </div>
        )}
      </div>

      {tooltip && (
        <div
          role="tooltip"
          id={tooltipId}
          className="sl-solid pointer-events-none absolute left-1/2 top-full z-30 mt-3 w-72 max-w-[85vw] -translate-x-1/2 border-2 border-black bg-[#2a313a] p-3 text-left text-xs font-medium leading-snug text-white opacity-0 shadow-[4px_4px_0_0_rgba(0,0,0,0.45)] transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 group-focus:opacity-100"
        >
          {change && (
            <span className={`mb-1 block text-[11px] font-bold uppercase tracking-wide ${changeColor}`}>
              {change} year over year
            </span>
          )}
          {tooltip}
        </div>
      )}
    </motion.div>
  );
}
