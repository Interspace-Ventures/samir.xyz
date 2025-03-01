// Simple process monitor to restart the server if it crashes
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
let SERVER_SCRIPT = path.resolve(__dirname, '../../deploy.js');
const MAX_RESTARTS = 10;
const RESTART_DELAY = 3000; // 3 seconds

let restartCount = 0;
let serverProcess = null;

console.log(`Monitor starting for server script: ${SERVER_SCRIPT}`);

// Check if script exists
if (!fs.existsSync(SERVER_SCRIPT)) {
  console.error(`Server script not found at: ${SERVER_SCRIPT}`);
  console.log(`Searching for deploy.js in current directory...`);
  
  // Search for deploy.js in the current directory
  const files = fs.readdirSync(__dirname);
  console.log(`Files in directory: ${files.join(', ')}`);
  
  const deployScript = files.find(file => file === 'deploy.js');
  if (deployScript) {
    console.log(`Found deploy.js in current directory`);
    SERVER_SCRIPT = path.join(__dirname, deployScript);
  } else {
    console.error('Unable to find deploy.js anywhere. Exiting monitor.');
    process.exit(1);
  }
}

function startServer() {
  console.log(`Starting server (attempt ${restartCount + 1}/${MAX_RESTARTS})...`);
  
  // Use node to run the server script
  serverProcess = spawn('node', [SERVER_SCRIPT], {
    stdio: 'inherit',
    shell: true
  });
  
  serverProcess.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
    
    restartCount++;
    if (restartCount < MAX_RESTARTS) {
      console.log(`Restarting server in ${RESTART_DELAY}ms...`);
      setTimeout(startServer, RESTART_DELAY);
    } else {
      console.error(`Maximum restart attempts (${MAX_RESTARTS}) reached. Giving up.`);
      process.exit(1);
    }
  });
  
  serverProcess.on('error', (err) => {
    console.error('Failed to start server process:', err);
  });
}

// Handle monitor process termination
process.on('SIGINT', () => {
  console.log('Monitor received SIGINT signal');
  if (serverProcess) {
    console.log('Terminating server process...');
    serverProcess.kill('SIGINT');
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Monitor received SIGTERM signal');
  if (serverProcess) {
    console.log('Terminating server process...');
    serverProcess.kill('SIGTERM');
  }
  process.exit(0);
});

// Start the server
startServer();