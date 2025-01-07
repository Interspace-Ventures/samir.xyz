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
    // First build the client
    console.log('Building client...');
    await execAsync('npx vite build', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'production'
      }
    });

    // Then build the server
    console.log('Building server...');
    await build({
      entryPoints: ['server/index.ts'],
      bundle: true,
      platform: 'node',
      target: 'node20',
      outdir: 'dist',
      format: 'esm',
      external: ['express', 'vite'],
      banner: {
        js: `
          import { createRequire } from 'module';
          const require = createRequire(import.meta.url);
          import { fileURLToPath } from 'url';
          import { dirname } from 'path';
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = dirname(__filename);
        `
      }
    });

    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject();