---
name: Structured Liquidity (structured.glass) theme
description: How the liquid-glass surface layer is applied site-wide and the conventions for adding new surfaces.
---

The site follows the "Structured Liquidity" design language from structured.glass
(Samir's own open design system). It pairs rigid containment (sharp 0-radius
corners, 2-3px black borders, flat offset shadows) with a liquid-glass material
(translucent fill + backdrop blur + saturation + specular top highlight).

The rigid-containment half already existed (neobrutalism). The glass material is
layered on top via `--sl-glass-*` tokens in `app/globals.css`.

**Convention for surfaces:**
- A new dark UI panel should use the `bg-[#2a313a]` class. A global override in
  `globals.css` turns that one arbitrary utility (and `bg-[#242a31]`) into glass,
  so every panel stays consistent without per-component styling.
- An overlay/menu that must fully hide what's behind it (fullscreen mobile menu,
  floating dropdowns) must add the `.sl-solid` class alongside `bg-[#2a313a]` to
  opt back out to an opaque surface. Without it, the overlay goes translucent and
  content bleeds through.

**Why:** keeps the whole site on one material with a single lever, and avoids the
readability regression glass causes on overlays.

**Accent decision:** kept the established brand purple `#7f54dc`/`#7f55dc` as the
single accent rather than adopting structured.glass's default `#a388ee`. The "one
accent" principle is satisfied by the existing brand color; don't reintroduce a
second accent.
