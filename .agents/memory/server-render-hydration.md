---
name: Server-render + React Query hydration for page data
description: How /portfolio, /portfolio-metrics, /ventures avoid the first-visit loading flash.
---

The neobrutalist pages used to be client components that fetched their data from API
routes on mount, which showed a skeleton/spinner for ~half a second on the first visit
to each tab. The fix: fetch the data on the server so it is already in the HTML.

**Pattern (the durable decision):**
- All Prisma reads for these pages live in ONE shared module `app/lib/server-data.ts`
  (`getVisiblePortfolio`, `getCategories`, `getActiveVentures`). Both the server pages
  AND the API routes import from it, so server-rendered HTML and client API responses
  are guaranteed identically shaped.
- React Query pages (`/portfolio`, `/portfolio-metrics`): the `page.tsx` is an async
  server component that `prefetchQuery` into a fresh `QueryClient`, then wraps a `'use
  client'` content component in `<HydrationBoundary state={dehydrate(qc)}>`. The client
  hooks reuse the SAME query keys (`['portfolio']`, `['categories']`) so they read
  hydrated data instead of refetching.
- Plain-fetch page (`/ventures`): the `page.tsx` server-fetches and passes data as a
  prop to a `'use client'` content component (no React Query there).

**Why:** moving the fetch to the server removes the client round-trip on first paint.
The flash only appeared when `isLoading` was true (no data yet); with hydrated/prop data
it is false on first render, so the skeleton never shows.

**How to apply / gotchas:**
- The prefetch query key MUST exactly match the client hook's key, or hydration misses
  and it refetches (flash returns). Keys are currently string literals, not centralized.
- Hydration relies on the client QueryClient default `staleTime` (5 min in
  `app/providers.tsx`) so hydrated data is treated as fresh and not refetched on mount.
- Date fields serialize to ISO strings across the RSC/dehydrate boundary; UI always
  wraps them in `new Date(...)`, which tolerates both Date and string. Keep it that way.
- Prisma `Float?`/`DateTime?`/`String` fields are RSC-serializable; a `Decimal` field
  would break dehydrate/prop-passing, so avoid Decimal in these models.
