'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const notList = ['CFO-as-a-service', 'FP&A', 'Month-end close', 'Bookkeeping'];
const isList = [
  'Unit economics',
  'Fundraising strategy',
  'Strategic partnerships',
  'Org & product strategy',
];

export default function AdvisoryHero() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className="inline-block bg-[#7f54dc] text-white text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6">
          Strategic Finance Advisory
        </span>

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] mb-6">
          Not your fractional CFO.
        </h1>

        <p className="text-lg md:text-xl text-white/85 max-w-2xl mb-9 leading-relaxed">
          This isn&apos;t FP&amp;A. It isn&apos;t accounting or month-end close. It&apos;s
          strategic finance &mdash; over-engineered, operator-built, and pointed at the
          decisions that actually change a fintech&apos;s trajectory.
        </p>

        <div className="flex flex-col gap-3 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold w-10">
              Not
            </span>
            {notList.map((label) => (
              <span
                key={label}
                className="text-sm font-semibold text-white/45 line-through bg-white/5 border-2 border-white/10 px-3 py-1"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#c9b6ff] font-bold w-10">
              Yes
            </span>
            {isList.map((label) => (
              <span
                key={label}
                className="text-sm font-bold text-white bg-[#7f54dc] border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 bg-amber-300 text-black font-bold uppercase tracking-wide text-sm px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-400 hover:no-underline active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Start a conversation
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </motion.div>
    </section>
  );
}
