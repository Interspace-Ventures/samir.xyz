'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const doList = [
  'Unit economics and profitability margin analysis',
  'Fundraising narrative and strategy',
  'Strategic partnerships & negotiations',
  'Organization and product strategy',
];

const dontList = [
  'CFO-as-a-service',
  'FP&A',
  'Month-end close',
  'Bookkeeping',
];

export default function AdvisoryComparison() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
      <h2 className="text-xl font-bold text-white mb-4">The difference</h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        {/* What I do */}
        <div className="bg-[#2a313a] p-6 border-b-2 sm:border-b-0 sm:border-r-2 border-black">
          <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#c9b6ff] mb-4">
            What I do
          </h3>
          <ul className="space-y-3">
            {doList.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-6 h-6 shrink-0 flex items-center justify-center bg-[#7f54dc] border-2 border-black">
                  <Check className="w-4 h-4 text-white" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-white">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What I don't */}
        <div className="bg-[#242a31] p-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-4">
            What I don&apos;t do
          </h3>
          <ul className="space-y-3">
            {dontList.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-6 h-6 shrink-0 flex items-center justify-center bg-white/5 border-2 border-white/15">
                  <X className="w-4 h-4 text-white/40" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-white/45 line-through">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
