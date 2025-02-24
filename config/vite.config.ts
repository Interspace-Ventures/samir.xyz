import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Custom plugin for asset and 404 logging
const assetLoggingPlugin = () => ({
  name: 'asset-logging',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const handleResponse = () => {
        if (res.statusCode === 404) {
          console.warn(`[Asset Not Found] ${req.url}`);
        }
      };
      res.on('finish', handleResponse);
      next();
    });
  }
});

// Simplified configuration focused on portfolio site needs
export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    assetLoggingPlugin()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "..", "client"),
      "@components": path.resolve(__dirname, "..", "client", "components"),
      "@pages": path.resolve(__dirname, "..", "client", "pages"),
      "@lib": path.resolve(__dirname, "..", "client", "lib"),
      "@assets": path.resolve(__dirname, "..", "public", "assets")
    },
  },
  root: path.resolve(__dirname, ".."),
  publicDir: path.resolve(__dirname, "..", "public"),
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    // Add SPA fallback for client-side routing
    proxy: {},
    middlewareMode: false,
    // Add proper SPA fallback
    fs: {
      strict: true,
      allow: ['..']
    }
  },
  build: {
    outDir: path.resolve(__dirname, "..", "build"),
    emptyOutDir: true,
    sourcemap: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000
  },
  logLevel: "info"
});