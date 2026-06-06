'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { CHANGELOG, CURRENT_VERSION } from '../lib/changelog';

export default function ChangelogDrawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-text-secondary hover:text-white transition-colors"
      >
        v{CURRENT_VERSION}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60"
              aria-hidden="true"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
              aria-label="Changelog"
              className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] flex flex-col bg-[#332452] border-t-2 border-black"
            >
              <div className="mx-auto w-full max-w-3xl flex flex-col min-h-0 px-4 sm:px-6 py-6">
                <div className="flex items-start justify-between mb-6 shrink-0">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Changelog</h2>
                    <p className="text-white/70 text-sm mt-1">
                      What&apos;s new on samir.xyz, newest first.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close changelog"
                    className="shrink-0 w-9 h-9 flex items-center justify-center bg-[#2a313a] border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#7f54dc] transition-colors"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="overflow-y-auto min-h-0 space-y-5 pr-1 pb-2">
                  {CHANGELOG.map((release) => (
                    <div
                      key={release.version}
                      className="bg-[#2a313a] border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-sm font-bold text-white bg-[#7f54dc] border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          v{release.version}
                        </span>
                        <span className="text-sm text-white/50">{release.date}</span>
                        <span className="text-base font-bold text-white">{release.title}</span>
                      </div>
                      <ul className="space-y-2">
                        {release.changes.map((change) => (
                          <li key={change} className="flex items-start gap-3">
                            <span
                              className="mt-2 w-1.5 h-1.5 shrink-0 bg-[#c9b6ff]"
                              aria-hidden="true"
                            />
                            <span className="text-sm text-white/80 leading-relaxed">
                              {change}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
