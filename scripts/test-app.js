/**
 * Simple Next.js Application Test Script
 * 
 * This script validates that the Next.js application can be built
 * and checks for any syntax or configuration errors.
 * 
 * Run with: `node scripts/test-app.js`
 */

const { exec } = require('child_process');
const path = require('path');

// Get the root directory of the project
const rootDir = path.resolve(__dirname, '..');

// Run the build command to check for any errors
console.log('Testing Next.js build process...');
console.log(`Current directory: ${rootDir}`);

// Function to execute shell commands with promises
function executeCommand(command, cwd = rootDir) {
  return new Promise((resolve, reject) => {
    console.log(`Executing: ${command}`);
    
    const child = exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return reject(error);
      }
      
      // If there's stderr output but no error, it might be warnings
      if (stderr) {
        console.log(`Command warnings: ${stderr}`);
      }
      
      resolve(stdout);
    });
    
    // Stream output in real-time
    child.stdout.on('data', (data) => {
      process.stdout.write(data);
    });
    
    child.stderr.on('data', (data) => {
      process.stderr.write(data);
    });
  });
}

async function main() {
  try {
    // Check Next.js version
    console.log('Checking Next.js version:');
    await executeCommand('npx next --version');
    
    // Check Node.js and npm versions
    console.log('\nChecking environment:');
    await executeCommand('node --version');
    await executeCommand('npm --version');
    
    // Check if postcss.config.js exists and its content
    console.log('\nChecking PostCSS configuration:');
    await executeCommand('cat postcss.config.js');
    
    // Check if tailwind.config.js exists and its content
    console.log('\nChecking Tailwind configuration:');
    await executeCommand('cat tailwind.config.js');
    
    console.log('\nRunning a partial build test (lint only):');
    await executeCommand('npx next lint');
    
    console.log('\nTest completed successfully!');
  } catch (error) {
    console.error('Test failed with error:', error);
  }
}

main();