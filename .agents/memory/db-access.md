---
name: Querying the database
description: How to read/write the Postgres data in this repl from the agent.
---

`npx prisma db execute --stdin` runs SQL but only prints "Script executed successfully"
— it does NOT return rows. To inspect or mutate data, write a short Node ESM script that
imports `PrismaClient` and run it **from the project root** (so `@prisma/client` resolves);
running from `/tmp` fails with `ERR_MODULE_NOT_FOUND`.

**How to apply:** create e.g. `q.mjs` in the repo, `node ./q.mjs`, then delete it.
Models: `Portfolio` (investment_status: 'Markup' | 'Acquired' | 'Active' | 'Bust' | null),
`Venture` (status: 'Pre-launch' | null). The logo column is mapped `logoUrl @map("logo-url")`.
