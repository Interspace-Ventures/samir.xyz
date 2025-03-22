// This file is a TypeScript placeholder for backward compatibility
// The actual polyfill implementation has been moved to src/lib/polyfills.ts
// This file is kept to avoid breaking existing imports

// Apply polyfills from the library
import polyfills, { TextEncoderStreamPolyfill, TextDecoderStreamPolyfill } from './lib/polyfills';

// Make sure polyfills are applied
console.log('Main polyfills file loaded and applied');

// Re-export for compatibility
export {
  TextEncoderStreamPolyfill,
  TextDecoderStreamPolyfill
};

// Default export
export default polyfills;