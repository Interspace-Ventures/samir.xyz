'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';
import LogoMarquee from './logo-marquee';

export default function AdvisoryHero() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className="inline-block bg-[#7f54dc] text-white text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6">
          Fintech Strategic Finance Advisory
        </span>

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] mb-6">
          Advisory that drives impact.
        </h1>

        <p className="text-lg md:text-xl text-white/85 max-w-2xl mb-9 leading-relaxed">
          Operator-built strategic finance, specialized in fintech. I&apos;ve
          spent a decade in the space at every stage, from pre-seed to scale, and
          I bring that rare experience to your hardest calls: unit economics,
          fundraising, and the partnerships that change your trajectory.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-black text-white font-bold uppercase tracking-wide text-sm px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-800 hover:no-underline active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
            Let&apos;s talk
          </a>
          <a
            href="#endorsements"
            className="inline-flex items-center gap-2 bg-[#2a313a] text-white font-bold uppercase tracking-wide text-sm px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#7f54dc] hover:no-underline active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <Quote className="w-4 h-4" aria-hidden="true" />
            Endorsements
          </a>
        </div>

        <LogoMarquee />
      </motion.div>
    </section>
  );
}
