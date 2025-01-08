import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
  const server = registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err);
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  if (process.env.NODE_ENV !== "production") {
    // Development mode - use Vite's dev server
    try {
      const vite = await import('vite');
      const viteConfigPath = path.resolve(__dirname, '..', 'vite.config.ts');
      const viteConfig = (await import(viteConfigPath)).default;

      const viteServer = await vite.createServer({
        ...viteConfig,
        server: {
          middlewareMode: true,
          hmr: { server }
        },
        appType: "custom"
      });

      app.use(viteServer.middlewares);

      // Handle SPA routes in development
      app.use("*", async (req, res, next) => {
        try {
          const indexPath = path.resolve(__dirname, "../client/index.html");
          const template = await import('fs/promises').then(fs => fs.readFile(indexPath, "utf-8"));
          const html = await viteServer.transformIndexHtml(req.originalUrl, template);
          res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } catch (e) {
          next(e);
        }
      });
    } catch (error) {
      console.error('Failed to initialize Vite dev server:', error);
      process.exit(1);
    }
  } else {
    // Production mode - serve static files from dist
    const publicDir = path.resolve(process.cwd(), "dist", "public");
    console.log('Serving static files from:', publicDir);

    // Serve static files with proper caching
    app.use(express.static(publicDir, {
      maxAge: '1d',
      etag: true,
      index: false, // Let our custom handler deal with serving index.html
      setHeaders: (res, path) => {
        // Add immutable cache control for assets
        if (path.includes('/assets/')) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=3600');
        }
      }
    }));

    // Handle SPA routing
    app.get("*", (req, res, next) => {
      // Skip API routes
      if (req.path.startsWith('/api')) {
        return next();
      }

      // If the request is for a file with extension, let express.static handle it
      if (path.extname(req.path) !== '') {
        return next();
      }

      // For all other routes, serve index.html for client-side routing
      const indexPath = path.join(publicDir, "index.html");
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error(`Error serving index.html: ${err.message}`);
          next(err);
        }
      });
    });
  }

  const PORT = parseInt(process.env.PORT || "5000", 10);
  const HOST = process.env.HOST || "0.0.0.0";

  server.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV || 'development'}`);
  });
})().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});