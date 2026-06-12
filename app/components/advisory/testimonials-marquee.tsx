'use client';

import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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

function TestimonialCard({ t, ariaHidden }: { t: Testimonial; ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="w-[300px] sm:w-[360px] shrink-0 snap-start bg-[#2a313a] border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
    >
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

// Render the list three times so the carousel can loop seamlessly in both
// directions: the viewport sits in the middle copy and silently snaps back by
// one copy whenever it drifts into a neighbouring copy.
const COPIES = 3;

export default function TestimonialsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Distance between the start of one copy and the start of the next. Measured
  // from the DOM so card widths, gaps and padding are all accounted for.
  const getStride = (el: HTMLDivElement) => {
    const cards = el.children;
    const first = cards[0] as HTMLElement | undefined;
    const next = cards[testimonials.length] as HTMLElement | undefined;
    if (!first || !next) return 0;
    return next.offsetLeft - first.offsetLeft;
  };

  // Keep scrollLeft within the middle copy's range [stride, 2 * stride). Because
  // every copy is identical, snapping by whole strides is invisible.
  const normalize = () => {
    const el = trackRef.current;
    if (!el) return;
    const stride = getStride(el);
    if (stride <= 0) return;
    let left = el.scrollLeft;
    while (left >= stride * 2) left -= stride;
    while (left < stride) left += stride;
    if (Math.abs(left - el.scrollLeft) > 0.5) el.scrollLeft = left;
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const recenter = () => {
      const stride = getStride(el);
      if (stride > 0) el.scrollLeft = stride;
    };
    // Wait a frame so layout (fonts, gaps) has settled before measuring.
    const raf = requestAnimationFrame(recenter);

    let settleTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(settleTimer);
      // Normalize once the smooth animation or touch momentum has stopped.
      settleTimer = setTimeout(normalize, 100);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recenter);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settleTimer);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recenter);
    };
  }, []);

  const scrollByPage = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // Move roughly one viewport of cards at a time, but never more than one
    // copy, so we always stay within the loop buffer.
    const stride = getStride(el);
    let distance = el.clientWidth * 0.8;
    if (stride > 0) distance = Math.min(distance, stride - 1);
    el.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  return (
    <section id="endorsements" className="py-12 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold text-white">What founders and operators say</h2>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label="Previous testimonials"
            className="grid place-items-center w-9 h-9 bg-[#2a313a] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#7f54dc] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label="Next testimonials"
            className="grid place-items-center w-9 h-9 bg-[#2a313a] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#7f54dc] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[#332452] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[#332452] to-transparent" />

        <div
          ref={trackRef}
          className="flex gap-5 py-2 overflow-x-auto scroll-smooth snap-x px-4 sm:px-6 lg:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {Array.from({ length: COPIES }).flatMap((_, copy) =>
            testimonials.map((t, i) => (
              // Only the middle copy is canonical for assistive tech; the
              // cloned copies that exist purely for seamless looping are hidden.
              <TestimonialCard key={`${copy}-${i}`} t={t} ariaHidden={copy !== 1} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
