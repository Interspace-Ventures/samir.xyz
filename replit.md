# samir.xyz Portfolio Website

## Overview

Samir's personal portfolio site. A Next.js (App Router) site with a neobrutalist
design that showcases his bio, investment portfolio, personal ventures, and a
strategic finance advisory practice. The public GitHub repo is
`heyinterspace/samir.xyz`, so the codebase is kept clean.

## User Preferences

- Communication style: simple, everyday language.
- Copy style: NO em-dashes anywhere (use periods, commas, or "and").

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack), TypeScript.
- **Database**: PostgreSQL (Neon) via Prisma ORM.
- **Styling**: Tailwind CSS + a custom neobrutalist system, refined with the
  "Structured Liquidity" language from structured.glass.
  - Background `#332452`, purple accent `#7f55dc` (`purple-primary` in
    `tailwind.config`), `#2a313a` cards, black borders with 4px shadows.
  - Rigid containment (sharp corners, black borders, flat offset shadows) plus a
    liquid-glass material: dark surfaces are translucent, backdrop-blurred, and
    saturated with a specular top highlight. The glass is applied site-wide by
    overriding the `bg-[#2a313a]`/`bg-[#242a31]` utilities in `app/globals.css`
    (`--sl-glass-*` tokens). Overlays that must stay opaque (mobile menu,
    dropdowns) add the `.sl-solid` opt-out class.
  - Design tokens in `lib/constants/design-tokens.ts`; CSS variables and the
    marquee/reduced-motion rules in `app/globals.css`.
- **Data fetching**: TanStack React Query.
- **Animations**: Framer Motion.
- **Fonts/icons**: Alexandria (Google Font), lucide-react.

## Pages

- **/** (Home): profile and bio.
- **/portfolio**: filterable grid of portfolio companies plus headline metrics.
- **/portfolio-metrics**: detailed investment metrics.
- **/ventures**: personal ventures (self-contained page).
- **/advisory**: strategic finance advisory practice (hero, principles,
  testimonials marquee, packages, contact form). Client component holding a
  shared `interest` state; package CTAs set the interest and scroll to the form.

The navigation and footer live in the root layout (`app/layout.tsx`), so they
appear on every page. The footer includes a slide-up changelog drawer.

## API Routes

- `/api/portfolio` — portfolio companies (with optional `includeMetrics`).
- `/api/metrics` — headline portfolio metrics.
- `/api/categories` — portfolio categories.
- `/api/ventures-detailed`, `/api/ventures-minimal` — ventures data.
- `/api/contact` — persists advisory contact submissions.

## Important Conventions and Gotchas

- **Metrics single source of truth**: curated headline figures (TVPI, MOIC, IRR,
  totals, markups, busts) are NOT DB-derivable and live only in
  `app/lib/static-metrics.ts`. `/api/metrics` spreads that and derives only the
  acquisitions count live from the DB. Do not re-hardcode metric values.
- **Portfolio visibility**: companies are filtered in JS, not SQL. A SQL
  `NOT investment_status = 'Bust'` filter silently drops NULL-status rows, so the
  route fetches all rows and filters out hidden companies and busts in code.
- **Ventures allowlists**: which ventures display is controlled by hardcoded
  allowlists in the ventures API routes, not just the DB.
- **Component directories**: the repo has both `components/` (current shared UI)
  and `app/components/` (a few live pieces plus historically dead code). Grep for
  imports before editing or deleting anything under `app/components/`.
- **Logos**: stored locally under `public/` (`public/logos/`,
  `public/attached_assets/`). Standard size is 500x250, black-on-transparent.
- **Cannot edit**: `package.json` and `.replit` are off-limits to the agent. Use
  the package manager for dependencies.
- **Held upgrades**: staying on Prisma 6.x and Tailwind 3.4.x. Prisma 7 and
  Tailwind 4 are larger migrations held for separate, focused efforts.

## Deployment

- Publishing runs a security scan (gitleaks) before the build. It previously
  flagged auto-generated Next.js preview keys committed to git history. The
  `.next` directory has since been scrubbed from history and is gitignored.
- Build command: `npx prisma generate && npx next build`.
