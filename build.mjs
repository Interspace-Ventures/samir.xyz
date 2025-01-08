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
    const distDir = path.join(__dirname, 'dist');
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
    process.env.NODE_ENV = 'production';

    // Run Vite build with explicit config path
    const viteConfigPath = path.resolve(__dirname, 'vite.config.ts');
    if (!fs.existsSync(viteConfigPath)) {
      throw new Error(`Vite config not found at ${viteConfigPath}`);
    }

    console.log('Using Vite config at:', viteConfigPath);
    try {
      const { stdout, stderr } = await execAsync(`npx vite build`, {
        env: { ...process.env, NODE_ENV: 'production' }
      });
      console.log('Vite build output:', stdout);
      if (stderr) console.error('Vite build stderr:', stderr);
    } catch (error) {
      console.error('Vite build error:', error);
      throw error;
    }

    console.log('Client build completed');

    // Build server
    console.log('Building server...');
    await build({
      entryPoints: ['server/index.ts'],
      bundle: true,
      platform: 'node',
      target: 'node20',
      outfile: path.join(distDir, 'index.js'),
      format: 'esm',
      packages: 'external',
      sourcemap: true,
      banner: {
        js: 'process.env.NODE_ENV = "production";'
      }
    });
    console.log('Server build completed');

    // Verify the build output
    const requiredFiles = ['index.html', 'assets'];
    for (const file of requiredFiles) {
      const filePath = path.join(publicDir, file);
      if (!fs.existsSync(filePath)) {
        console.error(`Missing required file/directory: ${file}`);
        console.error('Contents of public directory:', fs.readdirSync(publicDir));
        throw new Error(`Required file/directory not found: ${file}`);
      }
    }

    console.log('Build process completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject();