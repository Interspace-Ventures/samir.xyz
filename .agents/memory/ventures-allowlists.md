---
name: Ventures active allowlists
description: Which ventures render is gated by hardcoded name allowlists, not the DB alone.
---

Adding a row to the `Venture` table is NOT enough to make it show. The live `/ventures`
page and `/api/ventures-detailed` now share ONE allowlist via `getActiveVentures()` in
`app/lib/server-data.ts`. But the legacy routes `app/api/ventures/route.ts` and
`app/api/ventures-minimal/route.ts` (used by `ventures-grid`, `ventures-grid-minimal`,
and `/ventures-new`) STILL hardcode their own separate `activeVentures` arrays.

**Why:** the list is curated independently of the DB, so stale entries drift (one used
lowercase names and a since-deleted "tbh").

**How to apply:** when adding/removing a venture, update `getActiveVentures()` in
`app/lib/server-data.ts` (covers the live page + detailed API) AND the two legacy routes
(names must match the DB exactly, case-sensitive). Busted/hidden portfolio companies are
likewise excluded centrally in `getVisiblePortfolio()` in the same shared module.
