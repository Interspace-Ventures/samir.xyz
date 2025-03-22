// Polyfill for TextEncoderStream and TextDecoderStream when running in Bun
// Define and immediately apply polyfills for Stream API components

// TextEncoderStream polyfill
if (typeof globalThis.TextEncoderStream === 'undefined') {
  console.log("Polyfilling TextEncoderStream for Bun environment");
  class TextEncoderStreamPolyfill {
    private encoder: TextEncoder;

    constructor() {
      this.encoder = new TextEncoder();
    }

    start() { }

    transform(chunk: string, controller: any) {
      controller.enqueue(this.encoder.encode(chunk));
    }

    flush() { }
  }

  // @ts-ignore - Polyfill global
  globalThis.TextEncoderStream = TextEncoderStreamPolyfill;
  // Also add it to the window if available (client-side)
  if (typeof window !== 'undefined') {
    // @ts-ignore - Polyfill window
    window.TextEncoderStream = TextEncoderStreamPolyfill;
  }
}

// TextDecoderStream polyfill
if (typeof globalThis.TextDecoderStream === 'undefined') {
  console.log("Polyfilling TextDecoderStream for Bun environment");
  class TextDecoderStreamPolyfill {
    private decoder: TextDecoder;

    constructor(label?: string, options?: TextDecoderOptions) {
      this.decoder = new TextDecoder(label, options);
    }

    start() { }

    transform(chunk: Uint8Array, controller: any) {
      controller.enqueue(this.decoder.decode(chunk, { stream: true }));
    }

    flush(controller: any) {
      const final = this.decoder.decode(undefined, { stream: false });
      if (final) {
        controller.enqueue(final);
      }
    }
  }

  // @ts-ignore - Polyfill global
  globalThis.TextDecoderStream = TextDecoderStreamPolyfill;
  // Also add it to the window if available (client-side)
  if (typeof window !== 'undefined') {
    // @ts-ignore - Polyfill window
    window.TextDecoderStream = TextDecoderStreamPolyfill;
  }
}

// Direct global assignment for Next.js
// This ensures the polyfill is available to Next.js internals
if (typeof globalThis !== 'undefined') {
  if (!globalThis.TextEncoderStream) {
    // @ts-ignore - Force define the global
    globalThis.TextEncoderStream = globalThis.TextEncoderStream || class {
      constructor() {
        console.log('Using bare TextEncoderStream polyfill');
      }
      start() {}
      transform() {}
      flush() {}
    };
  }
  
  if (!globalThis.TextDecoderStream) {
    // @ts-ignore - Force define the global
    globalThis.TextDecoderStream = globalThis.TextDecoderStream || class {
      constructor() {
        console.log('Using bare TextDecoderStream polyfill');
      }
      start() {}
      transform() {}
      flush() {}
    };
  }
}

// No CommonJS require in ESM
// Use ESM export
export {
  // Export explicitly to ensure the file is not tree-shaken away
};