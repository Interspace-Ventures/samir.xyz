---
name: Ventures active allowlists
description: Which ventures render is gated by hardcoded name allowlists, not the DB alone.
---

Adding a row to the `Venture` table is NOT enough to make it show. Which ventures render
is gated by hardcoded name allowlists. The live page's allowlist is now centralized in
the shared server-data module, but a couple of legacy ventures API routes STILL keep
their own separate copies, so the list is not yet single-sourced.

**Why:** the list is curated independently of the DB, so stale entries drift (one used
lowercase names and a since-deleted "tbh").

**How to apply:** when adding/removing a venture, update the centralized allowlist in the
shared server-data module AND the remaining legacy ventures routes (names must match the
DB exactly, case-sensitive). Busted/hidden portfolio companies are excluded by the same
shared module. Grep for `activeVentures` to find every copy before assuming one is canonical.
