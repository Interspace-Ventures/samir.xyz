import type { Express } from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function registerRoutes(app: Express) {
  // Serve static files from the attached_assets/portfolio directory for logos
  const logoPath = path.join(__dirname, '../attached_assets/portfolio');
  console.log('Serving logos from:', logoPath); // Debug log
  app.use('/logos', express.static(logoPath));

  // Serve static files from the client/public directory
  app.use(express.static(path.join(__dirname, '../client/public')));

  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  const httpServer = createServer(app);
  return httpServer;
}