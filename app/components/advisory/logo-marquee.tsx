'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LogoItem {
  name: string;
  src: string;
  // Optional per-logo height override (defaults to h-7) for optical balancing of
  // logos that read heavier/larger at the shared height.
  heightClass?: string;
}

// Companies Samir has worked at or has connections to, plus the fintech
// portfolio companies. Logos are pre-trimmed to their content bounds (see
// public/logos/marquee) and rendered in a single color (white) at a uniform
// height, so the row reads as a clean, evenly sized logo wall.
const logos: LogoItem[] = [
  { name: 'Adyen', src: '/logos/marquee/adyen.png' },
  { name: 'Block', src: '/logos/marquee/block.png', heightClass: 'h-5' },
  { name: 'Chime', src: '/logos/marquee/chime.png' },
  { name: 'Stripe', src: '/logos/marquee/stripe.png' },
  { name: 'Unit', src: '/logos/marquee/unit.png' },
  { name: 'Visa', src: '/logos/marquee/visa.png' },
  { name: 'HRT', src: '/logos/marquee/hrt.png' },
  { name: 'Backpack', src: '/logos/marquee/backpack.png' },
  { name: 'Fizz', src: '/logos/marquee/fizz.png' },
  { name: 'Grace', src: '/logos/marquee/grace.png' },
  { name: 'Instaswitch', src: '/logos/marquee/instaswitch.png' },
  { name: 'Juno', src: '/logos/marquee/juno.png' },
  { name: 'Kartera', src: '/logos/marquee/kartera.png' },
  { name: 'Keep', src: '/logos/marquee/keep.png' },
  { name: 'Maridea', src: '/logos/marquee/maridea.png' },
  { name: 'Parrot Finance', src: '/logos/marquee/parrot.png' },
  { name: 'Percents', src: '/logos/marquee/percents.png', heightClass: 'h-5' },
  { name: 'Rely', src: '/logos/marquee/rely.png' },
  { name: 'Sundae', src: '/logos/marquee/sundae.png' },
  { name: 'Swan', src: '/logos/marquee/swan.png' },
  { name: 'Waldo', src: '/logos/marquee/waldo.png' },
];

function Logo({ logo }: { logo: LogoItem }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={`${logo.name} logo`}
      // Sizing by height only (no width cap) keeps every logo the same visual
      // height. Snap-aligned so the gallery lands cleanly when paged.
      className={`shrink-0 snap-start mx-6 ${logo.heightClass ?? 'h-7'} w-auto object-contain brightness-0 invert opacity-80`}
      loading="lazy"
    />
  );
}

export default function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // 1px tolerance avoids the next button staying enabled due to sub-pixel
    // rounding at the far end of the track.
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    // Logos are lazy-loaded, so the track width can grow after first paint.
    // Recompute button state whenever the track's content size settles.
    const observer = new ResizeObserver(updateButtons);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
      observer.disconnect();
    };
  }, [updateButtons]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // Move roughly one viewport of logos at a time so paging feels deliberate.
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between gap-4 mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          The best founders and operators trust Interspace
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={!canScrollLeft}
            aria-label="Previous logos"
            className="grid place-items-center w-9 h-9 bg-[#2a313a] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#7f54dc] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={!canScrollRight}
            aria-label="Next logos"
            className="grid place-items-center w-9 h-9 bg-[#2a313a] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#7f54dc] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className="relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8"
        aria-label="Companies Samir has worked with and fintech portfolio companies"
      >
        {/* edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#332452] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#332452] to-transparent" />

        <div
          ref={trackRef}
          className="flex w-full items-center overflow-x-auto scroll-smooth snap-x px-4 sm:px-6 lg:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {logos.map((logo) => (
            <Logo key={logo.name} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}
