---
name: Run/workflow service quirk
description: This repl's agent-side workflow tooling can fail to (re)start the app; how to cope.
---

In this Next.js portfolio repl, the agent-side workflow controls (`restart_workflow`,
and the skill's `configureWorkflow`/`restartWorkflow`/`listWorkflows`) can fail with
`RUN_COMMAND_NOT_FOUND` ("run command ... doesn't exist in config"). `listWorkflows()`
returns `[]` even though `.replit` defines a `[[workflows.workflow]]` named "Run".

**Why:** `.replit` carries a legacy `[run]` table (`run = "node index.js"`) plus
`[commands]` alongside the modern `[workflows]` block. Direct edits to `.replit` are
blocked ("Direct edits to .replit ... are not allowed"), so the agent can't reconcile it.

**How to apply:**
- Don't burn many turns retrying the workflow tools — they fail consistently this session.
- The bash sandbox kills any backgrounded server (even `setsid`/`nohup`/`disown`) when the
  call ends (exit 143), so you cannot keep a dev server alive from bash for screenshots.
- The user's **Run** button uses a different code path and does start the app. After
  server-side changes, ask the user to click Run (or restart the Repl) to see them.
- Verify code instead with `npx tsc --noEmit -p tsconfig.json` since you can't run it.
