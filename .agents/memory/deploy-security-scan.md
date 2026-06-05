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

**Two ways to fix it:**

1. **Non-destructive (quick unblock):** these are false positives, so let publishing proceed past them — turn OFF "Block publishing of critical vulnerabilities" in the deployment's **Advanced** settings, or **dismiss** the finding in the **Project Security Center**, then publish. This is a **UI action by the user** — `deployConfig` has no parameter for it.

2. **Permanent root-cause fix (destructive — scrub history):** rewrite history to drop `.next` from every commit so the scanner never sees the keys. This changes every commit SHA (resets checkpoints/rollback). **The agent CANNOT do this** — destructive git (`filter-branch`, `filter-repo`, `rm`, `reset`, `commit`, …) is blocked for the main agent. The reliable path is to have the **user run it in the Replit Shell** (the Shell is NOT subject to the agent's git guard). Built-in command that needs no install:
   `git filter-branch --force --prune-empty --index-filter 'git rm -rf --cached --ignore-unmatch .next' --tag-name-filter cat -- --all`
   then clean refs/gc, then optionally `git push origin --force --all`. `git filter-repo` is faster but needs `python3`, which is NOT on PATH in this Node repl — so filter-branch is the dependable choice here.

**Verify the scrub:** `git log --all -- .next` and a full-history gitleaks run must come back clean. gitleaks full-history is fast (~4s for ~1200 diff-bearing commits), so just run `gitleaks detect --no-banner --redact` from the repo root — don't bother with single-commit `--log-opts`. After a successful scrub the only remaining `previewModeSigningKey` hits are the literal *term* in documentation prose (this file / replit.md / an old strip-script commit); gitleaks does NOT flag those (it keys on high-entropy values, not the word).

**Diagnostic trick:** gitleaks isn't installed — `curl` the static linux binary from its GitHub releases and run it. NOTE: `/tmp` gets wiped between turns here, so re-download it each session; long-running background builds also get SIGTERM'd (143), so prefer short foreground commands.

**`.replit` schema gotcha (separate issue seen here):** legacy `[commands]` and a `[run]` *table* (TOML `[run]` makes `run` a table; schema wants a top-level string) cause "Unable to validate dotreplit schema" in the publish UI even though `deployConfig`/`getDeploymentInfo` still succeed (they only validate `[deployment]`). `.replit` cannot be edited by any agent (write/edit both blocked) and no tool owns `[commands]` — the user must remove those lines manually.
