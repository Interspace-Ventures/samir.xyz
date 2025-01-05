import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import fs from "fs";

export function registerRoutes(app: Express): Server {
  // API routes must come first
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Serve static assets from attached_assets directory
  app.use('/assets', express.static(path.join(process.cwd(), 'attached_assets'), {
    maxAge: '1d'
  }));

  // In production, serve from dist/public
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(process.cwd(), 'dist', 'public');
    if (fs.existsSync(distPath)) {
      // Serve static files from the production build
      app.use(express.static(distPath, {
        maxAge: '1d'
      }));

      // Serve index.html for all non-API routes (for client-side routing)
      app.get(/^(?!\/api\/).*/, (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    } else {
      console.error('Production build directory not found:', distPath);
      console.error('Please run npm run build first');
    }
  }

  const httpServer = createServer(app);
  return httpServer;
}