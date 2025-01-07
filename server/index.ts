import express, { type Request, Response, NextFunction } from "express";
import { createServer as createViteServer } from "vite";
import { registerRoutes } from "./routes";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Setup request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
  });
  next();
});

(async () => {
  const server = registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error(`Error: ${message}`);
    res.status(status).json({ message });
  });

  if (process.env.NODE_ENV !== "production") {
    // Development setup with Vite
    console.log('Starting development server with Vite middleware...');
    const vite = await createViteServer({
      root: path.resolve(__dirname, "../client"),
      server: { 
        middlewareMode: true,
        hmr: { server }
      },
      appType: 'custom'
    });

    app.use(vite.middlewares);

    // Serve index.html with Vite transforms in development
    app.use('*', async (req, res, next) => {
      try {
        const template = await fs.promises.readFile(
          path.resolve(__dirname, "../client/index.html"),
          "utf-8"
        );
        const html = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Production setup
    const distPath = path.resolve(__dirname, '../dist/public');

    // Check if build directory exists
    if (!fs.existsSync(distPath)) {
      console.error(`Error: Build directory not found at ${distPath}`);
      console.error('Please ensure you have built the project first');
      process.exit(1);
    }

    // Serve static files with caching
    app.use(express.static(distPath, {
      maxAge: '1y',
      etag: true
    }));

    // Always return index.html for any unknown paths (SPA routing)
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'), err => {
        if (err) {
          console.error(`Error sending index.html: ${err.message}`);
          res.status(500).send('Error loading application');
        }
      });
    });
  }

  const PORT = parseInt(process.env.PORT || '5000', 10);
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
})();