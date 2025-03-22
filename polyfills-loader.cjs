// This file is loaded by Node.js before any other code
// to ensure polyfills are available globally

// TextEncoderStream polyfill
if (typeof global.TextEncoderStream === 'undefined') {
  console.log("Polyfilling TextEncoderStream");
  
  class TextEncoderStream {
    constructor() {
      this.encoder = new TextEncoder();
      this.readable = {
        getReader() {
          return {
            read() {
              return Promise.resolve({ done: true });
            }
          };
        }
      };
      this.writable = {
        getWriter() {
          return {
            write(chunk) {
              return Promise.resolve();
            },
            close() {
              return Promise.resolve();
            }
          };
        }
      };
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
      this.readable = {
        getReader() {
          return {
            read() {
              return Promise.resolve({ done: true });
            }
          };
        }
      };
      this.writable = {
        getWriter() {
          return {
            write(chunk) {
              return Promise.resolve();
            },
            close() {
              return Promise.resolve();
            }
          };
        }
      };
    }
  }
  
  global.TextDecoderStream = TextDecoderStream;
}