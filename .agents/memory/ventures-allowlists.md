---
name: Ventures active allowlists
description: Which ventures render is gated by hardcoded name allowlists, not the DB alone.
---

Adding a row to the `Venture` table is NOT enough to make it show. Three API routes each
hardcode an `activeVentures` name array that filters what they return:
`app/api/ventures-detailed/route.ts` (used by the live `/ventures` page),
`app/api/ventures/route.ts` and `app/api/ventures-minimal/route.ts` (used by
`ventures-grid`, `ventures-grid-minimal`, and the `/ventures-new` page).

**Why:** the list is curated independently of the DB, so stale entries drift (one used
lowercase names and a since-deleted "tbh").

**How to apply:** when adding/removing a venture, update the allowlist in all three routes
(names must match the DB exactly, case-sensitive). Busted portfolio companies are likewise
excluded in `app/api/portfolio/route.ts` by `investment_status: 'Bust'` (+ a name exclusion).
