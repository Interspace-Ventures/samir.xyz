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

  // Static file and SPA handling for production
  if (process.env.NODE_ENV === 'production') {
    const publicDir = path.join(process.cwd(), "dist", "public");

    // Ensure directory exists before attempting to serve
    if (!fs.existsSync(publicDir)) {
      console.error(`Public directory not found at ${publicDir}`);
      throw new Error('Public directory not found. Please run build first.');
    }

    // Log the serving directory for debugging
    console.log('Serving static files from:', publicDir);

    // Serve static files from the public directory
    app.use(express.static(publicDir, {
      index: false // Don't serve index.html directly, let our SPA handler do it
    }));

    // SPA fallback - serve index.html for all non-file requests
    app.get('*', (req, res, next) => {
      // Skip API routes
      if (req.path.startsWith('/api')) {
        return next();
      }

      // If it's a file request, let express.static handle it
      if (path.extname(req.path)) {
        return next();
      }

      // For all other routes, serve index.html
      const indexPath = path.join(publicDir, 'index.html');
      res.sendFile(indexPath, err => {
        if (err) {
          console.error('Error serving index.html:', err);
          next(err);
        }
      });
    });
  }

  const httpServer = createServer(app);
  return httpServer;
}