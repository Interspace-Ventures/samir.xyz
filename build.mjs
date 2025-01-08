import { build } from 'esbuild';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildProject() {
  try {
    console.log('Starting build process...');
    const rootDir = __dirname;
    const distDir = path.join(rootDir, 'dist');
    const publicDir = path.join(distDir, 'public');

    // Clean dist directory
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true });
      console.log('Cleaned existing dist directory');
    }

    // Create fresh dist directories
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('Created build directories');

    // Build client (Vite)
    console.log('Building client application...');
    await execAsync('npx vite build', {
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    });
    console.log('Client build completed');

    // Build server
    console.log('Building server...');
    await build({
      entryPoints: ['server/index.ts'],
      bundle: true,
      platform: 'node',
      target: 'node20',
      outfile: path.join(distDir, 'server.mjs'),
      format: 'esm',
      packages: 'external',
      sourcemap: true,
      banner: {
        js: `
          // ESM module support
          process.env.NODE_ENV = process.env.NODE_ENV || 'production';
        `
      }
    });
    console.log('Server build completed');

    // Copy any static assets
    const assetsDir = path.join(rootDir, 'attached_assets');
    if (fs.existsSync(assetsDir)) {
      const publicAssetsDir = path.join(publicDir, 'assets');
      fs.mkdirSync(publicAssetsDir, { recursive: true });
      fs.cpSync(assetsDir, publicAssetsDir, { recursive: true });
      console.log('Copied assets to public directory');
    }

    console.log('Build process completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject().catch(console.error);