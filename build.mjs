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
    const srcDir = path.resolve(__dirname, 'src');
    const publicDir = path.resolve(__dirname, 'public');
    const assetsDir = path.join(publicDir, 'assets');

    // Create directory structure if it doesn't exist
    fs.mkdirSync(path.join(assetsDir, 'css'), { recursive: true });
    fs.mkdirSync(path.join(assetsDir, 'js'), { recursive: true });
    fs.mkdirSync(path.join(assetsDir, 'img'), { recursive: true });
    fs.mkdirSync(path.join(assetsDir, 'logos'), { recursive: true });
    console.log('Created/verified directory structure');

    // Build static site
    console.log('Building static site...');
    process.env.NODE_ENV = 'production';

    const { stdout, stderr } = await execAsync('npx vite build --outDir ./public');
    console.log('Build output:', stdout);
    if (stderr) console.error('Build stderr:', stderr);

    // Verify the build output
    if (!fs.existsSync(path.join(publicDir, 'index.html'))) {
      throw new Error('Build verification failed: index.html not found');
    }

    console.log('Build process completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject();