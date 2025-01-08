import type { Express } from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function registerRoutes(app: Express) {
  // In production, assets will be served from dist/public
  // In development, we'll serve from attached_assets
  const assetsBasePath = process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '../dist/public/assets')
    : path.join(__dirname, '../attached_assets');

  console.log('Serving assets from:', assetsBasePath);

  // Serve assets with proper CORS and caching headers
  app.use('/assets', express.static(assetsBasePath, {
    maxAge: '1d',
    setHeaders: (res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }));

  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  const httpServer = createServer(app);
  return httpServer;
}