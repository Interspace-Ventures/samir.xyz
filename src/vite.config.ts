import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export default defineConfig({
  plugins: [react(), runtimeErrorOverlay(), themePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
      "@components": path.resolve(__dirname, "components"),
      "@pages": path.resolve(__dirname, "pages"),
      "@lib": path.resolve(__dirname, "lib"),
      "@assets": path.resolve(rootDir, "public/assets")
    },
  },
  root: __dirname,
  publicDir: path.resolve(rootDir, 'public'),
  build: {
    outDir: path.resolve(rootDir, "dist/public"),
    emptyOutDir: true,
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.');
          const extType = info?.[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType || '')) {
            return `assets/images/[name][extname]`;
          }
          if (/css/i.test(extType || '')) {
            return `assets/css/[name][extname]`;
          }
          return `assets/[name][extname]`;
        },
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    fs: {
      strict: false,
      allow: ['.']
    },
    watch: {
      usePolling: true,
      interval: 100
    }
  }
});