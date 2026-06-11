---
name: Fixed bottom bar + global footer clearance
description: Why an always-visible bottom bar must be position:fixed (not sticky) and how to stop it covering the global footer.
---

A persistent "always visible" bottom bar (e.g. the advisory logo marquee) must be
`position: fixed`. `position: sticky; bottom-0` does NOT work for this when the
element is the LAST child of its container: sticky-bottom only pins while there is
container content below the element's resting spot, so with nothing below it the
bar just settles at the page bottom and is only seen when fully scrolled.

**Problem with fixed:** a viewport-fixed bar overlays the bottom of the page,
including the global footer (footer lives in `app/layout.tsx`, outside the page's
padded wrapper, so page-level `pb-*` does not clear it).

**Fix:** while the page is mounted, reserve matching space at the document bottom
by setting `document.body.style.paddingBottom` to the bar's measured
`offsetHeight` (use a ref + ResizeObserver, clear it on unmount). Body padding is
appended after ALL content including the footer, so when fully scrolled the footer
sits just above the bar instead of behind it.

**Why:** page-wrapper padding cannot push the global footer because the footer is a
sibling of the page content, not a child. Body-level padding is the only spot that
adds space after the footer.
