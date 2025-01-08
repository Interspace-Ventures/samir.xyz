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
    // First build the client using Vite
    console.log('Building client...');
    const rootDir = __dirname;
    const clientDir = path.join(rootDir, 'client');
    const distDir = path.join(rootDir, 'dist');
    const publicDir = path.join(distDir, 'public');

    // Verify client/index.html exists
    const indexHtmlPath = path.join(clientDir, 'index.html');
    if (!fs.existsSync(indexHtmlPath)) {
      throw new Error(`Could not find index.html at ${indexHtmlPath}`);
    }
    console.log('Found index.html at:', indexHtmlPath);

    // Clean dist directory if it exists
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true });
      console.log('Cleaned dist directory');
    }

    // Create fresh dist and public directories
    fs.mkdirSync(distDir, { recursive: true });
    console.log('Created build directory:', distDir);

    // Build the client
    console.log('Building client application...');
    await execAsync('npx vite build', {
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' },
      cwd: clientDir
    });
    console.log('Client build completed successfully');

    // Move the built client files to dist/public
    const clientBuildDir = path.join(clientDir, 'dist');
    if (!fs.existsSync(clientBuildDir)) {
      throw new Error('Client build directory not found');
    }

    // Move the built files to the correct location
    fs.renameSync(clientBuildDir, publicDir);
    console.log('Moved client build to:', publicDir);

    // Build the server
    console.log('Building server...');
    await build({
      entryPoints: [path.join(rootDir, 'server/index.ts')],
      bundle: true,
      platform: 'node',
      target: 'node20',
      outfile: path.join(distDir, 'server.js'),
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

    // Copy attached_assets if they exist
    const assetsDir = path.join(rootDir, 'attached_assets');
    if (fs.existsSync(assetsDir)) {
      const publicAssetsDir = path.join(publicDir, 'assets');
      fs.mkdirSync(publicAssetsDir, { recursive: true });
      fs.cpSync(assetsDir, publicAssetsDir, { recursive: true });
      console.log('Copied assets to:', publicAssetsDir);
    }

    console.log('Full build process completed!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject().catch(console.error);