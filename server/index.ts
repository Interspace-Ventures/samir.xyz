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

// Add directory resolution helper with improved logging
const resolvePublicDir = () => {
  const cwd = process.cwd();
  console.log('Current working directory:', cwd);

  let publicDir;
  if (process.env.PUBLIC_DIR) {
    publicDir = path.resolve(process.env.PUBLIC_DIR);
    console.log('Using PUBLIC_DIR env variable:', publicDir);
  } else if (process.env.NODE_ENV === 'production') {
    publicDir = path.resolve(cwd, 'dist', 'public');
    console.log('Using production public directory:', publicDir);
  } else {
    publicDir = path.resolve(cwd, 'client', 'public');
    console.log('Using development public directory:', publicDir);
  }

  // Verify directory exists and list contents
  if (fs.existsSync(publicDir)) {
    console.log('Public directory exists. Contents:', fs.readdirSync(publicDir));
  } else {
    console.warn('Warning: Public directory not found at', publicDir);
  }

  return publicDir;
};

// Setup request logging middleware
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
    let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
    if (capturedJsonResponse) {
      logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
    }
    console.log(logLine);
  });
  next();
});

(async () => {
  // Register API routes first
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

  try {
    // Ensure the public directory exists
    if (!fs.existsSync(publicDir)) {
      console.log('Creating public directory:', publicDir);
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Configure static file serving with improved caching and options
    app.use(express.static(publicDir, {
      maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
      etag: true,
      index: false, // Don't automatically serve index.html
      fallthrough: true, // Allow falling through to next middleware
      setHeaders: (res, filePath) => {
        // Add cache control headers
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        } else if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
          res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
        }
      }
    }));

    // Handle all other routes for SPA
    app.get('*', (req, res, next) => {
      // Skip API routes and actual files
      if (req.path.startsWith('/api') || path.extname(req.path)) {
        return next();
      }

      const indexPath = path.join(publicDir, 'index.html');

      if (!fs.existsSync(indexPath)) {
        console.error('Error: index.html not found at', indexPath);
        return res.status(500).send('Server configuration error: index.html not found');
      }

      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error('Error serving index.html:', err);
          next(err);
        }
      });
    });

    // Start server
    const PORT = parseInt(process.env.PORT || '5000', 10);
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running at http://0.0.0.0:${PORT}`);
      console.log('Environment:', process.env.NODE_ENV);
      console.log('Public directory:', publicDir);
    });

  } catch (error) {
    console.error('Failed to setup static file serving:', error);
    process.exit(1);
  }
})().catch((error) => {
  console.error('Server startup failed:', error);
  process.exit(1);
});