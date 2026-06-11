---
name: Navbar / body width alignment
description: Why the navbar must be a sticky in-flow header, not position:fixed + scrollbar-gutter, to stay aligned AND centered.
---

# Navbar / body content width alignment

The recurring "navbar width doesn't line up with the body / site looks off-center"
complaint comes from a `position: fixed` header being centered against the
**viewport** while the body content is centered in **normal flow**. Those two
references differ by the scrollbar width, so a fixed header and in-flow content
cannot both be centered and aligned at the same time without a hack.

**Rule:** make the top nav a `sticky top-0` header in normal flow (NOT
`position: fixed`), and set `overflow-x: clip` (NOT `hidden`) on `html, body`.

**Why:**
- `scrollbar-gutter: stable` on `html` *can* force a fixed header to align with
  content, but it permanently reserves a ~14px gutter on the right, shifting the
  whole centered layout ~7px left of true viewport center. With overlay
  scrollbars that gutter is invisible, so it just reads as "off-center / gap on
  the right." That is the thing users keep reporting as "not fixed."
- A `sticky` header is in normal flow, so it shares the exact same centered width
  reference as the body content in every scrollbar mode (classic, overlay). No
  gutter hack, no fixed-vs-flow offset.
- `overflow-x: hidden` computes `overflow-y` to `auto`, turning `html`/`body`
  into scroll containers, which breaks `sticky` (it sticks to the wrong
  ancestor). `overflow-x: clip` keeps the viewport as the scroll container while
  still preventing horizontal scroll.

**How to apply:**
- Verify alignment empirically with `getBoundingClientRect()` on the nav box and a
  page section's content (after its padding). When aligned and centered, both
  share the same left/right and their center equals `innerWidth / 2`.
- Because a sticky header takes flow space (no overlap), pages must NOT keep the
  large top padding that previously cleared a fixed header (here `pt-20`/`pt-16`
  were reduced to `pt-8`).
- Keep `scroll-mt-*` on in-page anchor targets so the stuck header doesn't clip
  them.
- The font-size is 18px on `html`, so Tailwind rem widths scale 1.125x
  (`max-w-4xl` = 1008px, `max-w-5xl` = 1152px) when reasoning about widths.
