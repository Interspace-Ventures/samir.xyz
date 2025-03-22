// Next.js startup script with polyfills
import { spawn } from 'child_process';

// Import polyfills from our library
import('./src/lib/polyfills.ts')
  .then(() => {
    console.log("Polyfills loaded successfully");
  })
  .catch(err => {
    console.error("Failed to load TypeScript polyfills:", err);
    import('./src/lib/polyfills.js')
      .then(() => {
        console.log("JS polyfills loaded as fallback");
      })
      .catch(err => {
        console.error("Failed to load JS polyfills:", err);
      });
  });

// Define global polyfills directly here as a last resort
if (typeof globalThis.TextEncoderStream === 'undefined') {
  globalThis.TextEncoderStream = class TextEncoderStream {
    constructor() {
      this.encoder = new TextEncoder();
    }
    start() {}
    transform(chunk, controller) {
      controller.enqueue(this.encoder.encode(chunk));
    }
    flush() {}
  };
  console.log("Directly added TextEncoderStream polyfill");
}

if (typeof globalThis.TextDecoderStream === 'undefined') {
  globalThis.TextDecoderStream = class TextDecoderStream {
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
  };
  console.log("Directly added TextDecoderStream polyfill");
}

// Start Next.js with polyfills preloaded
console.log("Starting Next.js with polyfills preloaded...");
const nextProcess = spawn('bun', ['run', 'next', 'dev', '-p', '5000', '--hostname', '0.0.0.0'], {
  stdio: 'inherit',
  env: { 
    ...process.env,
    NEXT_RUNTIME: "nodejs" // Force using NodeJS runtime, not Edge
  }
});

// Forward signals
process.on('SIGINT', () => nextProcess.kill('SIGINT'));
process.on('SIGTERM', () => nextProcess.kill('SIGTERM'));

// Wait for process to exit
nextProcess.on('exit', (code) => {
  process.exit(code);
});
