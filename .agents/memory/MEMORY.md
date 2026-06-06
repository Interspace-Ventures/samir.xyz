- [Run/workflow service quirk](run-workflow-quirk.md) — agent restart/configureWorkflow can fail with RUN_COMMAND_NOT_FOUND; user's Run button still works, bash can't keep a server alive.
- [Querying the database](db-access.md) — `prisma db execute` returns no rows; run a Node script with PrismaClient, or use the `executeSql` code-execution callback (works for SELECT/UPDATE/INSERT).
- [Portfolio visibility filter](portfolio-visibility-filter.md) — `/api/portfolio` hides companies via SQL `NOT investment_status='Bust'`, which also drops NULL-status rows; filter in JS instead. Includes B&W logo recipe.
- [Ventures active allowlists](ventures-allowlists.md) — which ventures show is controlled by hardcoded allowlists across three API routes, not just the DB.
- [Deploy security scan](deploy-security-scan.md) — Next.js publish fails at "Security Scan Complete" = gitleaks (pre-build) flags preview keys committed in git history; safe fix = turn off "Block publishing of critical vulnerabilities"/dismiss in Security Center (UI), not a post-build strip.

- [Next.js portfolio quirks](nextjs-portfolio.md) — bundled-postcss audit noise, framer-motion v12 Variants, Next 16 images.domains removal, why Prisma 7 / Tailwind 4 are held.
- [Metrics source of truth](metrics-source-of-truth.md) — curated headline figures live only in app/lib/static-metrics.ts; metrics API spreads it and derives only acquisitions live. Don't re-hardcode.
- [Two component dirs](component-dirs.md) — repo half-migrated; both app/components and components exist. Grep for imports before deleting/editing anything in app/components.
