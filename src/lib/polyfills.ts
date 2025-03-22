/**
 * Consolidated polyfills for Bun compatibility with Next.js
 * This file provides TextEncoderStream and TextDecoderStream polyfills
 * needed for Next.js Edge Runtime compatibility with Bun
 */

// Define our polyfill classes
export class TextEncoderStreamPolyfill {
  private encoder: TextEncoder;

  constructor() {
    this.encoder = new TextEncoder();
  }
  start() {}
  transform(chunk: string, controller: TransformStreamDefaultController<Uint8Array>) {
    if (controller && typeof controller.enqueue === 'function') {
      controller.enqueue(this.encoder.encode(chunk));
    }
  }
  flush() {}
}

export class TextDecoderStreamPolyfill {
  private decoder: TextDecoder;

  constructor(label?: string) {
    this.decoder = new TextDecoder(label);
  }
  start() {}
  transform(chunk: Uint8Array, controller: TransformStreamDefaultController<string>) {
    if (controller && typeof controller.enqueue === 'function') {
      controller.enqueue(this.decoder.decode(chunk, { stream: true }));
    }
  }
  flush(controller: TransformStreamDefaultController<string>) {
    if (controller && typeof controller.enqueue === 'function') {
      controller.enqueue(this.decoder.decode());
    }
  }
}

// Apply polyfills to global scope
function applyPolyfills() {
  // Check if we're in a browser or Node.js environment
  const isServer = typeof window === 'undefined';

  // Safely add our polyfills to the global scope
  if (typeof globalThis.TextEncoderStream === 'undefined') {
    (globalThis as any).TextEncoderStream = TextEncoderStreamPolyfill;
    if (isServer) console.log("Added TextEncoderStream polyfill");
  }
  
  if (typeof globalThis.TextDecoderStream === 'undefined') {
    (globalThis as any).TextDecoderStream = TextDecoderStreamPolyfill;
    if (isServer) console.log("Added TextDecoderStream polyfill");
  }

  // Add extra protection to ensure Edge Runtime primitives won't break us
  if (typeof process !== 'undefined' && typeof process.env !== 'undefined') {
    process.env.NEXT_RUNTIME = "nodejs";
  }
  
  return {
    TextEncoderStream: globalThis.TextEncoderStream || TextEncoderStreamPolyfill,
    TextDecoderStream: globalThis.TextDecoderStream || TextDecoderStreamPolyfill
  };
}

// Apply polyfills immediately
const polyfills = applyPolyfills();

// Export both individual classes and default export
export default polyfills;