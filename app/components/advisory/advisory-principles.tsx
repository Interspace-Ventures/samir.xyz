'use client';

import { motion } from 'framer-motion';
import { Handshake, Microscope, Scale } from 'lucide-react';

const principles = [
  {
    icon: Handshake,
    title: 'Operator to operator',
    body: "Every recommendation comes from doing the work \u2014 not reading about it. I've sat in your seat, so I know exactly what you're going through.",
  },
  {
    icon: Microscope,
    title: 'Data-driven & over-engineered',
    body: 'I over-engineer and deeply research everything I do, so every recommendation is one you can actually trust.',
  },
  {
    icon: Scale,
    title: 'Aligned',
    body: 'I only earn when you get value. Pricing is entirely ROI-based \u2014 your wins are my wins.',
  },
];

export default function AdvisoryPrinciples() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">Principles</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {principles.map((p, index) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#2a313a] border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#7f54dc] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-white leading-tight">
                  {p.title}
                </h3>
              </div>
              <p className="text-sm text-white/75 leading-relaxed">{p.body}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
