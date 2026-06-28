---
name: Ventures active allowlists
description: Which ventures render is gated by hardcoded name allowlists, not the DB alone.
---

Adding a row to the `Venture` table is NOT enough to make it show. Which ventures render
is gated by hardcoded name allowlists kept in TWO places: the shared server-data module
(`ACTIVE_VENTURES`) and the legacy `ventures-minimal` API route (`activeVentures`). They
must stay in sync; grep `activeVentures`/`ACTIVE_VENTURES` to find both.

**Why:** the list is curated independently of the DB, so stale entries drift (one used
lowercase names and a since-deleted "tbh").

**How to apply:** when adding/removing a venture, update BOTH allowlists (names must match
the DB exactly, case-sensitive). Busted/hidden portfolio companies are excluded by the same
shared module.

**Venture logo recipe:** cards are white `aspect-square` with `object-cover`, so logos must
be full-bleed squares (their own background fills the square edge to edge). To make one from
a live site's brand mark, take its `favicon.svg`, swap the rounded `rect` for a plain
full-bleed `rect` (drop `rx`), then render to a 500x500 PNG with `sharp` into
`public/attached_assets/`. Rounded/transparent corners would otherwise show the white card.
