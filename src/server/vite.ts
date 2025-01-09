import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { type Server } from "http";
import viteConfig from "../vite.config";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const publicAssetsPath = path.resolve(__dirname, '../../public/assets');

  // Serve static files from public directory first with better error handling
  app.use('/assets', express.static(publicAssetsPath, {
    maxAge: '1d',
    etag: true,
    lastModified: true,
    fallthrough: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.webp')) {
        res.setHeader('Content-Type', 'image/webp');
      } else if (filePath.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      }
      // Enable CORS for assets
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
  }), (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err) {
      console.error('Static file serving error:', err);
      res.status(404).send('Asset not found');
    } else {
      next();
    }
  });

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: viteLogger,
    server: {
      middlewareMode: true,
      hmr: { server },
      port: 5000,
      host: '0.0.0.0',
      watch: {
        usePolling: true,
        interval: 100
      },
      fs: {
        strict: false,
        allow: ['.']
      }
    },
    appType: "custom",
  });

  app.use(vite.middlewares);

  // Handle all routes for SPA
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    // Skip API routes
    if (url.startsWith('/api')) {
      return next();
    }

    try {
      const template = fs.readFileSync(
        path.resolve(__dirname, '../../src/index.html'),
        'utf-8'
      );
      const html = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distDir = path.resolve(__dirname, '../../dist');
  const publicAssetsPath = path.resolve(__dirname, '../../public/assets');

  // Serve static assets with proper MIME types and error handling
  app.use('/assets', express.static(publicAssetsPath, {
    maxAge: '1d',
    etag: true,
    lastModified: true,
    fallthrough: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.webp')) {
        res.setHeader('Content-Type', 'image/webp');
      } else if (filePath.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      }
      // Enable CORS for assets
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
  }), (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err) {
      console.error('Static file serving error:', err);
      res.status(404).send('Asset not found');
    } else {
      next();
    }
  });

  // Serve built assets
  app.use(express.static(distDir));

  // Always serve index.html for all non-API routes (SPA client-side routing)
  app.use("*", (req, res, next) => {
    const url = req.originalUrl;

    // Skip API routes
    if (url.startsWith('/api')) {
      return next();
    }

    res.sendFile(path.resolve(distDir, "index.html"));
  });
}