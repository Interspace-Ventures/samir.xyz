// Global polyfills for TextEncoderStream and TextDecoderStream
if (typeof globalThis.TextEncoderStream === 'undefined') {
  class TextEncoderStreamPolyfill {
    constructor() {
      this.encoder = new TextEncoder();
    }
    start() {}
    transform(chunk, controller) {
      controller.enqueue(this.encoder.encode(chunk));
    }
    flush() {}
  }
  
  globalThis.TextEncoderStream = TextEncoderStreamPolyfill;
}

if (typeof globalThis.TextDecoderStream === 'undefined') {
  class TextDecoderStreamPolyfill {
    constructor(label) {
      this.decoder = new TextDecoder(label);
    }
    start() {}
    transform(chunk, controller) {
      controller.enqueue(this.decoder.decode(chunk, { stream: true }));
    }
    flush(controller) {
      controller.enqueue(this.decoder.decode());
    }
  }
  
  globalThis.TextDecoderStream = TextDecoderStreamPolyfill;
}

console.log("Global polyfills for TextEncoderStream and TextDecoderStream applied");