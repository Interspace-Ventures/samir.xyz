// Direct ES Module implementation of TextEncoderStream and TextDecoderStream polyfills
console.log("Applying Bun compatibility patches for Next.js...");

// Define our polyfill classes
class TextEncoderStreamPolyfill {
  constructor() {
    this.encoder = new TextEncoder();
  }
  start() {}
  transform(chunk, controller) {
    if (controller && typeof controller.enqueue === 'function') {
      controller.enqueue(this.encoder.encode(chunk));
    }
  }
  flush() {}
}

class TextDecoderStreamPolyfill {
  constructor(label) {
    this.decoder = new TextDecoder(label);
  }
  start() {}
  transform(chunk, controller) {
    if (controller && typeof controller.enqueue === 'function') {
      controller.enqueue(this.decoder.decode(chunk, { stream: true }));
    }
  }
  flush(controller) {
    if (controller && typeof controller.enqueue === 'function') {
      controller.enqueue(this.decoder.decode());
    }
  }
}

// Add our polyfills to the global scope
globalThis.TextEncoderStream = TextEncoderStreamPolyfill;
globalThis.TextDecoderStream = TextDecoderStreamPolyfill;

console.log("Added TextEncoderStream and TextDecoderStream polyfills to global scope");

// Add extra protection to ensure Edge Runtime primitives won't break us
process.env.NEXT_RUNTIME = "nodejs";

// Prevent loading of edge runtimes
const edgeRuntimeFallback = {
  EdgeRuntime: { name: "noop-edge-runtime" },
  TextEncoderStream: TextEncoderStreamPolyfill,
  TextDecoderStream: TextDecoderStreamPolyfill
};

// Path Rewriting for ESM - used in Next.js 
const originalResolve = URL.resolve;
if (originalResolve && typeof URL.resolve === 'function') {
  URL.resolve = function(base, path) {
    if (path.includes('@edge-runtime') || path.includes('edge-runtime')) {
      console.log(`Intercepted module resolution for Edge runtime: ${path}`);
      return base;
    }
    return originalResolve.call(this, base, path);
  };
}

console.log("Next.js Bun compatibility patches applied successfully");

// Export our polyfills for ESM compatibility
export default {
  TextEncoderStream: globalThis.TextEncoderStream,
  TextDecoderStream: globalThis.TextDecoderStream,
  EdgeRuntime: { name: "noop-edge-runtime" }
};