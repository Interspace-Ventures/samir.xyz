import type { Express } from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function registerRoutes(app: Express) {
  // API routes first
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Asset handling
  if (process.env.NODE_ENV === 'production') {
    // In production, assets are in public/assets relative to the server file
    const assetsPath = path.join(__dirname, '../public/assets');
    console.log('Serving production assets from:', assetsPath);

    app.use('/assets', express.static(assetsPath, {
      maxAge: '1d',
      etag: true,
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=86400');
      }
    }));
  } else {
    // In development, serve from attached_assets
    const devAssetsPath = path.join(__dirname, '../attached_assets');
    console.log('Serving development assets from:', devAssetsPath);

    app.use('/assets', express.static(devAssetsPath, {
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }));
  }

  const httpServer = createServer(app);
  return httpServer;
}