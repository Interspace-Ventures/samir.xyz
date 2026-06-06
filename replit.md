# Portfolio Website - Replit Configuration

## Overview

This is a modern personal portfolio website built with Next.js that showcases professional achievements, portfolio companies, and ventures. The application features a responsive design with smooth animations and a clean, professional interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (2026-06-06) — Advisory Page

- **New `/advisory` page** for Samir's strategic finance advisory practice, built with the existing neobrutalist design system (bg `#332452`, accent `#7f54dc`, `#2a313a` cards, black borders + 4px shadows, amber CTAs). Page is a client component (`app/advisory/page.tsx`) holding shared `interest` state. Five sections in `app/components/advisory/`:
  - **Hero** — eyebrow badge, "Not your fractional CFO." headline, and a "Not / Yes" contrast row differentiating Strategic Finance from CFO-as-a-service / FP&A / month-end close / bookkeeping.
  - **Principles** — 3 cards: Operator-to-operator, Data-driven & over-engineered, Aligned (ROI-based pricing).
  - **Testimonials marquee** — CSS auto-scroll (pauses on hover) with **placeholder** quotes; each entry supports an optional company `logo` path (drop in `/logos/...`), otherwise shows the company name. Swap in real testimonials when supplied.
  - **Packages** — Build (project-based, fintech landing/marketing sites), Grow (project-based, fundraising/partnerships/unit economics), Advise (ongoing, org strategy/product advisory/network/capital+customer intros). Each card has TWO CTAs ("Get Started" + "Ask a Question") that set `interest = "{Package} — {label}"` and smooth-scroll to the contact form, so Samir sees both the source package and the intent.
  - **Contact form** — Name, email, company, stage (select), comments; shows a clearable interest chip; POSTs to `/api/contact`; success state on submit.
- **Persistence**: new `ContactSubmission` Prisma model (id/name/email/company?/stage?/comments?/interest?/createdAt), pushed to Neon Postgres. New `app/api/contact/route.ts` validates name + email (format-checked), persists via Prisma, returns 400 on bad input and a generic 500 (internal error details logged server-side only, not leaked to clients).
- **Nav**: added "Advisory" to `menuItems` (desktop + mobile auto-render; clamp font sizing keeps the 5-item bar uncrowded).
- **Marquee CSS**: added `@keyframes marquee` + `.animate-marquee` + `.marquee-paused:hover` to `app/globals.css`; the existing `prefers-reduced-motion` block tames it for reduced-motion users.
- Verified: `npx tsc --noEmit` and `npx next build` pass (`/advisory` + `/api/contact` compile); API manually tested (valid → `{success:true}`, missing/invalid email → 400); test row cleaned up.

## Recent Changes (2026-06-06) — Full Refresh

- **Next.js 15 → 16 upgrade** (now 16.2.7, Turbopack default): `npx tsc --noEmit` and `npx next build` both pass; all pages return 200. Removed the deprecated `images.domains` key from `next.config.js` (removed in Next 16). All logos are local (`public/`), so no `images.remotePatterns` needed — verified 0 remote `logo-url` values in both DB tables.
- **lucide-react 0.5 → 1** major bump; plus safe minor/patch updates: React 19.2, framer-motion 12.40, @tanstack/react-query 5.101, prisma + @prisma/client 6.19, typescript 5.9, tailwindcss 3.4.x, postcss/autoprefixer/tailwind-merge.
- **framer-motion 12.40 type fix**: stricter v12 types broke the custom `AnimationVariants` interface, so `lib/utils/animations.ts` now uses framer-motion's own `Variants` type.
- **Security**: `npm audit` went from 6 vulns (3 high / 3 moderate) → **2 moderate**. The remaining two are inside Next.js's *own bundled* postcss 8.4.31 — npm's only "fix" is downgrading Next to v9 (absurd), and even the latest Next ships them. Acceptable, unavoidable, build-tooling-only residual.
- **Held as too risky for this pass** (recommend separate focused efforts): **Prisma 7** (ORM/runtime/config migration) and **Tailwind 4** (CSS-first config rewrite that could destabilize the neobrutalist design). Staying on fully-supported 6.x / 3.4.x lines.
- **Cleanup**: removed dead files (`app/ventures/page.backup.tsx`, `package-lock.json.backup`, `test-server.js`, `neobrutalism-setup.css`, `app/ventures-new/`, `backup_workflows/`) and the unused `zod` dependency — all confirmed unreferenced.
- **Logos**: new blue→magenta gradient PNGs for verse/spacebase/orbit (`public/attached_assets/`) matching the Interspace/2DE ethos.
- **Nav**: added an `ExternalLink` indicator next to the Interspace nav item (desktop + mobile).
- **Design polish** (on-brand, no redesign): added accessible keyboard `:focus-visible` rings (purple `#c9b6ff`) and a `prefers-reduced-motion` block to `app/globals.css`; gave the portfolio MetricCard a subtle `from-purple-500 to-purple-700` gradient for depth.

## Recent Changes (2026-06-06)

- **Added/fixed 7 portfolio deals**: Backpack, Kartera, Lunar (Hard Seltzer), Metadata, Parrot Finance, Playbook, Waldo.
  - 6 of the 7 already existed in the Postgres `Portfolio` table with correct black-on-transparent logos in `public/logos/`; only **Parrot Finance** was new.
  - **Parrot Finance** inserted: Fintech, Markup, website parrotfinance.io. Generated `public/logos/parrot.png` from their official `logo.svg` — rendered high-res, colorized to solid black (alpha preserved), trimmed and centered on a 500×250 transparent canvas to match the other logos.
  - **Lunar** category corrected SaaS → **Commerce** (it's the hard seltzer brand).
  - **Playbook** status set to **Markup**.
  - **Backpack** website updated to `backpack529.com` (per user; DB previously had backpackpay.com — its own description confirms it's the 529 college-savings company).
- **Fixed a portfolio visibility bug** (`app/api/portfolio/route.ts`): the SQL filter `NOT: { investment_status: 'Bust' }` silently dropped every row where `investment_status IS NULL` (in SQL, `NOT(NULL = 'Bust')` is NULL → excluded). This had been hiding 9 legitimate companies (Backpack, Kartera, Lunar, Metadata, Waldo, Goodmylk, Hedgehog, Juno, Sundae). Now fetches all rows and filters in JS, so NULL-status companies display. API went from 26 → 35 companies; Moku (Bust) and The Food Company stay excluded.
- **Metrics updated** (`app/lib/static-metrics.ts` + `app/api/metrics/route.ts`): `total_investments` 42 → 43 (Parrot added), `markups` 21 → 23 (Playbook + Parrot).

## Recent Changes (2026-06-05)

- **Deployment Build Failure (security scan) — diagnosed**: Publish fails at the security-scan step. The build logs show only `Deployment` → `Build` → `Running Security Scan` → `Security Scan Complete` → `failed`, with NO `next build` output — proving the scan runs *before* the build and inspects the source, including git history. The scanner (gitleaks) flags the auto-generated `previewModeSigningKey` / `previewModeEncryptionKey` from `.next/prerender-manifest.json`, which were committed to git history in the past. These are throwaway keys (regenerated on every `next build`) — a false positive, not a real secret. The working tree is clean (`.next` is gitignored/untracked), so the keys come only from old commits.
  - **Safe fix (recommended, non-destructive):** these are false positives, so let publishing proceed past them. In the Publishing tool's **Advanced** settings, turn OFF "Block publishing of critical vulnerabilities"; or open the **Project Security Center**, review, and **dismiss** the finding. Then publish. This is a UI action — there's no code/config change that toggles it.
  - **Permanent root-cause fix (heavier, optional):** scrub `.next` from git history so the keys are gone for good. This rewrites every commit (affects saved checkpoints/rollback history) and must be run as a separate background task; only worth it if you want the history genuinely cleaned.
  - **Note:** an earlier post-build "strip keys" script (`scripts/strip-preview-keys.mjs`) was tried and **removed** — it ran after `next build`, but the scan happens before the build, so it never helped. The deployment build command is back to `npx prisma generate && npx next build`.
  - **Chosen resolution (DONE):** the user opted for the permanent fix and scrubbed `.next` from the entire git history themselves via the Replit **Shell** (`git filter-branch … --index-filter 'git rm -rf --cached --ignore-unmatch .next' … -- --all`), since destructive git is blocked for the agent. Result: commit count dropped (2866 → 2654), `.next` is gone from all history, and a full-history **gitleaks** scan now reports **no leaks**. The only remaining `previewModeSigningKey` text is the literal term in these notes/memory (prose, not a secret — not flagged). Publishing should now pass the security scan with the block left ON; just retry Publish. Checkpoints/rollback history were reset by the rewrite (GitHub at `heyinterspace/samir.xyz` holds the backup).
- **`.replit` schema validation note**: The publish UI may report "Unable to validate dotreplit schema". This is caused by two legacy entries in `.replit` — a `[commands]` section and a `[run]` table (which makes `run` a table; the schema expects a top-level `run` string). Agents are blocked from editing `.replit`, so these need to be removed manually: delete the `[commands]`/`start` lines and replace the `[run]` table with a single top-level `run = "node index.js"` line near the top of the file.
- **Investment Status Updates**:
  - Marked Moku as a bust (new "Bust" status); busted companies are now excluded from the portfolio gallery by status in `/api/portfolio` (in addition to the existing name-based exclusion)
  - Marked Rely, Percents, Replit, Keep, and Instaswitch as Markups
  - Updated portfolio metrics to reflect the changes: Markups 16 → 21, Busts 8 → 9 (in both `app/api/metrics/route.ts` and `app/lib/static-metrics.ts`)
- **Homepage Bio**: Updated to reflect that Samir is no longer at Block — now "over-engineering something new" while keeping Block (and prior roles) as past credentials
- **New Ventures Added** (Verse, Spacebase, Orbit):
  - Added to the `Venture` table and to the active-ventures allowlist in `app/api/ventures-detailed/route.ts`
  - Verse (https://verse.audio) and Spacebase (https://spacebase.nyc) are live; Orbit has no public URL yet and uses the "Pre-launch" launching-soon drawer
  - Generated clean wordmark PNG logos (`public/attached_assets/{verse,spacebase,orbit}.png`) for visual consistency (PNG, since Next.js Image blocks SVG by default)

## Recent Changes (2025-07-27)

- **TypeScript Compilation Fixes**: Fixed deployment error by adding proper type annotations for 'venture' and 'index' parameters in map function (ventures-grid-detailed.tsx line 55)
- **Animation Types Update**: Updated AnimationVariants interface to be compatible with Framer Motion's Variants type by adding index signature
- **Ventures Page Types**: Added proper TypeScript types for Venture interface including status property to resolve compilation errors
- **Build Success**: All TypeScript errors resolved, Next.js build now completes successfully with ✓ Linting and checking validity of types
- **Bio Update**: Updated role to "Global Strategic Partnerships Finance at Block" covering Cash App, Square, Tidal, and Proto ecosystems
- **Ventures Gallery Fix**: Fixed broken ventures display by copying logos to public/attached_assets folder
- **Venture Cards Styling**: Made venture cards square (aspect-square) distinct from rectangular portfolio cards
- **Ventures Skeleton Loader**: Added neobrutalism.dev skeleton loading animation instead of text
- **Pre-launch Links**: Ventures with "Pre-launch" status now link to /launching-soon page (moonshot, omni, predictive, solo)
- **Database Category Consolidation**: Merged "Health" and "Retail" categories into "Commerce", moved Aura & Playbook to "SaaS"
- **Performance Optimization**: Fixed portfolio API slowness by removing excessive console.log statements (7x speed improvement: 1.3s → 0.18s)
- **Hover Effects Fixed**: Redesigned portfolio card hover behavior using inline styles for proper shadow alignment
- **Component Fixes**: Removed duplicate CardHeader declarations and invalid 'interactive' prop errors
- **Filter Button Styling**: Implemented proper neobrutalism.dev button styling with white text when active
- **Shadow Consistency**: Standardized 4px shadows with smooth transitions across all card types
- **Background Fix**: Set proper background color #332452 across the site
- **Code Quality Improvements**: Major refactoring to remove all !important CSS, eliminate inline styles, and create reusable design tokens
- **Design System**: Created centralized design tokens (`lib/constants/design-tokens.ts`) for colors, shadows, transitions, and breakpoints
- **Neobrutalist Utilities**: Built reusable neobrutalist component utilities (`lib/utils/neobrutalist.ts`) for consistent styling
- **CSS Cleanup**: Removed duplicate animations, !important declarations, and hard-coded values from globals.css
- **Component Refactoring**: Updated all card components to use utility classes instead of inline styles for better maintainability
- **Status Badge Fix**: Fixed Markup/Acquired badges to properly display purple (#7f54dc) and gray (#6b7280) backgrounds with white text
- **Hover Overlay Consistency**: Unified hover overlay effects across Portfolio and Ventures cards with consistent purple gradient
- **Metrics Update**: Updated portfolio metrics to reflect current state - Busts: 8, IRR: 13%, # Investments: 42
- **Portfolio Cleanup**: Removed The Food Company from gallery display as it's busted
- **Skeleton Loader Simplification**: Made portfolio loading skeletons cleaner and simpler like ventures page with subtle shimmer effects
- **Ventures Display Update**: Limited ventures display to only active ventures: 2DE, Interspace, TBH, and Moonshot (removed Solo, Omni, samir.xyz, and Predictive)

## Recent Changes (2025-08-13)

- **Logo Updates**:
  - Updated Replit logo with cleaner wordmark version
  - Updated Perplexity logo with official branding
  - Updated Fizz logo and adjusted size to be smaller within card
  - All logos maintain consistent 500x250 dimensions with proper scaling
- **Perplexity Status**: Added "Markup" status badge to Perplexity (shows purple badge)
- **Category Updates**: Moved Soot from SaaS to AI category
- **Portfolio Metrics**: 
  - Updated total investments from 44 to 42 (corrected for 2 double investments)
  - Updated markups count to 17 companies

## Recent Changes (2025-08-19)

- **Performance Optimization**: Fixed 15-20 second initial load time issue
  - Changed from development mode to production mode for serving the app
  - Removed unnecessary cache clearing on startup
  - Created optimized startup script that uses pre-built production build
  - App now loads in 2-3 seconds instead of 15-20 seconds
  - Production build is ~111MB and serves optimized, minified assets

## Recent Changes (2025-01-12)

- **Portfolio Update**: Removed Superplastic from portfolio (deal went bust)
- **Metrics Updates**: 
  - Changed # Busts from 7 to 8
  - Changed # Investments from 37 to 42 (added Perplexity, Replit, and Fizz, corrected for double investments)
  - Changed "Gross Multiple" label to "Gross MOIC" (1.7x)
  - Changed "Net Multiple" label to "Net MOIC" (1.5x)
  - Changed IRR from 13% to 12%
- **New Companies Added**:
  - **Perplexity**: AI-powered search engine valued at $18B (AI category)
  - **Replit**: AI-powered cloud development platform valued at $1.16B (AI category)
  - **Fizz**: Credit-building debit card for Gen Z students (Fintech category)
- **Database Logging**: Disabled query logging in Prisma to clean up console output
- **Total Investments**: Updated from 37 to 45

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15.3.1 with App Router
- **Language**: TypeScript for type safety with centralized type definitions
- **Styling**: Tailwind CSS with custom neobrutalism component system
  - Design tokens in `lib/constants/design-tokens.ts` (colors, shadows, transitions, breakpoints)
  - Neobrutalist utilities in `lib/utils/neobrutalist.ts` for consistent card and grid styling
  - CSS utility classes for reusable components (neobrutalist-shadow, status-badge, etc.)
- **Animations**: Framer Motion with centralized animation utilities
- **Font**: Alexandria Google Font for consistent typography
- **Component Library**: Reusable UI components with consistent API patterns

### Backend Architecture
- **Database**: Prisma ORM with PostgreSQL
- **API Routes**: Next.js API routes optimized for performance
- **Data Fetching**: TanStack React Query with centralized hooks and caching
- **Validation**: Zod for schema validation
- **Error Handling**: Comprehensive error boundaries and fallback states

### Code Organization
- **`/lib`**: Core utilities, types, constants, and custom hooks
- **`/components/ui`**: Reusable UI component library
- **`/components/portfolio`**: Portfolio-specific components
- **`/components/ventures`**: Venture-specific components
- **`/app`**: Next.js app router pages and layouts

### Key Components

#### Core Pages
- **Home Page**: Profile section with professional introduction
- **Portfolio Page**: Filterable grid of portfolio companies with categories
- **Ventures Page**: Showcase of personal ventures and projects

#### Reusable Components
- **Navigation**: Fixed header with logo and navigation links
- **Footer**: Site footer with version information
- **Company Cards**: Display portfolio companies with logos, descriptions, and categories
- **Filter System**: Category-based filtering for portfolio items

#### Database Schema
- **Portfolio Table**: Companies with name, description, category, logoUrl, website
- **Category Table**: Portfolio categories with display order
- **Tag Table**: Tagging system for portfolio items
- **Venture Table**: Personal ventures and projects

## Data Flow

1. **Database Layer**: Prisma client connects to PostgreSQL database
2. **API Layer**: Next.js API routes serve data to frontend
3. **Client State**: React Query manages client-side data caching and synchronization
4. **Component Layer**: React components consume data through hooks
5. **UI Layer**: Tailwind CSS classes provide consistent styling

## External Dependencies

### Core Dependencies
- **@prisma/client**: Database ORM client
- **@tanstack/react-query**: Data fetching and state management
- **framer-motion**: Animation library
- **lucide-react**: Icon library
- **class-variance-authority**: Utility for component variants
- **clsx & tailwind-merge**: CSS class management utilities

### Development Tools
- **TypeScript**: Type checking and development experience
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## Deployment Strategy

### Replit Configuration
- **Entry Point**: `index.js` serves as the main entry point for Replit
- **Start Script**: `start.sh` handles environment setup and server startup
- **Port**: Application runs on port 3000 by default
- **Environment**: Development mode with hot reloading

### Build Process
- Next.js handles static generation and server-side rendering
- Prisma generates database client during build
- Tailwind CSS compiles utility classes
- TypeScript compiles to JavaScript

### Asset Management
- Static assets stored in `public/` directory
- Company logos in `attached_assets/` directory
- Favicon and icons configured in layout
- Images optimized through Next.js Image component

### Database Setup
- Prisma schema defines database structure
- Migration scripts in `scripts/` directory
- Seed data for portfolio companies and categories
- Database connection configured through environment variables

### Error Handling
- Global error boundary for React errors
- Loading states for async operations
- Fallback UI for failed requests
- Console error logging for debugging

The application follows a clean architecture pattern with clear separation of concerns, making it easy to maintain and extend. The codebase emphasizes performance, accessibility, and user experience while maintaining developer productivity.