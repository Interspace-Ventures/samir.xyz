import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure we're in production mode
process.env.NODE_ENV = 'production';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add directory resolution helper
const resolvePublicDir = () => {
  if (process.env.PUBLIC_DIR) {
    return path.resolve(process.env.PUBLIC_DIR);
  }
  // In production, use the dist/public directory
  if (process.env.NODE_ENV === 'production') {
    return path.resolve(process.cwd(), 'dist', 'public');
  }
  // In development, use the client/public directory
  return path.resolve(process.cwd(), 'client', 'public');
};

// Setup request logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      console.log(logLine);
    }
  });
  next();
});

(async () => {
  // Check if port is in use and kill the process if it is
  try {
    const net = await import('net');
    const tester = net.createServer();

    await new Promise<void>((resolve, reject) => {
      tester.once('error', (err: NodeJS.ErrnoException) => {
        if (err.code === 'EADDRINUSE') {
          console.log('Port 5000 is already in use. Attempting to close existing connection...');
          // Kill any existing process on port 5000
          const { execSync } = require('child_process');
          try {
            execSync('npx kill-port 5000');
            console.log('Successfully killed process on port 5000');
            resolve();
          } catch (killError) {
            console.error('Failed to kill process:', killError);
            reject(killError);
          }
        } else {
          reject(err);
        }
      });

      tester.once('listening', () => {
        tester.close();
        resolve();
      });

      tester.listen(5000, '0.0.0.0');
    });
  } catch (err) {
    console.error('Error checking port availability:', err);
    process.exit(1);
  }

  const server = registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err);
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // Resolve and verify public directory
  const publicDir = resolvePublicDir();
  console.log('Resolved public directory path:', publicDir);

  try {
    // Ensure the public directory exists
    if (!fs.existsSync(publicDir)) {
      console.log('Public directory not found, attempting to create:', publicDir);
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Log directory contents for debugging
    const files = fs.readdirSync(publicDir);
    console.log('Files in public directory:', files);

    if (files.length === 0) {
      console.warn('Warning: Public directory is empty. Make sure to run the build process first.');
    }

    // Configure static file serving with caching and proper options
    app.use(express.static(publicDir, {
      maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
      etag: true,
      index: false, // Don't serve index.html automatically
      fallthrough: true // Allow falling through to next middleware
    }));

    // Handle SPA routes
    app.get("*", (req, res, next) => {
      // Skip API routes and static files
      if (req.path.startsWith('/api') || path.extname(req.path)) {
        return next();
      }

      const indexPath = path.join(publicDir, "index.html");

      // Verify index.html exists
      if (!fs.existsSync(indexPath)) {
        console.error('Error: index.html not found at', indexPath);
        console.error('Directory contents:', fs.readdirSync(publicDir));
        return res.status(500).send('Server configuration error: index.html not found');
      }

      // Serve index.html for client-side routing
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error('Error serving index.html:', err);
          next(err);
        }
      });
    });

    // Start server
    const PORT = parseInt(process.env.PORT || "5000", 10);
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at http://0.0.0.0:${PORT}`);
      console.log('Environment:', process.env.NODE_ENV);
      console.log('Working directory:', process.cwd());
      console.log('Public directory:', publicDir);
    });

  } catch (error) {
    console.error("Failed to setup static file serving:", error);
    process.exit(1);
  }
})().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});