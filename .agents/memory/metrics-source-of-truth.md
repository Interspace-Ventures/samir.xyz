---
name: Portfolio metrics source of truth
description: Where the curated headline metrics live and what is DB-derived vs hardcoded.
---

The headline portfolio figures (TVPI, gross/net MOIC, IRR, total investments,
markups, busts) are curated business numbers that cannot be derived from the
database. They live in ONE place: `app/lib/static-metrics.ts`.

- The frontend imports `staticMetrics` for instant render.
- `app/api/metrics/route.ts` spreads `staticMetrics` and only the `acquisitions`
  count is derived live from the DB (prisma count of status in Acquired/Exited).

**Why:** these values were previously duplicated (hardcoded both in the metrics
API route and in static-metrics), so they drifted. Keeping them in one module
means an update happens once.

**How to apply:** to change a headline number, edit `app/lib/static-metrics.ts`
only. Do NOT re-add hardcoded metric values to the metrics API route.
