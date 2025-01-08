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

    // Setup directories
    const distDir = path.resolve(__dirname, 'dist');
    const srcDir = path.resolve(__dirname, 'src');
    const publicDir = path.resolve(__dirname, 'public');

    // Clean dist directory
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true });
      console.log('Cleaned existing dist directory');
    }

    // Create fresh dist directory and its subdirectories
    fs.mkdirSync(distDir, { recursive: true });
    fs.mkdirSync(path.join(distDir, 'assets', 'css'), { recursive: true });
    fs.mkdirSync(path.join(distDir, 'assets', 'img'), { recursive: true });
    fs.mkdirSync(path.join(distDir, 'assets', 'js'), { recursive: true });
    console.log('Created build directory structure');

    // Build static site
    console.log('Building static site...');
    process.env.NODE_ENV = 'production';

    const { stdout, stderr } = await execAsync('npx vite build');
    console.log('Vite build output:', stdout);
    if (stderr) console.error('Vite build stderr:', stderr);

    // Copy public assets
    if (fs.existsSync(publicDir)) {
      fs.cpSync(publicDir, path.join(distDir, 'assets'), { 
        recursive: true,
        filter: (src) => !src.includes('node_modules')
      });
      console.log('Copied public assets');
    }

    // Verify the build output
    if (!fs.existsSync(path.join(distDir, 'index.html'))) {
      throw new Error('Build verification failed: index.html not found');
    }

    console.log('Build process completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject();