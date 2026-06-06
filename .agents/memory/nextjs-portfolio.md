---
name: samir.xyz Next.js upgrade quirks
description: Durable gotchas for upgrading/maintaining the samir.xyz Next.js portfolio
---

## Next.js bundled-postcss audit noise
`npm audit` reports moderate vulns inside Next.js's *own* bundled `postcss` (e.g. 8.4.31 under `node_modules/next/node_modules/postcss`). npm's only offered "fix" is downgrading Next to v9 — absurd. Even the latest Next ships it. Treat as an unavoidable, build-tooling-only residual; do not chase it.
**Why:** wasted effort otherwise — it is Next-internal and not runtime-exposed for this static site.
**How to apply:** when auditing, confirm the path is `next/node_modules/...`; if so, accept and document rather than `audit fix --force`.

## framer-motion v12 stricter types
v12.40 tightened animation types — a custom `AnimationVariants` interface no longer satisfies motion props. Use framer-motion's own `Variants` type in `lib/utils/animations.ts` (and cast generated variants `as Variants` if needed).

## Next 16 config
`images.domains` was removed in Next 16 — use `images.remotePatterns` only if remote image URLs exist. This repo's logos are all local under `public/`, and DB `logo-url` values are all relative, so no remotePatterns are needed.

## Held major upgrades (deliberate)
Prisma 7 and Tailwind 4 are intentionally deferred — both are large migrations (ORM/runtime/config; CSS-first config rewrite) that risk destabilizing the working app/neobrutalist design. Do them as separate focused efforts, not bundled into a general refresh.
