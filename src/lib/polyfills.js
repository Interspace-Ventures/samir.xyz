/**
 * Consolidated polyfills for Bun compatibility with Next.js
 * This file provides TextEncoderStream and TextDecoderStream polyfills
 * needed for Next.js Edge Runtime compatibility with Bun
 */

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

// Patch node modules if needed
export async function patchNodeModules() {
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    console.log("Patching Next.js node_modules for Bun compatibility...");
    
    // Define our polyfill code to inject
    const polyfillCode = `
    // Polyfill for TextEncoderStream and TextDecoderStream
    if (typeof globalThis.TextEncoderStream === 'undefined') {
      globalThis.TextEncoderStream = class TextEncoderStreamPolyfill {
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
      };
    }
    
    if (typeof globalThis.TextDecoderStream === 'undefined') {
      globalThis.TextDecoderStream = class TextDecoderStreamPolyfill {
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
      };
    }
    `;
    
    // Find and patch the problematic file in node_modules
    const nextDistDir = './node_modules/next/dist';
    const edgeRuntimePrimitives = path.join(nextDistDir, 'compiled/@edge-runtime/primitives/load.js');
    
    if (fs.existsSync(edgeRuntimePrimitives)) {
      console.log(`Found Edge Runtime primitives file: ${edgeRuntimePrimitives}`);
      
      // Read the file content
      let content = fs.readFileSync(edgeRuntimePrimitives, 'utf8');
      
      // Only patch if not already patched
      if (!content.includes('TextEncoderStreamPolyfill')) {
        // Add our polyfill code at the beginning of the file
        content = polyfillCode + '\n' + content;
        
        // Write the patched file back
        fs.writeFileSync(edgeRuntimePrimitives, content, 'utf8');
        console.log(`Successfully patched: ${edgeRuntimePrimitives}`);
      } else {
        console.log(`File already patched: ${edgeRuntimePrimitives}`);
      }
    } else {
      console.log(`Edge Runtime primitives file not found: ${edgeRuntimePrimitives}`);
    }
    
    console.log("Node modules patching completed");
  } catch (error) {
    console.error(`Error patching node modules: ${error.message}`);
  }
}

// Export our polyfills for ESM compatibility
export default {
  TextEncoderStream: globalThis.TextEncoderStream,
  TextDecoderStream: globalThis.TextDecoderStream,
  patchNodeModules
};