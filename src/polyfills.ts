// Polyfill for TextEncoderStream when running in Bun
if (typeof globalThis.TextEncoderStream === 'undefined') {
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
}

// Ensure TextEncoder is available
if (typeof globalThis.TextEncoder === 'undefined') {
  const util = require('util');
  // @ts-ignore - Polyfill global
  globalThis.TextEncoder = util.TextEncoder;
}

export {};