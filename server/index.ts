import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting Vite development server...');

// Use spawn instead of exec to keep the process running
// Explicitly point to the client/vite.config.ts file
const vite = spawn('npx', ['vite', '--config', path.resolve(__dirname, '..', 'client', 'vite.config.ts')], {
  stdio: 'inherit',
  shell: true,
  cwd: path.resolve(__dirname, '..')
});

// Handle process events
vite.on('error', (err) => {
  console.error('Failed to start Vite dev server:', err);
  process.exit(1);
});

vite.on('close', (code) => {
  if (code !== 0) {
    console.error(`Vite dev server exited with code ${code}`);
    process.exit(code || 1);
  }
});

// Handle termination signals
process.on('SIGINT', () => {
  console.log('Shutting down Vite dev server...');
  vite.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Shutting down Vite dev server...');
  vite.kill('SIGTERM');
});