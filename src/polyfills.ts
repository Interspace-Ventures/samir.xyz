// Polyfill for TextEncoderStream and TextDecoderStream when running in Bun
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
}

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
}

// Ensure TextEncoder is available
if (typeof globalThis.TextEncoder === 'undefined') {
  const util = require('util');
  // @ts-ignore - Polyfill global
  globalThis.TextEncoder = util.TextEncoder;
}

export {};