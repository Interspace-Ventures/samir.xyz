/**
 * Generate Prisma Client Script
 * 
 * This script generates the Prisma client based on the current schema
 * without requiring a full migration.
 * 
 * Run with: `node scripts/database/generate-client.js`
 */

const { spawn } = require('child_process');

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command} ${args.join(' ')}`);
    
    const child = spawn(command, args, { 
      stdio: 'inherit',
      shell: true
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
    
    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function main() {
  try {
    console.log('Generating Prisma client...');
    await runCommand('npx', ['prisma', 'generate']);
    console.log('Prisma client generation complete!');
    
  } catch (error) {
    console.error('Error generating Prisma client:', error);
  }
}

main()
  .catch(e => {
    console.error('Unhandled error:', e);
    process.exit(1);
  });