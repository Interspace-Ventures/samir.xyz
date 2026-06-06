---
name: Two component directories (half-migrated)
description: This repo has both app/components and components; which is canonical.
---

The repo was partially migrated and has TWO component trees. Much of the older
`app/components/` tree was dead (unreferenced by any live page) and was removed.

Canonical/live wiring:
- `components/` holds the current shared UI (`components/ui/*`,
  `components/portfolio/portfolio-grid`).
- `app/components/` still holds a few live pieces actually imported by pages
  (e.g. metrics summary, metric-card, navigation, footer, changelog-drawer,
  advisory/*). Confirm with grep before assuming a file there is used.
- `app/ventures/page.tsx` is self-contained and fetches `/api/ventures-detailed`.

**How to apply:** before deleting or editing anything in `app/components/`,
grep for its import to confirm it is actually reachable from a page in `app/`.
Prefer adding new shared UI under `components/`.
