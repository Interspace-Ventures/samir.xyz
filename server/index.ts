import express from 'express';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createServer() {
  const app = express();
  app.use(compression());

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  // Serve static files from public directory
  app.use('/assets', express.static(resolve(__dirname, '../public/assets')));

  // SPA fallback
  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    const indexHtml = resolve(__dirname, '../public/index.html');
    res.sendFile(indexHtml);
  });

  const port = Number(process.env.PORT) || 5000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

createServer();