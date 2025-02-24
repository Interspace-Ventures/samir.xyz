import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import compression from "compression";
import path from "path";

const app = express();
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  // Log requests and responses
  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    log(`${req.method} ${path} ${status} ${duration}ms`);
  });

  next();
});

// Configure proper MIME types and disable caching for images
app.use((req, res, next) => {
  if (req.path.includes('/assets/images/')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    if (req.path.endsWith('.webp')) {
      res.type('image/webp');
    } else if (req.path.endsWith('.png')) {
      res.type('image/png');
    }
  }
  next();
});

(async () => {
  const server = registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error('Server error:', err);
    res.status(status).json({ message });
  });

  // Important: Setup static file serving first
  app.use('/assets', express.static(path.join(process.cwd(), 'public', 'assets'), {
    maxAge: '0',
    etag: false,
    lastModified: false,
    immutable: false,
    fallthrough: true,
  }));

  // Setup Vite or serve static files based on environment
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Handle all other routes (SPA client-side routing)
  app.get('*', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api')) {
      return next();
    }

    const indexPath = app.get("env") === "development" 
      ? path.join(process.cwd(), 'src', 'index.html')
      : path.join(process.cwd(), 'dist', 'public', 'index.html');

    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('Error sending index.html:', err);
        next(err);
      }
    });
  });

  const PORT = Number(process.env.PORT || 5000);
  const server_instance = server.listen(PORT, "0.0.0.0", () => {
    log(`Server running at http://0.0.0.0:${PORT}`);
  });

  process.on('SIGTERM', () => {
    server_instance.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

})().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});