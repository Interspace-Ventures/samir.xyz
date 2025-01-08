import type { Express } from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import express from 'express';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function registerRoutes(app: Express) {
  // API routes first
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Asset handling
  if (process.env.NODE_ENV === 'production') {
    const publicDir = path.join(process.cwd(), "dist", "public");
    const assetsDir = path.join(publicDir, "assets");

    // Validate directories exist
    if (!fs.existsSync(publicDir)) {
      throw new Error(`Public directory not found at ${publicDir}. Please run build first.`);
    }

    console.log('Serving production assets from:', assetsDir);

    // Serve static assets with proper caching and immutable flag for better performance
    app.use('/assets', express.static(assetsDir, {
      maxAge: '1d',
      etag: true,
      immutable: true,
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
      }
    }));

    // Serve other static files from public directory
    app.use(express.static(publicDir, {
      index: false, // Let the SPA handler deal with index.html
      maxAge: '1h',
      etag: true
    }));

    // Handle SPA routes
    app.get('*', (req, res, next) => {
      if (path.extname(req.path)) {
        next();
        return;
      }
      res.sendFile(path.join(publicDir, 'index.html'));
    });
  } else {
    // In development, assets are handled by Vite
    console.log('Development mode: assets handled by Vite');
  }

  const httpServer = createServer(app);
  return httpServer;
}