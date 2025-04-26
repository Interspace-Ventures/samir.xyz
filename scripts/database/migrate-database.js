/**
 * Migrate Database Script
 * 
 * This script runs the Prisma migrate command to update the database schema
 * based on the changes in the schema.prisma file.
 * 
 * Run with: `node scripts/database/migrate-database.js`
 */

const { spawn } = require('child_process');
const path = require('path');

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
    console.log('Starting database migration process...');
    
    // Generate Prisma client based on current schema
    console.log('\nGenerating Prisma client...');
    await runCommand('npx', ['prisma', 'generate']);
    
    // Run the database migration
    console.log('\nRunning database migration...');
    await runCommand('npx', ['prisma', 'migrate', 'dev', '--name', 'remove_tags_and_categories']);
    
    console.log('\nDatabase migration complete!');
    console.log('The database schema has been updated according to the changes in schema.prisma');
    
  } catch (error) {
    console.error('\nError during migration process:', error);
    console.error('\nMigration failed. Please check the error message above.');
  }
}

main()
  .catch(e => {
    console.error('Unhandled error:', e);
    process.exit(1);
  });