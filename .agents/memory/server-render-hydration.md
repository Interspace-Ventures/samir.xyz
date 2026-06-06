---
name: Server-render + React Query hydration for page data
description: Why the main pages fetch on the server, and the gotchas that keep the loading flash gone.
---

**Decision:** the data-driven pages render their data on the server (in an async
`page.tsx`) instead of fetching client-side on mount. The shared Prisma reads live in
one module that both the server pages and the API routes import, so server HTML and
client API responses can never drift in shape.

**Why:** client-only fetching showed a skeleton for ~half a second on the first visit
to each tab. With the data already in the HTML, the loading state is never `true` on
first render, so no flash.

**How to apply / gotchas (the non-obvious parts):**
- For React Query pages, the server prefetch query key MUST exactly match the client
  hook's key, or hydration misses and it refetches (flash returns). Keys are plain
  string literals today, not centralized, so this is easy to break.
- Hydration depends on the client QueryClient default `staleTime` (5 min) treating the
  hydrated data as fresh; lowering it would reintroduce an on-mount refetch.
- Dates cross the dehydrate/RSC boundary as ISO strings, so UI must wrap them in
  `new Date(...)` (tolerates both Date and string). A Prisma `Decimal` field would
  break dehydrate/prop serialization entirely; keep these models Float/Date/String.
