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
    // First build the client using Vite's config
    console.log('Building client...');
    const rootDir = __dirname;
    const distDir = path.resolve(rootDir, 'dist');
    const publicDir = path.resolve(distDir, 'public');
    const indexHtmlPath = path.join(rootDir, 'index.html');

    // Verify index.html exists in root
    if (!fs.existsSync(indexHtmlPath)) {
      throw new Error(`Could not find index.html at ${indexHtmlPath}`);
    }
    console.log('Found index.html at:', indexHtmlPath);

    // Create dist and public directories if they don't exist
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    console.log('Ensured build directories exist:', { distDir, publicDir });

    // Run vite build directly from root where index.html is located
    process.chdir(rootDir);
    console.log('Working directory:', process.cwd());

    await execAsync('npx vite build', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'production'
      }
    });
    console.log('Client build completed successfully');

    // Then build the server
    console.log('Building server...');
    await build({
      entryPoints: ['server/index.ts'],
      bundle: true,
      platform: 'node',
      target: 'node20',
      outfile: 'dist/server.mjs',
      format: 'esm',
      packages: 'external',
      sourcemap: true,
      minify: true,
      banner: {
        js: `
          import { createRequire } from 'module';
          import { fileURLToPath } from 'url';
          import { dirname } from 'path';
          const require = createRequire(import.meta.url);
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = dirname(__filename);
        `
      }
    });
    console.log('Server build completed successfully');
    console.log('Full build process completed!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject().catch(console.error);