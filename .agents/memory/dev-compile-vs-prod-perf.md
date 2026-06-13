---
name: Dev-compile vs production page-load perf
description: Why some pages "take a while to load" in the Replit preview but are fast in production
---

Reported slow page loads on this Next.js (App Router, Turbopack) site are almost
always Next.js **dev-mode on-demand route compilation**, not a real runtime
problem.

**Symptoms:** first visit to a route in the preview is slow (e.g. /portfolio
~2.3s, application-code time), every subsequent hit is fast (~70-250ms). Logs
show the cost in `application-code`/`next.js compile`, and a second curl to the
same path is fast.

**Reality:** warm dev requests are ~70-250ms; DB queries (Prisma + Neon) are
~70-140ms; production (samir.xyz) serves pages in ~145ms. The published site is
fast.

**How to apply:** before optimizing, measure twice. Hit each page/route a second
time (`curl -w '%{time_total}'`) and also curl production directly. If only the
first hit is slow, it is dev compilation. Don't refactor data fetching to chase a
dev-only artifact. If production is genuinely slow, gather real-user metrics
(Web Vitals / route timing) instead.
