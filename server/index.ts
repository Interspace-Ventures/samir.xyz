import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if running in production mode (deployment)
const isProduction = process.env.NODE_ENV === 'production';

// Check if the public directory exists with an index.html file
const publicDir = path.resolve(__dirname, '../public');
const hasBuiltFiles = fs.existsSync(path.join(publicDir, 'index.html'));

// If production mode or we have built files, serve static files
if (isProduction || hasBuiltFiles) {
  console.log(`Running in ${isProduction ? 'production' : 'development'} mode with built files`);
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Run the build process if needed
  if (!hasBuiltFiles) {
    console.log('Building the project...');
    // Run Vite build synchronously
    const { execSync } = require('child_process');
    try {
      execSync('npx vite build', { stdio: 'inherit', cwd: path.resolve(__dirname, '..') });
      
      // Copy build to public
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      
      const buildDir = path.resolve(__dirname, '../build');
      if (fs.existsSync(buildDir)) {
        fs.cpSync(buildDir, publicDir, { recursive: true });
      }
    } catch (error) {
      console.error('Build failed:', error);
    }
  }

  // Serve static files from the public directory
  app.use(express.static(publicDir));

  // For all other routes, serve the index.html file (for SPA routing)
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} else {
  // Development mode - start Vite dev server
  console.log('Starting Vite development server...');

  // Use spawn instead of exec to keep the process running
  // Explicitly use the client Vite config which has all allowedHosts configured
  const vite = spawn('npx', ['vite', '--config', 'client/vite.config.ts'], {
    stdio: 'inherit',
    shell: true,
    cwd: path.resolve(__dirname, '..')
  });

  // Handle process events
  vite.on('error', (err) => {
    console.error('Failed to start Vite dev server:', err);
    process.exit(1);
  });

  vite.on('close', (code) => {
    if (code !== 0) {
      console.error(`Vite dev server exited with code ${code}`);
      process.exit(code || 1);
    }
  });

  // Handle termination signals
  process.on('SIGINT', () => {
    console.log('Shutting down Vite dev server...');
    vite.kill('SIGINT');
  });

  process.on('SIGTERM', () => {
    console.log('Shutting down Vite dev server...');
    vite.kill('SIGTERM');
  });
}