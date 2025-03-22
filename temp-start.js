// First, patch the modules
import './node_modules-patch.js';

// Then import our polyfills
import './next-patch.js';

// Finally start Next.js with the polyfills loaded in the same context
import { spawn } from 'child_process';

console.log("Starting Next.js with polyfills preloaded...");
const nextProcess = spawn('bun', ['run', 'next', 'dev', '-p', '5000', '--hostname', '0.0.0.0'], {
  stdio: 'inherit',
  env: { 
    ...process.env,
    // Force using NodeJS runtime, not Edge
    NEXT_RUNTIME: "nodejs"
  }
});

// Forward signals
process.on('SIGINT', () => nextProcess.kill('SIGINT'));
process.on('SIGTERM', () => nextProcess.kill('SIGTERM'));

// Wait for process to exit
nextProcess.on('exit', (code) => {
  process.exit(code);
});
