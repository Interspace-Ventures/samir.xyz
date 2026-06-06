'use client';

import { motion } from 'framer-motion';
import { Handshake, Microscope, Scale } from 'lucide-react';

const principles = [
  {
    icon: Handshake,
    title: 'Fintech operator, every stage',
    body: "A decade in fintech, from pre-seed to scale. Every recommendation comes from doing the work in your shoes, not reading about it.",
  },
  {
    icon: Microscope,
    title: 'Data-driven & over-engineered',
    body: 'I over-engineer and deeply research everything I do, so every recommendation is one you can actually trust.',
  },
  {
    icon: Scale,
    title: 'Aligned',
    body: 'I only earn when you get value. Pricing is entirely ROI-based, so your wins are my wins.',
  },
];

export default function AdvisoryPrinciples() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">Principles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {principles.map((p, index) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#2a313a] border-2 border-black p-4 lg:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 lg:w-10 lg:h-10 shrink-0 flex items-center justify-center bg-[#7f54dc] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-sm lg:text-base font-bold text-white leading-tight">
                  {p.title}
                </h3>
              </div>
              <p className="text-xs lg:text-sm text-white/75 leading-relaxed">{p.body}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
