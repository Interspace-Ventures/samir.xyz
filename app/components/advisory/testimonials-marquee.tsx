'use client';

import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  logo?: string;
}

// Placeholder testimonials: swap in real quotes, names, titles and company
// logos as they come in. Add a `logo` path (e.g. '/logos/acme.png') to render
// the company mark instead of the company name text.
const testimonials: Testimonial[] = [
  {
    quote:
      'Samir reframed our unit economics in a week. We walked into our raise with a story investors actually believed.',
    name: 'Placeholder Name',
    title: 'Co-founder & CEO',
    company: 'Fintech Co.',
  },
  {
    quote:
      'This is not your typical finance help. Strategic, operator-level thinking that changed how we prioritize.',
    name: 'Placeholder Name',
    title: 'Founder',
    company: 'Payments Startup',
  },
  {
    quote:
      'The over-engineering is real, in the best way. Every recommendation came with the receipts to back it up.',
    name: 'Placeholder Name',
    title: 'VP Finance',
    company: 'Lending Co.',
  },
  {
    quote:
      'Capital intros, partnership strategy, and a sounding board who has actually done it. Worth every dollar.',
    name: 'Placeholder Name',
    title: 'CEO',
    company: 'Neobank',
  },
  {
    quote:
      'ROI-based pricing meant we were aligned from day one. He only wins when we win, and it shows.',
    name: 'Placeholder Name',
    title: 'COO',
    company: 'Insurtech',
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="w-[300px] sm:w-[360px] shrink-0 bg-[#2a313a] border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
      <div>
        <Quote className="w-7 h-7 text-[#7f54dc] mb-3" aria-hidden="true" />
        <p className="text-sm text-white/90 leading-relaxed mb-5">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>
      <div className="flex items-center gap-3 border-t-2 border-white/10 pt-4">
        <div className="min-w-0">
          <p className="text-sm font-bold text-white truncate">{t.name}</p>
          <p className="text-xs text-white/60 truncate">
            {t.title}
            {t.company ? `, ${t.company}` : ''}
          </p>
        </div>
        {t.logo ? (
          <div className="ml-auto bg-white border-2 border-black px-2 py-1 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.logo} alt={`${t.company} logo`} className="h-5 w-auto object-contain" />
          </div>
        ) : (
          <span className="ml-auto text-xs font-bold text-[#c9b6ff] uppercase tracking-wide shrink-0">
            {t.company}
          </span>
        )}
      </div>
    </div>
  );
}

export default function TestimonialsMarquee() {
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">What people say</h2>
      </div>

      <div className="marquee-paused relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[#332452] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[#332452] to-transparent" />

        <div className="animate-marquee flex gap-5 w-max py-2">
          {loop.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
