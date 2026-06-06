---
name: Portfolio visibility & NULL-status filter pitfall
description: How portfolio companies are shown/hidden on samir.xyz and the SQL NULL trap that hid many of them.
---

Portfolio companies live in the Postgres `Portfolio` table (Prisma). What shows on
the `/portfolio` page is whatever `GET /api/portfolio` returns. The only intended
exclusions are `investment_status = 'Bust'` and the name `'The Food Company'`.

**The trap:** the route used a SQL/Prisma `NOT: { investment_status: 'Bust' }`
clause. In SQL three-valued logic, for rows where `investment_status IS NULL`,
`NOT(NULL = 'Bust')` evaluates to NULL (not true), so those rows are **excluded**.
This silently hid every company added without a status set.

**Why:** many companies are inserted with a NULL `investment_status` (status is
optional). The SQL NOT filter dropped all of them — they existed in the DB and had
logos but never appeared on the site.

**How to apply:** do the bust/name exclusion in JS after `findMany`
(`item.investment_status !== 'Bust' && item.name !== 'The Food Company'`), or write
the SQL to explicitly keep NULLs. Never gate visibility purely on a SQL `NOT =`
against a nullable column. If a company "isn't showing up," check its status isn't
being NULL-dropped before assuming it's missing from the DB.

Note: logos in `public/logos/*.png` are black-on-transparent wordmarks (~500x250);
they look like solid black blocks in an image viewer that composites transparency
on black, but render correctly on the white cards. To add a B&W logo from a
colored/white source SVG: render high-res, `-channel RGB -fill black -colorize 100
+channel`, then `-trim +repage -resize <wxh> -background none -gravity center
-extent 500x250`.
