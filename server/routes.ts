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

  // Ensure directory exists before attempting to serve
  const publicDir = path.join(process.cwd(), "dist", "public");

  // Log the serving directory for debugging
  console.log('Routes.ts - Checking public directory:', publicDir);
  console.log('Routes.ts - Public directory exists:', fs.existsSync(publicDir));


  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}