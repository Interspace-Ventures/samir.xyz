import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";

export function registerRoutes(app: Express): Server {
  // API routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Serve static assets from both directories
  app.use('/assets', express.static(path.join(process.cwd(), 'attached_assets')));
  app.use('/assets', express.static(path.join(process.cwd(), 'public', 'assets')));

  // Serve static files from both dist/public and public directories
  app.use(express.static(path.join(process.cwd(), 'public')));
  app.use(express.static(path.join(process.cwd(), 'dist', 'public')));

  // For client-side routing, serve index.html for all non-API routes
  app.get('*', (_req, res) => {
    // Try serving from public first, then fall back to dist/public
    const publicPath = path.join(process.cwd(), 'public', 'index.html');
    const distPath = path.join(process.cwd(), 'dist', 'public', 'index.html');

    if (require('fs').existsSync(publicPath)) {
      res.sendFile(publicPath);
    } else {
      res.sendFile(distPath);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}