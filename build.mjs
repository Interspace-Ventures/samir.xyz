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

    // Setup directories
    const distDir = path.resolve(__dirname, 'dist');

    // Clean dist directory
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true });
      console.log('Cleaned existing dist directory');
    }

    // Create fresh dist directory
    fs.mkdirSync(distDir, { recursive: true });
    console.log('Created build directory:', distDir);

    // Build client (Vite)
    console.log('Building client application...');
    process.env.NODE_ENV = 'production';

    try {
      // Move to client directory before running Vite build
      process.chdir(path.join(__dirname, 'client'));
      console.log('Changed to client directory:', process.cwd());

      const { stdout, stderr } = await execAsync('npx vite build --outDir ../dist --emptyOutDir');
      console.log('Vite build output:', stdout);
      if (stderr) console.error('Vite build stderr:', stderr);

      // Move back to root
      process.chdir(__dirname);
      console.log('Changed back to root directory:', process.cwd());
    } catch (error) {
      console.error('Vite build error:', error);
      throw error;
    }

    // Copy any additional static assets
    if (fs.existsSync(path.join(__dirname, 'client', 'public'))) {
      fs.cpSync(
        path.join(__dirname, 'client', 'public'),
        distDir,
        { recursive: true }
      );
      console.log('Copied static assets');
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