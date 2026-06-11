'use client';

import { useEffect, useRef } from 'react';

interface LogoItem {
  name: string;
  src: string;
}

// Companies Samir has worked at or has connections to, plus the fintech
// portfolio companies. Logos render on white chips at a uniform height so the
// marquee reads as a clean, consistent logo wall.
const logos: LogoItem[] = [
  { name: 'Adyen', src: '/logos/worked/adyen.png' },
  { name: 'Block', src: '/logos/worked/block.png' },
  { name: 'Chime', src: '/logos/worked/chime.png' },
  { name: 'Stripe', src: '/logos/worked/stripe.png' },
  { name: 'Unit', src: '/logos/worked/unit.png' },
  { name: 'Visa', src: '/logos/worked/visa.png' },
  { name: 'HRT', src: '/logos/worked/hrt.png' },
  { name: 'Backpack', src: '/logos/backpack.png' },
  { name: 'Fizz', src: '/attached_assets/Fizz_smaller.png' },
  { name: 'Grace', src: '/logos/grace.png' },
  { name: 'Instaswitch', src: '/logos/instaswitch.png' },
  { name: 'Juno', src: '/logos/juno.png' },
  { name: 'Kartera', src: '/logos/kartera.png' },
  { name: 'Keep', src: '/logos/keep.png' },
  { name: 'Maridea', src: '/logos/maridea.png' },
  { name: 'Parrot Finance', src: '/logos/parrot.png' },
  { name: 'Percents', src: '/logos/percents.png' },
  { name: 'Rely', src: '/logos/rely.png' },
  { name: 'Sundae', src: '/logos/sundae.png' },
  { name: 'Swan', src: '/logos/swan.png' },
  { name: 'Waldo', src: '/logos/waldo.png' },
];

function LogoChip({ logo, ariaHidden }: { logo: LogoItem; ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="shrink-0 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] h-12 px-4 flex items-center justify-center"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={ariaHidden ? '' : `${logo.name} logo`}
        className="h-6 w-auto max-w-[110px] object-contain"
        loading="lazy"
      />
    </div>
  );
}

export default function LogoMarquee() {
  // Duplicated so the CSS marquee can loop seamlessly. The second copy is
  // presentational only and hidden from assistive tech.
  const loop = [...logos, ...logos];
  const barRef = useRef<HTMLDivElement>(null);

  // The bar is fixed to the viewport bottom, so reserve matching space at the
  // document bottom while this page is mounted. This keeps the global footer
  // from being hidden behind the bar when scrolled all the way down.
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const apply = () => {
      document.body.style.paddingBottom = `${el.offsetHeight}px`;
    };
    apply();

    const observer = new ResizeObserver(apply);
    observer.observe(el);

    return () => {
      observer.disconnect();
      document.body.style.paddingBottom = '';
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#2a313a] sl-solid border-t-2 border-black"
      aria-label="Companies Samir has worked with and fintech portfolio companies"
    >
      <div className="marquee-paused relative overflow-hidden py-3">
        {/* edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[#2a313a] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[#2a313a] to-transparent" />

        <div className="animate-marquee flex gap-5 w-max items-center px-2">
          {loop.map((logo, i) => (
            <LogoChip key={`${logo.name}-${i}`} logo={logo} ariaHidden={i >= logos.length} />
          ))}
        </div>
      </div>
    </div>
  );
}
