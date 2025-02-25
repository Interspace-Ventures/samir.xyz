import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Force development mode
process.env.NODE_ENV = 'development';

console.log('Starting Vite development server...');

// Start Vite dev server as a child process
const vite = spawn('npx', ['vite', '--port', '5000', '--host', '0.0.0.0', '--strictPort'], {
  stdio: 'inherit',
  shell: true,
  cwd: path.resolve(__dirname, '..')
});

// Handle process events
vite.on('error', (err) => {
  console.error('Failed to start Vite dev server:', err);
  process.exit(1);
});

// Handle clean exit
process.on('SIGTERM', () => {
  vite.kill();
  process.exit(0);
});

process.on('SIGINT', () => {
  vite.kill();
  process.exit(0);
});
