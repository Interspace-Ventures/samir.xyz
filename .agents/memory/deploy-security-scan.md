---
name: Deploy security scan blocks on committed build artifacts
description: Why publish fails right after "Security Scan Complete" and how committed .next caused it
---

# Deploy fails at the security-scan step

**Symptom:** A publish build fails. The build logs show only `Deployment` → `Build` → `Running Security Scan` → `Security Scan Complete`, then status `failed` — no compilation errors.

**Cause:** Replit's deploy security scan reads the committed source tree. If Next.js build output (`.next/`) is committed, `.next/prerender-manifest.json` contains auto-generated `previewModeSigningKey` / `previewModeEncryptionKey`. Gitleaks flags these as HIGH "generic-api-key" secrets and blocks the publish. These keys are NOT real secrets — Next.js regenerates them on every build.

**Why earlier builds passed:** `.next` was not committed back then. The deploy regenerates `.next` during its own build, but the scan does not flag the freshly-built output — only committed source files. So the difference between pass/fail was purely that `.next` got committed.

**Fix:** Stop tracking `.next`. It's already in `.gitignore`, but files committed before the ignore rule stay tracked.
- Remove from working tree (`rm -rf .next`) and let the end-of-task checkpoint commit the deletions, OR untrack via git.
- **Gotcha:** `.gitignore` does NOT apply to already-tracked paths. If `next build`/`next dev` regenerates `.next` BEFORE the deletion is committed, git sees the tracked files as modified and resurrects them. So commit the removal before any rebuild. (App workflow being stopped helps avoid this race.)

**How to diagnose:** `getDeploymentBuild()` logs end at the scan step; run `runSastScan()` locally and look for gitleaks generic-api-key findings under `.next/`. Confirm with `git ls-files .next`.
