/**
 * Feature flags
 *
 * Simple toggles for soft-launching unfinished sections. Flip a flag to `true`
 * once the section is ready. An optional public env var can override the default
 * without a code change (e.g. NEXT_PUBLIC_FEATURE_TESTIMONIALS=true).
 */

const envFlag = (value: string | undefined, fallback: boolean) =>
  value === undefined ? fallback : value === 'true';

// Advisory testimonials / endorsements section. Off until testimonials exist so
// the page does not show a blank section at soft launch.
export const FEATURE_TESTIMONIALS = envFlag(
  process.env.NEXT_PUBLIC_FEATURE_TESTIMONIALS,
  false
);

/**
 * Grouped flags. Kept deliberately simple (plain booleans) so they are easy to
 * toggle while a design is still being worked out.
 */
export const featureFlags = {
  // Footer is hidden for now while the design is still being figured out.
  showFooter: false,
} as const;
