import express, { Express, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = process.env.PORT || 3000;

// In development, we don't need to build - Vite's dev server handles it
if (process.env.NODE_ENV !== 'production') {
  console.log('Starting Vite dev server...');
  try {
    // Force development mode
    process.env.NODE_ENV = 'development';
    // Start Vite's dev server directly with port 5000
    console.log('Starting fast dev server on port 5000...');
    execSync('npx tsx server/dev.ts', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to start Vite dev server:', error);
    process.exit(1);
  }
} else {
  // Production mode - full build process
  console.log('Starting production build process...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }

  // Serve static files from the build directory
  const staticPath = path.join(__dirname, '../build');
  app.use(express.static(staticPath));

  // SPA fallback
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`Production server is running on port ${port}`);
  });
}