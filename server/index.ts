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

// Setup CORS for custom domain
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Setup request logging (simplified from original)
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
    res.status(status).json({ message });
    console.error(err);
  });

  if (app.get("env") === "development") {
    // In development, create and configure Vite dev server
    const vite = await createViteServer({
      configFile: false,
      root: path.resolve(__dirname, "../client"),
      server: { 
        middlewareMode: true,
        hmr: { server }
      },
      appType: 'custom'
    });

    // Use vite's connect instance as middleware
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        // Load the index.html template from the client directory
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
    // In production, serve built files with proper caching headers
    const distPath = path.resolve(__dirname, '../dist/public');
    if (!fs.existsSync(distPath)) {
      console.error(`Could not find the build directory: ${distPath}`);
      console.error('Please make sure to build the client first using: npm run build');
      process.exit(1);
    }

    app.use(express.static(distPath, {
      maxAge: '1y',
      etag: true
    }));

    // Always return index.html for any unknown paths (SPA routing)
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
})();