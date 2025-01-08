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
    const publicDir = path.resolve(distDir, 'public');

    // Clean dist directory
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true });
      console.log('Cleaned existing dist directory');
    }

    // Create fresh dist directories
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('Created build directories:', {
      distDir,
      publicDir
    });

    // Build client (Vite)
    console.log('Building client application...');
    process.env.NODE_ENV = 'production';

    try {
      // Move to client directory before running Vite build
      process.chdir(path.join(__dirname, 'client'));
      console.log('Changed to client directory:', process.cwd());

      const { stdout, stderr } = await execAsync('npx vite build --outDir ../dist/public --emptyOutDir');
      console.log('Vite build output:', stdout);
      if (stderr) console.error('Vite build stderr:', stderr);

      // Move back to root
      process.chdir(__dirname);
      console.log('Changed back to root directory:', process.cwd());
    } catch (error) {
      console.error('Vite build error:', error);
      throw error;
    }

    console.log('Client build completed');
    console.log('Verifying build output in:', publicDir);

    // List contents of public directory
    const publicFiles = fs.readdirSync(publicDir);
    console.log('Files in public directory:', publicFiles);

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
        js: '#!/usr/bin/env node\nimport { createRequire } from "module";\nconst require = createRequire(import.meta.url);'
      }
    });
    console.log('Server build completed');

    // Create a startup script that sets the proper environment
    const startupScript = `#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

// Set production mode and directory path
process.env.NODE_ENV = "production";
process.env.PUBLIC_DIR = join(__dirname, "public");

// Import and start the server
import('./server.mjs').catch(console.error);
`;

    fs.writeFileSync(path.join(distDir, 'index.mjs'), startupScript, 'utf8');
    fs.chmodSync(path.join(distDir, 'index.mjs'), '755');

    // Copy any additional static assets
    if (fs.existsSync(path.join(__dirname, 'client', 'public'))) {
      fs.cpSync(
        path.join(__dirname, 'client', 'public'),
        publicDir,
        { recursive: true }
      );
      console.log('Copied static assets');
    }

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