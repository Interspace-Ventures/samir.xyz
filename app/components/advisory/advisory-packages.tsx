'use client';

import { motion } from 'framer-motion';
import { Wrench, TrendingUp, Compass, Check } from 'lucide-react';
import { Button } from '../../../components/ui/button';

interface AdvisoryPackagesProps {
  onSelect: (interest: string) => void;
}

const packages = [
  {
    icon: Wrench,
    name: 'Build',
    type: 'Project-based',
    points: [
      'Landing pages',
      'Marketing websites',
      'Sponsored posts',
    ],
  },
  {
    icon: TrendingUp,
    name: 'Grow',
    type: 'Project-based',
    points: [
      'Fundraising strategy',
      'Strategic partnerships',
      'Product unit economics',
    ],
  },
  {
    icon: Compass,
    name: 'Advise',
    type: 'Ongoing',
    points: [
      'Organizational strategy',
      'Product advisory',
      'Network access',
      'Capital intros',
      'Customer intros',
    ],
  },
];

export default function AdvisoryPackages({ onSelect }: AdvisoryPackagesProps) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-white mb-8">Packages</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
        {packages.map((pkg, index) => {
          const Icon = pkg.icon;
          return (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#2a313a] border-2 border-black p-4 lg:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col"
            >
              <div className="flex items-center justify-between mb-4 lg:mb-5">
                <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#7f54dc] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" aria-hidden="true" />
                </div>
                <span className="hidden lg:inline-block text-[10px] font-bold uppercase tracking-wider text-black bg-[#c9b6ff] border-2 border-black px-2 py-1">
                  {pkg.type}
                </span>
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">{pkg.name}</h3>
              <ul className="space-y-2 mb-5 lg:mb-6 flex-grow">
                {pkg.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Check
                      className="w-3.5 h-3.5 lg:w-4 lg:h-4 mt-0.5 shrink-0 text-[#c9b6ff]"
                      aria-hidden="true"
                    />
                    <span className="text-xs lg:text-sm text-white/80 leading-snug">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <span className="lg:hidden self-start text-[9px] font-bold uppercase tracking-wider text-black bg-[#c9b6ff] border-2 border-black px-1.5 py-1 mb-2">
                {pkg.type}
              </span>

              <div className="flex flex-col gap-2">
                <Button
                  variant="reverse"
                  onClick={() => onSelect(`${pkg.name}: Let's talk`)}
                >
                  Let&apos;s talk
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
