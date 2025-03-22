// Custom server for Next.js using Bun
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

// Initialize Next.js app
const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = process.env.PORT || 5000;
const configFile = process.env.NEXT_CONFIG_FILE || 'next.config.mjs';

console.log(`Using Next.js config file: ${configFile}`);

// Apply polyfills for streaming text encoder/decoder
if (typeof global.TextEncoderStream === 'undefined') {
  console.log("Polyfilling TextEncoderStream");
  
  class TextEncoderStream {
    constructor() {
      this.encoder = new TextEncoder();
      
      // Create proper streams since Bun has ReadableStream and WritableStream
      const transformStream = new TransformStream({
        transform: (chunk, controller) => {
          const encoded = this.encoder.encode(chunk);
          controller.enqueue(encoded);
        }
      });
      
      this.readable = transformStream.readable;
      this.writable = transformStream.writable;
    }
  }
  
  global.TextEncoderStream = TextEncoderStream;
}

// TextDecoderStream polyfill
if (typeof global.TextDecoderStream === 'undefined') {
  console.log("Polyfilling TextDecoderStream");
  
  class TextDecoderStream {
    constructor(label) {
      this.decoder = new TextDecoder(label);
      
      // Create proper streams since Bun has ReadableStream and WritableStream
      const transformStream = new TransformStream({
        transform: (chunk, controller) => {
          const decoded = this.decoder.decode(chunk, { stream: true });
          if (decoded) {
            controller.enqueue(decoded);
          }
        },
        flush: (controller) => {
          const decoded = this.decoder.decode();
          if (decoded) {
            controller.enqueue(decoded);
          }
        }
      });
      
      this.readable = transformStream.readable;
      this.writable = transformStream.writable;
    }
  }
  
  global.TextDecoderStream = TextDecoderStream;
}

// Prepare the app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Start the app
app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse URL
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling request:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});