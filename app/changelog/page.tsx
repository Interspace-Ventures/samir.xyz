'use client';

import { motion } from 'framer-motion';
import { CHANGELOG } from '../lib/changelog';

export default function ChangelogPage() {
  return (
    <div className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Changelog</h1>
      <p className="text-white/70 mb-10">
        What&apos;s new on samir.xyz, newest first.
      </p>

      <div className="space-y-5">
        {CHANGELOG.map((release, index) => (
          <motion.div
            key={release.version}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
            className="bg-[#2a313a] border-2 border-black p-5 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-sm font-bold text-white bg-[#7f54dc] border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                v{release.version}
              </span>
              <span className="text-sm text-white/50">{release.date}</span>
              <span className="text-base font-bold text-white">
                {release.title}
              </span>
            </div>

            <ul className="space-y-2">
              {release.changes.map((change) => (
                <li key={change} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 shrink-0 bg-[#c9b6ff]" aria-hidden="true" />
                  <span className="text-sm text-white/80 leading-relaxed">
                    {change}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
