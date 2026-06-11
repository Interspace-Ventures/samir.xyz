'use client';

interface LogoItem {
  name: string;
  src: string;
}

// Companies Samir has worked at or has connections to, plus the fintech
// portfolio companies. Every logo is rendered in a single color (white) for a
// clean, uniform "Structured Liquidity" look.
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

function LogoSlot({ logo, ariaHidden }: { logo: LogoItem; ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="shrink-0 w-40 flex items-center justify-center"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={ariaHidden ? '' : `${logo.name} logo`}
        className="h-6 w-auto max-w-[112px] object-contain brightness-0 invert opacity-80"
        loading="lazy"
      />
    </div>
  );
}

export default function LogoMarquee() {
  // Duplicated so the CSS marquee can loop seamlessly. The second copy is
  // presentational only and hidden from assistive tech.
  const loop = [...logos, ...logos];

  return (
    <div className="mt-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-4">
        The best founders and operators trust Interspace for high-impact advisory
      </p>

      <div
        className="logo-marquee-paused relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8"
        aria-label="Companies Samir has worked with and fintech portfolio companies"
      >
        {/* edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#332452] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#332452] to-transparent" />

        <div className="animate-logo-marquee flex w-max items-center">
          {loop.map((logo, i) => (
            <LogoSlot key={`${logo.name}-${i}`} logo={logo} ariaHidden={i >= logos.length} />
          ))}
        </div>
      </div>
    </div>
  );
}
