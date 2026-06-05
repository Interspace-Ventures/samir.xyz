---
name: Deploy security scan blocks on Next.js preview keys committed in git history
description: Why a Next.js publish fails right after "Security Scan Complete" and the safe (non-destructive) way to unblock it
---

# Deploy fails at the security-scan step (Next.js)

**Symptom:** A publish build fails. The build logs show only `Deployment` → `Build` → `Running Security Scan` → `Security Scan Complete`, then status `failed` — no `next build` / compilation output at all.

**The scan runs BEFORE the build, on the SOURCE (including git history).** Proven by:
- The failed build's logs contain *no* compile output — only the 4 scan lines, ~40s, then fail. If the scan read build output, `next build` would have run first and produced logs. It didn't. So the scan gates the build and inspects source.
- The working tree / HEAD is clean (`.next` is gitignored and untracked), yet the scan still fails. The only place the flagged strings exist is **git history** (old commits that committed `.next/prerender-manifest.json`). Confirmed with a local gitleaks run: a single historical commit on that file yields 2 `generic-api-key` leaks (`previewModeSigningKey` / `previewModeEncryptionKey`).
- These are NOT real secrets — Next.js regenerates them on every `next build`. They're false positives.
- Many Next.js apps deploy fine on Replit precisely because they never committed `.next`. This repo did (the original mistake), so gitleaks-over-history finds them.

**Why "tightened over time":** older builds (pre-2026) passed with the same committed keys because the deploy security-scan phase was added/enabled later.

**What does NOT fix it:**
- A post-build strip step (e.g. blanking the keys after `next build`). The scan runs *before* the build, so a post-build script never executes in time. (An earlier attempt added `scripts/strip-preview-keys.mjs` + a build-command suffix — both reverted as useless.)
- Removing `.next` from the working tree / HEAD alone — history still holds the keys.

**Fix that works (recommended, safe, non-destructive):** these are false positives, so let publishing proceed past them. Per Replit docs, either:
- Turn OFF "Block publishing of critical vulnerabilities" in the deployment's **Advanced** settings (Publishing tool), or
- Review and **dismiss** the finding in the **Project Security Center**, then publish.
This is a **UI action by the user** — `deployConfig` has no parameter for it (like deployment geography, it's UI-only).

**Permanent root-cause fix (heavier, destructive):** scrub `.next` from git history so the scanner never sees the keys. This rewrites every commit SHA (affects saved checkpoints/rollback) and the main agent is blocked from destructive git — it must run as a separate background Project Task in an isolated env. Only do this if the user wants the history genuinely cleaned; for just unblocking a publish, the UI toggle above is enough.

**Diagnostic trick:** gitleaks isn't installed, but you can `curl` the static linux binary from its GitHub releases into `/tmp` and run it. `gitleaks detect --source . --no-git` scans the working tree (fast); `--log-opts="-1 <sha> -- <path>"` scans a single historical commit. A full-history scan over hundreds of commits will exceed the 2-min bash timeout.

**`.replit` schema gotcha (separate issue seen here):** legacy `[commands]` and a `[run]` *table* (TOML `[run]` makes `run` a table; schema wants a top-level string) cause "Unable to validate dotreplit schema" in the publish UI even though `deployConfig`/`getDeploymentInfo` still succeed (they only validate `[deployment]`). `.replit` cannot be edited by any agent (write/edit both blocked) and no tool owns `[commands]` — the user must remove those lines manually.
