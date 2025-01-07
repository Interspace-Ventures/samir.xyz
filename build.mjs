import { build } from 'esbuild';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildProject() {
  try {
    // First build the client using Vite's config
    console.log('Building client...');
    await execAsync('NODE_ENV=production npx vite build', { 
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