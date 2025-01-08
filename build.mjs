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

    try {
      // Move to client directory before running Vite build
      process.chdir(path.join(__dirname, 'client'));
      const { stdout, stderr } = await execAsync('npx vite build --outDir ../dist/public --emptyOutDir', {
        env: { ...process.env, NODE_ENV: 'production' }
      });
      console.log('Vite build output:', stdout);
      if (stderr) console.error('Vite build stderr:', stderr);
      // Move back to root
      process.chdir(__dirname);
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
      outfile: path.join(distDir, 'server.mjs'),
      format: 'esm',
      packages: 'external',
      sourcemap: true,
      banner: {
        js: '#!/usr/bin/env node\nimport { createRequire } from "module";\nconst require = createRequire(import.meta.url);\nprocess.env.NODE_ENV = "production";'
      }
    });
    console.log('Server build completed');

    // Create a startup script
    const startupScript = `#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

process.env.NODE_ENV = "production";

// Import and start the server
import('./server.mjs').catch(console.error);
`;

    fs.writeFileSync(path.join(distDir, 'index.mjs'), startupScript, 'utf8');
    fs.chmodSync(path.join(distDir, 'index.mjs'), '755');

    // Verify the build output
    const requiredFiles = ['index.html', 'assets'];
    for (const file of requiredFiles) {
      const filePath = path.join(publicDir, file);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Required file/directory not found: ${file} in ${publicDir}`);
      }
    }

    // Copy any additional static assets if needed
    if (fs.existsSync(path.join(__dirname, 'client', 'public'))) {
      fs.cpSync(
        path.join(__dirname, 'client', 'public'),
        publicDir,
        { recursive: true }
      );
      console.log('Copied static assets');
    }

    console.log('Build process completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject();