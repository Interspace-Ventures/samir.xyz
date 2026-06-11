'use client';

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

function Logo({ logo, ariaHidden }: { logo: LogoItem; ariaHidden?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      aria-hidden={ariaHidden}
      src={logo.src}
      alt={ariaHidden ? '' : `${logo.name} logo`}
      // Uniform horizontal margin on every item keeps the duplicated track
      // perfectly symmetric, so translateX(-50%) loops seamlessly. Sizing by
      // height only (no width cap) keeps every logo the same visual height.
      className={`shrink-0 mx-6 ${logo.heightClass ?? 'h-7'} w-auto object-contain brightness-0 invert opacity-80`}
      loading="lazy"
    />
  );
}

export default function LogoMarquee() {
  // Duplicated so the CSS marquee can loop seamlessly. The second copy is
  // presentational only and hidden from assistive tech.
  const loop = [...logos, ...logos];

  return (
    <div className="mt-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-4">
        The best founders and operators trust Interspace
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
            <Logo key={`${logo.name}-${i}`} logo={logo} ariaHidden={i >= logos.length} />
          ))}
        </div>
      </div>
    </div>
  );
}
